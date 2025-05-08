"use client";

import { useState, useMemo, useEffect, Suspense } from 'react';
import type { Activity, SportType, Audience } from '@/lib/types';
import { DUMMY_ACTIVITIES } from '@/lib/constants';
import { ActivityCard } from '@/components/activity-card';
import { ActivitiesFilter } from '@/components/activities-filter';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {fetchDocuments} from "@/lib/db";
import ActivityList from './ActivityList';
import { Skeleton } from '@/components/ui/skeleton';

export default function ActivitiesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Activities</h1>
      <Suspense fallback={<ActivitySkeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
