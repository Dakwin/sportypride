import type { Activity, SportType, Audience } from './types';

export const SPORT_TYPES: SportType[] = ["Tennis", "Beach Volleyball", "Cycling", "Yoga", "Running"];
export const AUDIENCE_TYPES: Audience[] = ["All", "Women Only", "Men Only"];

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
