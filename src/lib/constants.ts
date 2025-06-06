import type { Activity, SportType, Audience } from './types';

export const SPORT_TYPES: SportType[] = ["Tennis", "Beach Volleyball", "Cycling", "Yoga", "Running"];
export const AUDIENCE_TYPES: Audience[] = ["All", "Women Only", "Men Only"];

export const DUMMY_ACTIVITIES: Activity[] = [
  {
    id: "1",
    name: "Morning suck her Match",
    description: "Friendly tennis game to start the day. All levels welcome!",
    location: "Central Park Tennis Courts",
    time: "Tuesdays & Thursdays, 7:00 AM - 8:30 AM",
    sportType: "Tennis",
    audience: "All",
    externalLink: "https://example.com/tennis-signup",
    contactInfo: "tennisclub@example.com",
    image: "https://picsum.photos/seed/tennis/600/400",
  },
  {
    id: "2",
    name: "Sunset Beach Volleyball",
    description: "Competitive and fun beach volleyball as the sun sets.",
    location: "City Beach Courts",
    time: "Fridays, 6:00 PM - 8:00 PM",
    sportType: "Beach Volleyball",
    audience: "All",
    contactInfo: "Call Alex: 555-1234",
    image: "https://picsum.photos/seed/volleyball/600/400",
  },
  {
    id: "3",
    name: "Women's Yoga Flow",
    description: "A rejuvenating yoga session specifically for women. Focus on strength and flexibility.",
    location: "Community Yoga Studio",
    time: "Wednesdays, 9:00 AM - 10:00 AM",
    sportType: "Yoga",
    audience: "Women Only",
    externalLink: "https://example.com/yoga-women",
    image: "https://picsum.photos/seed/yoga/600/400",
  },
  {
    id: "4",
    name: "Men's Cycling Group",
    description: "Challenging road cycling route for experienced male riders.",
    location: "Meet at North Valley Bike Shop",
    time: "Saturdays, 7:30 AM",
    sportType: "Cycling",
    audience: "Men Only",
    contactInfo: "cyclingbros@example.com",
    image: "https://picsum.photos/seed/cycling/600/400",
  },
  {
    id: "5",
    name: "Park Run Club",
    description: "Join our friendly running club for a 5k run in the park. All paces welcome.",
    location: "Greenwood Park - Main Entrance",
    time: "Sundays, 9:00 AM",
    sportType: "Running",
    audience: "All",
    image: "https://picsum.photos/seed/running/600/400",
  },
  {
    id: "6",
    name: "Advanced Tennis Clinic (Women Only)",
    description: "Intensive clinic for women looking to improve their tennis skills.",
    location: "University Tennis Center",
    time: "Mondays, 6:00 PM - 7:30 PM",
    sportType: "Tennis",
    audience: "Women Only",
    externalLink: "https://example.com/tennis-clinic-women",
    image: "https://picsum.photos/seed/tennisfemale/600/400",
  },
];

export const ACTIVITY_TYPES = {
  VOLLEYBALL: 'Volleyball',
  BASKETBALL: 'Basketball',
  TENNIS: 'Tennis',
  SOCCER: 'Soccer',
  YOGA: 'Yoga',
  RUNNING: 'Running',
  SWIMMING: 'Swimming',
  CYCLING: 'Cycling',
} as const;

export const ACTIVITY_IMAGES = {
  [ACTIVITY_TYPES.VOLLEYBALL]: '/images/activities/volleyball.jpg',
  [ACTIVITY_TYPES.BASKETBALL]: '/images/activities/basketball.jpg',
  [ACTIVITY_TYPES.TENNIS]: '/images/activities/tennis.jpg',
  [ACTIVITY_TYPES.SOCCER]: '/images/activities/soccer.jpg',
  [ACTIVITY_TYPES.YOGA]: '/images/activities/yoga.jpg',
  [ACTIVITY_TYPES.RUNNING]: '/images/activities/running.jpg',
  [ACTIVITY_TYPES.SWIMMING]: '/images/activities/swimming.jpg',
  [ACTIVITY_TYPES.CYCLING]: '/images/activities/cycling.jpg',
} as const;

export type ActivityType = keyof typeof ACTIVITY_TYPES;
