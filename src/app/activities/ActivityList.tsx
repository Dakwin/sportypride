'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  time: string;
  sportType: string;
  audience: string;
  contactInfo: string;
}

export default function ActivityList() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  return (
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
            <p>🕒 {activity.time}</p>
            <p>🏃 {activity.sportType}</p>
            <p>👥 {activity.audience}</p>
            <p>📞 {activity.contactInfo}</p>
          </div>
        </Card>
      ))}
    </div>
  );
} 