'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SPORT_TYPES, AUDIENCE_TYPES } from '@/lib/constants';
import { useToast } from "@/components/ui/use-toast";

interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  time: string;
  sportType: string;
  audience: string;
  contactInfo: string;
  externalLink?: string;
}

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function EditActivityPage({ params }: Props) {
  const router = useRouter();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchActivity();
  }, [params.id]);

  const fetchActivity = async () => {
    try {
      const response = await fetch(`/api/activities/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch activity');
      }
      const data = await response.json();
      setActivity(data);
    } catch (error) {
      showToast({
        title: "Error",
        description: "Failed to fetch activity",
        variant: "destructive",
      });
      router.push('/activities');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const activityData = {
      name: formData.get('name'),
      description: formData.get('description'),
      location: formData.get('location'),
      time: formData.get('time'),
      sportType: formData.get('sportType'),
      audience: formData.get('audience'),
      contactInfo: formData.get('contactInfo'),
      externalLink: formData.get('externalLink'),
    };

    try {
      const response = await fetch(`/api/activities/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData),
      });

      if (!response.ok) {
        throw new Error('Failed to update activity');
      }

      showToast({
        title: "Success",
        description: "Activity updated successfully",
      });
      router.push('/activities');
      router.refresh();
    } catch (error) {
      showToast({
        title: "Error",
        description: "Failed to update activity",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Activity</h1>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Activity Name</Label>
            <Input
              id="name"
              name="name"
              required
              defaultValue={activity.name}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              required
              defaultValue={activity.description}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              required
              defaultValue={activity.location}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              name="time"
              required
              defaultValue={activity.time}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sportType">Sport Type</Label>
            <Select name="sportType" required defaultValue={activity.sportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select sport type" />
              </SelectTrigger>
              <SelectContent>
                {SPORT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience">Audience</Label>
            <Select name="audience" required defaultValue={activity.audience}>
              <SelectTrigger>
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent>
                {AUDIENCE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactInfo">Contact Information</Label>
            <Input
              id="contactInfo"
              name="contactInfo"
              required
              defaultValue={activity.contactInfo}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="externalLink">External Link (Optional)</Label>
            <Input
              id="externalLink"
              name="externalLink"
              type="url"
              defaultValue={activity.externalLink}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
