"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Activity, SportType, Audience } from '@/lib/types';
import { DUMMY_ACTIVITIES } from '@/lib/constants';
import { ActivityCard } from '@/components/activity-card';
import { ActivitiesFilter } from '@/components/activities-filter';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState<SportType | "All">("All");
  const [selectedAudience, setSelectedAudience] = useState<Audience | "All">("All");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    // In a real app, you would fetch data from Firebase/Airtable here
    // For now, using dummy data with a delay
    const timer = setTimeout(() => {
      setActivities(DUMMY_ACTIVITIES);
      setIsLoading(false);
    }, 500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const handleSportChange = (sport: SportType | "All") => {
    setSelectedSport(sport);
  };

  const handleAudienceChange = (audience: Audience | "All") => {
    setSelectedAudience(audience);
  };

  const handleClearFilters = () => {
    setSelectedSport("All");
    setSelectedAudience("All");
    setSearchTerm("");
  };

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearchTerm =
        activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (activity.description && activity.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        activity.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSport = selectedSport === "All" || activity.sportType === selectedSport;
      const matchesAudience = selectedAudience === "All" || activity.audience === selectedAudience;
      return matchesSearchTerm && matchesSport && matchesAudience;
    });
  }, [activities, searchTerm, selectedSport, selectedAudience]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          מצאו את הפעילות המושלמת עבורכם
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          סננו לפי סוג ספורט, קהל יעד או חפשו לפי שם פעילות, תיאור או מיקום.
        </p>
      </header>

      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <Input
            type="text"
            placeholder="חפשו פעילות, לדוגמה 'טניס בתל אביב'..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 text-base rounded-lg shadow-sm"
            aria-label="חיפוש פעילויות"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-3">
          <ActivitiesFilter
            selectedSport={selectedSport}
            onSportChange={handleSportChange}
            selectedAudience={selectedAudience}
            onAudienceChange={handleAudienceChange}
            onClearFilters={handleClearFilters}
          />
        </div>
        
        <main className="md:col-span-9">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-card p-4 rounded-lg shadow-md animate-pulse">
                  <div className="h-40 bg-muted rounded mb-4"></div>
                  <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : filteredActivities.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">לא נמצאו פעילויות התואמות את החיפוש שלך.</p>
              <p className="text-md text-muted-foreground mt-2">נסה להרחיב את החיפוש או לשנות את הסינונים.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
