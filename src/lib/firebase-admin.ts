import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { env } from './env';

// Validate Firebase configuration
const requiredFirebaseConfig = {
  projectId: env.FIREBASE_PROJECT_ID,
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
  privateKey: env.FIREBASE_PRIVATE_KEY,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
};

// Check if all required Firebase config values are present
Object.entries(requiredFirebaseConfig).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required Firebase configuration: ${key}`);
  }
});

const firebaseAdminConfig = {
  credential: cert({
    projectId: requiredFirebaseConfig.projectId,
    clientEmail: requiredFirebaseConfig.clientEmail,
    privateKey: requiredFirebaseConfig.privateKey,
  }),
  storageBucket: requiredFirebaseConfig.storageBucket,
};

// Initialize Firebase Admin only if it hasn't been initialized
const apps = getApps();
if (!apps.length) {
  try {
    initializeApp(firebaseAdminConfig);
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    throw error;
  }
}

export const adminDb = getFirestore();
export const adminStorage = getStorage(); 
