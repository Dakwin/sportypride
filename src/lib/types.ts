export type SportType = "Tennis" | "Beach Volleyball" | "Cycling" | "Yoga" | "Running";
export type Audience = "All" | "Women Only" | "Men Only";

export interface Activity {
  id: string;
  name: string;
  description?: string;
  location: string;
  time: string; // Could be Date object or a formatted string
  sportType: SportType;
  audience: Audience;
  externalLink?: string;
  contactInfo?: string;
  image?: string; // URL to an image for the activity
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
