"use client";

import type { SportType, Audience } from '@/lib/types';
import { SPORT_TYPES, AUDIENCE_TYPES } from '@/lib/constants';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from './ui/button';
import { FilterX } from 'lucide-react';

interface ActivitiesFilterProps {
  selectedSport: SportType | "All";
  onSportChange: (sport: SportType | "All") => void;
  selectedAudience: Audience | "All";
  onAudienceChange: (audience: Audience | "All") => void;
  onClearFilters: () => void;
}

export function ActivitiesFilter({
  selectedSport,
  onSportChange,
  selectedAudience,
  onAudienceChange,
  onClearFilters,
}: ActivitiesFilterProps) {
  return (
    <aside className="p-6 bg-card rounded-xl shadow-lg space-y-6 sticky top-24">
      <h3 className="text-xl font-semibold text-primary border-b pb-2">סינון פעילויות</h3>
      
      <div className="space-y-2">
        <Label htmlFor="sportType" className="text-md font-medium">סוג ספורט</Label>
        <Select
          value={selectedSport}
          onValueChange={(value) => onSportChange(value as SportType | "All")}
          dir="rtl"
        >
          <SelectTrigger id="sportType" className="w-full">
            <SelectValue placeholder="בחר סוג ספורט" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">כל הסוגים</SelectItem>
            {SPORT_TYPES.map((sport) => (
              <SelectItem key={sport} value={sport}>
                {sport}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-md font-medium">קהל יעד</Label>
        <RadioGroup
          value={selectedAudience}
          onValueChange={(value) => onAudienceChange(value as Audience | "All")}
          className="space-y-1"
        >
          <div className="flex items-center space-x-2 space-x-reverse"> {/* space-x-reverse for RTL */}
            <RadioGroupItem value="All" id="audience-all" />
            <Label htmlFor="audience-all" className="font-normal">כולם</Label>
          </div>
          {AUDIENCE_TYPES.filter(a => a !== "All").map((audience) => (
            <div key={audience} className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value={audience} id={`audience-${audience.toLowerCase().replace(' ', '-')}`} />
              <Label htmlFor={`audience-${audience.toLowerCase().replace(' ', '-')}`} className="font-normal">
                {audience}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Button variant="outline" onClick={onClearFilters} className="w-full">
        <FilterX className="ml-2 h-4 w-4" />
        נקה סינונים
      </Button>
    </aside>
  );
}
