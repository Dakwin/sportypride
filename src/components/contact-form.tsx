"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { ContactFormData } from '@/lib/types';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "שם חייב להכיל לפחות 2 תווים" }),
  email: z.string().email({ message: "כתובת אימייל לא תקינה" }),
  message: z.string().min(10, { message: "הודעה חייבת להכיל לפחות 10 תווים" }),
});

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Contact form data:', data);
    setIsSubmitting(false);
    toast({
      title: "ההודעה נשלחה בהצלחה!",
      description: "ניצור איתך קשר בהקדם.",
      variant: "default",
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-8 rounded-xl shadow-xl">
      <div>
        <Label htmlFor="name" className="text-md font-medium">שם מלא</Label>
        <Input
          id="name"
          {...register('name')}
          className={`mt-1 ${errors.name ? 'border-destructive' : ''}`}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email" className="text-md font-medium">כתובת אימייל</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className={`mt-1 ${errors.email ? 'border-destructive' : ''}`}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="message" className="text-md font-medium">הודעה</Label>
        <Textarea
          id="message"
          {...register('message')}
          rows={5}
          className={`mt-1 ${errors.message ? 'border-destructive' : ''}`}
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
      </div>

      <Button type="submit" className="w-full shadow-md hover:shadow-lg transition-shadow" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            שולח...
          </>
        ) : (
          "שלח הודעה"
        )}
      </Button>
    </form>
  );
}
