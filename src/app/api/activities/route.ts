import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// GET handler for fetching activities
export async function GET() {
  try {
    const activitiesRef = adminDb.collection('activities');
    const snapshot = await activitiesRef.get();
    
    const activities = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ activities });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

// POST handler for creating new activities
export async function POST(request: Request) {
  try {
    const activityData = await request.json();

    // Create the activity document
    const activityRef = await adminDb.collection('activities').add({
      ...activityData,
      createdAt: new Date()
    });

    return NextResponse.json({ 
      id: activityRef.id,
      ...activityData
    });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    );
  }
} 