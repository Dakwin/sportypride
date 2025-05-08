"use client";

import { Suspense } from 'react';
import Link from 'next/link';
import ActivityList from './ActivityList';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ActivitiesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Activities</h1>
        <Link href="/activities/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Activity
          </Button>
        </Link>
      </div>
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
