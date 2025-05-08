'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

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
  image: string;
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
        console.log(data);
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map((activity) => (
        <Card key={activity.id} className="p-6">
          <div className="relative w-full h-48 mb-4">
            <Image
              src={activity.image}
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
            <p>🏃 {activity.sportType}</p>
            <p>👥 {activity.audience}</p>
            <p>📞 {activity.contactInfo}</p>
          </div>
        </Card>
      ))}
    </div>
  );
} 