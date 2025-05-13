import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
const result = config({ path: resolve(process.cwd(), '.env') });

if (result.error) {
  console.error('Error loading .env file:', result.error);
  throw result.error;
}

// Helper function to validate environment variables
function validateEnvVar(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// Validate and export environment variables
export const env = {
  ADMIN_PASSWORD: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123",
  FIREBASE_PROJECT_ID: validateEnvVar('FIREBASE_PROJECT_ID', process.env.FIREBASE_PROJECT_ID),
  FIREBASE_CLIENT_EMAIL: validateEnvVar('FIREBASE_CLIENT_EMAIL', process.env.FIREBASE_CLIENT_EMAIL),
  FIREBASE_PRIVATE_KEY: validateEnvVar('FIREBASE_PRIVATE_KEY', process.env.FIREBASE_PRIVATE_KEY)?.replace(/\\n/g, '\n'),
  FIREBASE_STORAGE_BUCKET: validateEnvVar('FIREBASE_STORAGE_BUCKET', process.env.FIREBASE_STORAGE_BUCKET),
} as const;

// Log successful environment variable loading
console.log('Environment variables loaded successfully');
console.log('Firebase Project ID:', env.FIREBASE_PROJECT_ID);

// Validate required environment variables
const requiredEnvVars = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY',
  'FIREBASE_STORAGE_BUCKET',
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.warn(`Warning: ${envVar} is not set in environment variables`);
  }
} 