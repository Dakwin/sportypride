'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { AUDIENCE_TYPES } from '@/lib/constants';
import type { Activity } from '@/lib/types';

interface ActivityListProps {
  onEdit?: (activity: Activity) => void;
}

export default function ActivityList({ onEdit }: ActivityListProps) {
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

  const formatDate = (time: string) => {
    // If it's a recurring time string (contains & or every), return it as is
    if (time.includes('&') || time.includes('every')) {
      return time;
    }

    try {
      const date = new Date(time);
      if (isNaN(date.getTime())) {
        return time; // Return original string if date is invalid
      }
      return date.toLocaleString('he-IL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return time; // Return original string on error
    }
  };

  // Filter activities by audience
  const filteredActivities = activities.filter(activity => 
    selectedAudience === "All" || activity.audience === selectedAudience
  );

  // Group activities by sport type
  const groupedActivities = filteredActivities.reduce((groups: Record<string, Activity[]>, activity) => {
    const sportType = activity.sportType;
    if (!groups[sportType]) {
      groups[sportType] = [];
    }
    groups[sportType].push(activity);
    return groups;
  }, {});

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
            <SelectValue placeholder="בחר קהל יעד" />
          </SelectTrigger>
          <SelectContent>
            {AUDIENCE_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type === 'All' ? 'כולם' : type === 'Women Only' ? 'נשים בלבד' : 'גברים בלבד'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grouped Activities */}
      {Object.entries(groupedActivities).map(([sportType, activities]) => (
        <div key={sportType} className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">{sportType}</h2>
          <Separator className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={getImagePath(activity.sportType)}
                    alt={activity.name}
                    className="object-cover w-full h-full"
                  />
                  {onEdit && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => onEdit(activity)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{activity.name}</CardTitle>
                  <CardDescription>{formatDate(activity.time)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">מיקום:</span>
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <span className="font-medium">קהל יעד:</span>
                    <span>
                      {activity.audience === 'All' ? 'כולם' : 
                       activity.audience === 'Women Only' ? 'נשים בלבד' : 'גברים בלבד'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 