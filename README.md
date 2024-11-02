# CodeStreak
CodeStreak is a productivity and motivation tool designed for coders who want to keep up with daily problem-solving or project goals. Whether you're preparing for coding interviews, building personal projects, or improving your skills one line at a time, CodeStreak helps you stay on track and maintain your momentum.


Here's a suggested structure for your CodeStreak project that integrates Appwrite with both the frontend and backend, organized for scalability and modularity.
```

/codestreak
├── app/                     # Next.js App Router pages and components
│   ├── layout.js            # Main layout file
│   ├── page.js              # Homepage
│   ├── login/
│   │   └── page.js          # Login page
│   ├── signup/
│   │   └── page.js          # Signup page
│   ├── dashboard/
│   │   └── page.js          # User dashboard
│   ├── api/                 # API routes for custom backend logic
│   │   ├── auth/
│   │   │   ├── login.js     # Login API route
│   │   │   └── signup.js    # Signup API route
│   │   └── streaks/
│   │       └── [userId].js  # API route to fetch/update user streaks
│   └── middleware.js        # Middleware for authentication (optional)
├── components/              # Reusable components for forms, inputs, etc.
│   ├── AuthForm.js          # Login/Signup form component
│   └── NotificationForm.js  # Notification preferences form
├── context/                 # Global context providers
│   └── AuthContext.js       # Authentication context provider
├── lib/                     # Utility functions and configuration
│   ├── appwrite.js          # Appwrite SDK setup
│   └── auth.js              # Helper functions for authentication
├── styles/                  # CSS and SCSS styles
│   ├── globals.css          # Global styles
│   └── AuthForm.module.css  # Module styles for AuthForm
├── public/                  # Static assets (images, icons, etc.)
│   └── favicon.ico
├── .env.local               # Environment variables for Appwrite Cloud
└── next.config.js           # Next.js configuration file

```