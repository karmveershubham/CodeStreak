# CodeStreak
CodeStreak is a productivity and motivation tool designed for coders who want to keep up with daily problem-solving or project goals. Whether you're preparing for coding interviews, building personal projects, or improving your skills one line at a time, CodeStreak helps you stay on track and maintain your momentum.


Here's a suggested structure for your CodeStreak project that integrates Appwrite with both the frontend and backend, organized for scalability and modularity.
```
plaintext
Copy code
codestreak/
├── frontend/                              # Frontend (Next.js/React)
│   ├── public/                            # Public assets accessible to the browser
│   ├── src/
│   │   ├── components/                    # Reusable UI components
│   │   ├── features/                      # Core features (e.g., auth, notifications)
│   │   ├── hooks/                         # Custom hooks
│   │   ├── layouts/                       # Page layouts
│   │   ├── pages/                         # App routes/pages
│   │   ├── services/                      # API or service integrations
│   │   │   ├── appwriteClient.ts          # Appwrite client initialization
│   │   │   └── authService.ts             # Auth service with Appwrite methods
│   │   ├── styles/                        # Global and component-specific styles
│   │   └── utils/                         # Utility functions and constants
│   ├── .env                               # Environment variables for frontend
│   ├── package.json                       # Frontend dependencies
│   └── tsconfig.json                      # TypeScript config for frontend
│
├── backend/                               # Backend (e.g., Node.js, Express, Appwrite SDK)
│   ├── src/
│   │   ├── config/                        # Environment, database, and app config files
│   │   ├── controllers/                   # Route handlers for different resources
│   │   │   ├── authController.ts          # Auth-related logic
│   │   │   └── notificationController.ts  # Notification logic
│   │   ├── models/                        # Optional: Database models if needed
│   │   ├── routes/                        # API routes organized by feature
│   │   │   ├── authRoutes.ts              # Authentication routes
│   │   │   └── notificationRoutes.ts      # Notification routes
│   │   ├── services/                      # Business logic and service functions
│   │   │   ├── appwriteService.ts         # Appwrite-specific logic (e.g., server-side actions)
│   │   │   └── notificationService.ts     # Notification logic using Appwrite SDK
│   │   ├── middlewares/                   # Middleware for validation, auth, etc.
│   │   ├── utils/                         # Utility functions for backend
│   │   └── index.ts                       # Main entry point
│   ├── .env                               # Environment variables for backend
│   ├── package.json                       # Backend dependencies
│   └── tsconfig.json                      # TypeScript config for backend
│
├── appwrite/                              # Appwrite server configurations
│   ├── init.sql                           # Optional: SQL scripts for setting up initial Appwrite data
│   ├── collections/                       # JSON schemas for collections
│   │   ├── users.json                     # Schema for Users collection
│   │   └── notifications.json             # Schema for Notifications collection
│   ├── buckets/                           # JSON configurations for file storage buckets
│   ├── functions/                         # Appwrite Cloud Functions code
│   │   ├── notifyUser.js                  # Function to send notifications to users
│   │   └── dailyTasks.js                  # Function for daily tasks like streak checks
│   └── appwrite.json                      # Appwrite configuration and API key (in .env)
│
├── docker-compose.yml                     # Docker Compose to run Appwrite, frontend, backend
├── .gitignore                             # Git ignore file
└── README.md                              # Project documentation

```
Detailed Overview

## Frontend Structure

```src/services/appwriteClient.ts:``` Initializes the Appwrite client with your project ID and endpoint.

```src/services/authService.ts:``` Manages authentication with Appwrite, like sign-up, login, and session handling.

```components/:``` Contains UI components like buttons, forms, and headers.

```hooks/:``` Contains custom hooks like useAuth to manage Appwrite session state.

```features/:``` Organizes feature-specific components and logic like auth, notifications, or streak tracking.


## Backend Structure

```services/appwriteService.ts:``` Contains server-side calls to Appwrite, such as creating server-side documents, handling Appwrite cloud functions, and managing notifications.

```controllers/:``` Manages route handling. For instance, authController.ts could handle user-related endpoints like sign-up and login.

```routes/:``` Sets up API routes, organized by functionality, e.g., authRoutes.ts for authentication routes.

## Appwrite Configurations
```collections/:``` Defines JSON schemas for Appwrite collections, e.g., Users or Notifications, for database setup consistency.

```buckets/:``` Contains JSON configuration files for Appwrite file storage buckets.

```functions/:``` Stores serverless cloud functions, which could run tasks like daily streak checks or user notifications.

```appwrite.json:``` Stores Appwrite project settings, like project ID and API keys (API key in .env).

## Environment Variables

Place Appwrite-related environment variables in .env files for both the frontend and backend.

### Frontend .env:
```
NEXT_PUBLIC_APPWRITE_ENDPOINT=http://localhost/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=<YOUR_PROJECT_ID>
```
### Backend .env:
```
APPWRITE_ENDPOINT=http://localhost/v1
APPWRITE_PROJECT_ID=<YOUR_PROJECT_ID>
APPWRITE_API_KEY=<YOUR_API_KEY>
```
This setup provides a clear organization for managing both the frontend and backend of CodeStreak with Appwrite. Let me know if you'd like further details on setting up specific components or features!
