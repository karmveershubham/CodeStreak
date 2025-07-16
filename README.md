# ⚡ Codestreak — AI-Powered Daily Coding Companion

Codestreak is an AI-driven platform that helps coders stay consistent, sharp, and motivated by delivering personalized daily coding challenges via **WhatsApp, Email, or SMS**. Whether you're preparing for interviews or leveling up your competitive programming game, Codestreak ensures you **never break your streak**.

---

## 🚀 Features

### ✅ AI-Curated Learning Path
- Users choose a goal (e.g., "Crack Amazon Interviews")
- Codestreak generates a personalized weekly plan using **GPT-4**
- Questions include topic, difficulty, and platform links (LeetCode, GFG, Codeforces)

### 📬 Daily Notifications
- Get daily coding challenges based on your plan
- Sent to your **WhatsApp, Email, or SMS**
- Encouraging messages to keep you consistent

### ⏰ Contest Reminders
- Automatically notifies users 1 hour before coding contests
- Supports **Codeforces**, **LeetCode**, and more

### 🏫 College Leaderboards
- Track top performers from your college
- View streaks, total problems solved, and competition wins

---

## 🧠 Tech Stack

### Frontend (Next.js)
- ⚛️ React + Next.js (App Router)
- 🎨 Tailwind CSS + shadcn/ui
- 🔐 NextAuth.js for Authentication
- 📈 Recharts/Chart.js for analytics

### Backend (Express.js)
- 🛠️ Node.js + Express
- 📦 MongoDB + Mongoose
- 🔁 node-cron for scheduled jobs
- 🔔 Twilio API for WhatsApp/SMS
- 📧 Nodemailer for email

### AI Services
- 🤖 OpenAI GPT-4 for:
  - Personalized learning paths
  - Resume-based recommendations *(optional)*
  - Contest preparation feedback *(optional)*

---

## 🗂️ Project Structure

```
codestreak/
├── frontend/            # Next.js (Vercel-ready)
│   └── app/, components/, lib/
├── backend/             # Express.js API server
│   └── routes/, models/, services/, cron/
├── ai/                  # Prompt templates & generation logic
├── shared/              # Common types/interfaces
```
```
frontend/
└── app/
    ├── layout.tsx                 # Root layout wrapper
    ├── page.tsx                   # Landing or redirect to /dashboard

    ├── dashboard/                 # Main user dashboard
    │   ├── page.tsx               # Overview (streaks, next problem)
    │   ├── path/                  # AI Practice Path
    │   │   ├── page.tsx
    │   │   └── edit/              # Edit/regenerate path
    │   │       └── page.tsx
    │   ├── problem/               # Daily Problem (AI-curated)
    │   │   └── page.tsx
    │   ├── streak/                # Streak analytics view
    │   │   └── page.tsx
    │   └── settings/              # Notification & account settings
    │       └── page.tsx

    ├── contest/                   # Coding Contest Reminder View
    │   └── page.tsx

    ├── leaderboard/               # College/Community Rankings
    │   └── page.tsx

    └── auth/                      # Auth system
        ├── login/                 # Login (Google/GitHub)
        │   └── page.tsx
        └── signup/                # Signup (optional)
            └── page.tsx

```
```
backend/
├── src/
│   ├── config/                    # DB, OpenAI, Twilio setup
│   │   ├── db.js
│   │   ├── openai.js
│   │   └── twilio.js
│
│   ├── models/                    # MongoDB schemas
│   │   ├── User.js
│   │   ├── LearningPath.js
│   │   ├── Room.js
│   │   └── ProblemLog.js         # Track solved problems
│
│   ├── controllers/              # Business logic
│   │   ├── user.controller.js
│   │   ├── path.controller.js
│   │   ├── reminder.controller.js
│   │   └── leaderboard.controller.js
│
│   ├── routes/                   # Route declarations
│   │   ├── user.routes.js
│   │   ├── path.routes.js
│   │   ├── reminder.routes.js
│   │   └── leaderboard.routes.js
│
│   ├── services/                 # External services
│   │   ├── ai.service.js         # GPT-4 prompt generation
│   │   ├── message.service.js    # WhatsApp/email sending
│   │   ├── contest.service.js    # Fetch Codeforces/LeetCode contests
│   │   └── cron.service.js       # Daily scheduling logic
│
│   ├── middlewares/             # Custom middleware
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│
│   ├── utils/                    # Helpers
│   │   ├── formatter.js
│   │   └── constants.js
│
│   ├── cron/                     # Cron job definitions
│   │   ├── sendDailyProblem.js
│   │   └── contestReminder.js
│
│   ├── index.js                  # Server entry
│   └── app.js                    # Express app configuration
│
├── .env
├── package.json
└── README.md

```

---

## 🔧 Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/codestreak.git
cd codestreak
```

### 2. Environment Variables

#### 📦 `backend/.env`
```env
MONGO_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_key
TWILIO_SID=your_twilio_sid
TWILIO_AUTH=your_twilio_token
```

#### 🌐 `frontend/.env.local`
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
BACKEND_URL=http://localhost:5000
```

### 3. Run Backend
```bash
cd backend
npm install
npm run dev
```

### 4. Run Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📅 Roadmap

- [x] AI-generated coding path
- [x] WhatsApp/SMS/email notifications
- [x] Contest reminders
- [x] College leaderboard

---

## 🙌 Contributors

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Feedback & Suggestions

Feel free to [open an issue](https://github.com/your-username/codestreak/issues) or reach out via [email](mailto:skarmveer1201@gmail.com).

> Stay consistent. Keep the streak alive. 🔥
