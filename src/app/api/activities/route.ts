import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    console.log('Fetching activities from Firestore...');
    const activitiesRef = adminDb.collection('activities');
    const snapshot = await activitiesRef.get();
    
    console.log(`Found ${snapshot.docs.length} activities`);
    
    const activities = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data
      };
    });

    console.log('Successfully processed all activities');
    return NextResponse.json({ activities });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
} 