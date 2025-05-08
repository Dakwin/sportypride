'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SPORT_TYPES, AUDIENCE_TYPES } from '@/lib/constants';

export default function NewActivityPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData),
      });

      if (!response.ok) {
        throw new Error('Failed to create activity');
      }

      router.push('/activities');
      router.refresh();
    } catch (error) {
      console.error('Error creating activity:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Activity</h1>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Activity Name</Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Enter activity name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Describe the activity"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              required
              placeholder="Enter location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              name="time"
              required
              placeholder="e.g., Mondays & Wednesdays, 6:00 PM - 7:00 PM"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sportType">Sport Type</Label>
            <Select name="sportType" required>
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
            <Select name="audience" required>
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
              placeholder="Enter contact information"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="externalLink">External Link (Optional)</Label>
            <Input
              id="externalLink"
              name="externalLink"
              type="url"
              placeholder="Enter external link"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Activity'}
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
