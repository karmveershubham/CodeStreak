// frontend/lib/appwrite.ts
import { Client, Account, Databases } from 'appwrite';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)  // Set endpoint from environment variables
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); // Set project ID from environment variables

// Export Appwrite services for authentication and database
export const account = new Account(client);          // Handles user authentication
export const databases = new Databases(client);      // Interacts with Appwrite database

export default client;
