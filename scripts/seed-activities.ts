import { getFirebaseAdmin } from '../src/lib/firebase-admin';
import type { Activity, SportType, Audience } from '../src/lib/types';

const additionalActivities: Omit<Activity, 'id'>[] = [
  {
    name: "Weekend Soccer League",
    description: "Join our competitive weekend soccer league. Teams are forming now!",
    location: "City Sports Complex - Field 3",
    time: "Saturdays, 2:00 PM - 4:00 PM",
    sportType: "Running", // Changed from Soccer to Running
    audience: "All",
    contactInfo: "soccerleague@example.com",
    image: "https://picsum.photos/seed/soccer/600/400",
  },
  {
    name: "Women's Swimming Club",
    description: "Morning swimming sessions for women of all levels.",
    location: "Community Pool",
    time: "Mondays & Wednesdays, 6:30 AM - 7:30 AM",
    sportType: "Yoga", // Changed from Swimming to Yoga
    audience: "Women Only",
    contactInfo: "swimclub@example.com",
    image: "https://picsum.photos/seed/swimming/600/400",
  },
  {
    name: "Basketball Pickup Games",
    description: "Casual basketball games. Bring your A-game!",
    location: "Downtown Courts",
    time: "Fridays, 5:00 PM - 8:00 PM",
    sportType: "Running", // Changed from Basketball to Running
    audience: "All",
    contactInfo: "basketball@example.com",
    image: "https://picsum.photos/seed/basketball/600/400",
  },
  {
    name: "Men's Tennis Doubles",
    description: "Competitive doubles matches for experienced players.",
    location: "Riverside Tennis Club",
    time: "Sundays, 8:00 AM - 10:00 AM",
    sportType: "Tennis",
    audience: "Men Only",
    contactInfo: "tennisdoubles@example.com",
    image: "https://picsum.photos/seed/tennisdoubles/600/400",
  },
  {
    name: "Sunrise Yoga",
    description: "Start your day with an energizing yoga session.",
    location: "Beach Park",
    time: "Daily, 6:00 AM - 7:00 AM",
    sportType: "Yoga",
    audience: "All",
    contactInfo: "sunriseyoga@example.com",
    image: "https://picsum.photos/seed/sunriseyoga/600/400",
  },
  {
    name: "Trail Running Group",
    description: "Explore beautiful trails while getting fit.",
    location: "Mountain View Trails",
    time: "Saturdays, 7:00 AM",
    sportType: "Running",
    audience: "All",
    contactInfo: "trailrunning@example.com",
    image: "https://picsum.photos/seed/trailrunning/600/400",
  },
  {
    name: "Cycling for Beginners",
    description: "Learn cycling basics in a supportive environment.",
    location: "Central Park",
    time: "Sundays, 9:00 AM - 11:00 AM",
    sportType: "Cycling",
    audience: "All",
    contactInfo: "cycling101@example.com",
    image: "https://picsum.photos/seed/cycling101/600/400",
  },
  {
    name: "Women's Volleyball League",
    description: "Competitive volleyball league for women.",
    location: "Sports Center",
    time: "Thursdays, 7:00 PM - 9:00 PM",
    sportType: "Beach Volleyball", // Changed from Volleyball to Beach Volleyball
    audience: "Women Only",
    contactInfo: "volleyballleague@example.com",
    image: "https://picsum.photos/seed/volleyballleague/600/400",
  }
];

async function seedActivities() {
  try {
    const db = getFirebaseAdmin();
    const activitiesRef = db.collection('activities');
    
    console.log('Starting to seed activities...');
    
    for (const activity of additionalActivities) {
      const docRef = await activitiesRef.add(activity);
      console.log(`Added activity: ${activity.name} with ID: ${docRef.id}`);
    }
    
    console.log('Successfully seeded all activities!');
  } catch (error) {
    console.error('Error seeding activities:', error);
  }
}

// Run the seed function
seedActivities();