'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  time: {
    _seconds: number;
    _nanoseconds: number;
  };
  sportType: string;
  audience: string;
  contactInfo: string;
}

export default function ActivityList() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<string>("All");

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch('/api/activities');
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }
        const data = await response.json();
        setActivities(data.activities);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    }

    fetchActivities();
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  const getImagePath = (sportType: string) => {
    // Convert sport type to lowercase and remove spaces for filename matching
    const normalizedType = sportType.toLowerCase().replace(/\s+/g, '');
    return `/images/activities/${normalizedType}.jpg`;
  };

  // Filter activities by audience
  const filteredActivities = activities.filter(activity => 
    selectedAudience === "All" || activity.audience === selectedAudience
  );

  // Group activities by sport type
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const sportType = activity.sportType;
    if (!groups[sportType]) {
      groups[sportType] = [];
    }
    groups[sportType].push(activity);
    return groups;
  }, {} as Record<string, Activity[]>);

  return (
    <div className="space-y-8">
      {/* Audience Filter */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Filter by Audience:</label>
        <Select
          value={selectedAudience}
          onValueChange={setSelectedAudience}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select audience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Women Only">Women Only</SelectItem>
            <SelectItem value="Men Only">Men Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grouped Activities */}
      {Object.entries(groupedActivities).map(([sportType, activities]) => (
        <div key={sportType} className="space-y-4">
          <h2 className="text-2xl font-bold">{sportType}</h2>
          <Separator className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <Card key={activity.id} className="p-6">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={getImagePath(activity.sportType)}
                    alt={activity.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2">{activity.name}</h2>
                <p className="text-gray-600 mb-2">{activity.description}</p>
                <div className="text-sm text-gray-500">
                  <p>📍 {activity.location}</p>
                  <p>🕒 {new Date(activity.time._seconds * 1000).toLocaleString([], { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                  <p>👥 {activity.audience}</p>
                  <p>📞 {activity.contactInfo}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 