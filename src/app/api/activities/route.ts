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

    // Validate required fields
    const requiredFields = ['name', 'description', 'location', 'time', 'sportType', 'audience'];
    const missingFields = requiredFields.filter(field => !activityData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Convert time to ISO format if it's not already
    let timeValue = activityData.time;
    if (typeof timeValue === 'string' && !timeValue.match(/^\d{4}-\d{2}-\d{2}/)) {
      // If it's a recurring time string, store it as is
      if (timeValue.includes('&') || timeValue.includes('every')) {
        timeValue = timeValue;
      } else {
        // Try to parse the date string
        const parsedDate = new Date(timeValue);
        if (!isNaN(parsedDate.getTime())) {
          timeValue = parsedDate.toISOString();
        }
      }
    }

    // Create the activity document
    const activityRef = await adminDb.collection('activities').add({
      ...activityData,
      time: timeValue,
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

// PUT handler for updating activities
export async function PUT(request: Request) {
  try {
    const activityData = await request.json();
    const { id, ...updateData } = activityData;

    if (!id) {
      return NextResponse.json(
        { error: 'Activity ID is required' },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = ['name', 'description', 'location', 'time', 'sportType', 'audience'];
    const missingFields = requiredFields.filter(field => !updateData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Convert time to ISO format if it's not already
    let timeValue = updateData.time;
    if (typeof timeValue === 'string' && !timeValue.match(/^\d{4}-\d{2}-\d{2}/)) {
      // If it's a recurring time string, store it as is
      if (timeValue.includes('&') || timeValue.includes('every')) {
        timeValue = timeValue;
      } else {
        // Try to parse the date string
        const parsedDate = new Date(timeValue);
        if (!isNaN(parsedDate.getTime())) {
          timeValue = parsedDate.toISOString();
        }
      }
    }

    // Update the activity document
    await adminDb.collection('activities').doc(id).update({
      ...updateData,
      time: timeValue,
      updatedAt: new Date()
    });

    return NextResponse.json({ 
      id,
      ...updateData
    });
  } catch (error) {
    console.error('Error updating activity:', error);
    return NextResponse.json(
      { error: 'Failed to update activity' },
      { status: 500 }
    );
  }
}

// DELETE handler for removing activities
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Activity ID is required' },
        { status: 400 }
      );
    }

    await adminDb.collection('activities').doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting activity:', error);
    return NextResponse.json(
      { error: 'Failed to delete activity' },
      { status: 500 }
    );
  }
} 