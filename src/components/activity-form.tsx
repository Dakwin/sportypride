"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { AUDIENCE_TYPES } from '@/lib/constants';
import type { Activity } from '@/lib/types';

const activityFormSchema = z.object({
  name: z.string().min(2, { message: "שם הפעילות חייב להכיל לפחות 2 תווים" }),
  description: z.string().min(10, { message: "תיאור הפעילות חייב להכיל לפחות 10 תווים" }),
  location: z.string().min(2, { message: "מיקום הפעילות חייב להכיל לפחות 2 תווים" }),
  time: z.string().min(1, { message: "יש להזין זמן לפעילות" }),
  sportType: z.string().min(2, { message: "סוג הספורט חייב להכיל לפחות 2 תווים" }),
  audience: z.enum(["All", "Women Only", "Men Only"] as const),
});

type ActivityFormData = z.infer<typeof activityFormSchema>;

interface ActivityFormProps {
  activity?: Activity;
  onSubmit: (data: ActivityFormData) => Promise<void>;
  onCancel: () => void;
}

export function ActivityForm({ activity, onSubmit, onCancel }: ActivityFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ActivityFormData>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: activity || {
      name: '',
      description: '',
      location: '',
      time: '',
      sportType: '',
      audience: 'All',
    },
  });

  const handleFormSubmit = async (data: ActivityFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      toast({
        title: activity ? "פעילות עודכנה בהצלחה" : "פעילות נוספה בהצלחה",
        description: activity ? "הפעילות עודכנה במערכת" : "הפעילות נוספה למערכת",
      });
      onCancel();
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בעת שמירת הפעילות",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">שם הפעילות</Label>
          <Input
            id="name"
            {...register('name')}
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="description">תיאור</Label>
          <Textarea
            id="description"
            {...register('description')}
            className={errors.description ? 'border-destructive' : ''}
          />
          {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <Label htmlFor="location">מיקום</Label>
          <Input
            id="location"
            {...register('location')}
            className={errors.location ? 'border-destructive' : ''}
          />
          {errors.location && <p className="text-sm text-destructive mt-1">{errors.location.message}</p>}
        </div>

        <div>
          <Label htmlFor="time">זמן</Label>
          <Input
            id="time"
            {...register('time')}
            className={errors.time ? 'border-destructive' : ''}
            placeholder="למשל: כל יום שני בשעה 18:00"
          />
          {errors.time && <p className="text-sm text-destructive mt-1">{errors.time.message}</p>}
        </div>

        <div>
          <Label htmlFor="sportType">סוג ספורט</Label>
          <Input
            id="sportType"
            {...register('sportType')}
            className={errors.sportType ? 'border-destructive' : ''}
          />
          {errors.sportType && <p className="text-sm text-destructive mt-1">{errors.sportType.message}</p>}
        </div>

        <div>
          <Label htmlFor="audience">קהל יעד</Label>
          <Select
            defaultValue={activity?.audience || 'All'}
            onValueChange={(value) => setValue('audience', value as ActivityFormData['audience'])}
          >
            <SelectTrigger>
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
      </div>

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          ביטול
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {activity ? 'עדכן פעילות' : 'הוסף פעילות'}
        </Button>
      </div>
    </form>
  );
} 