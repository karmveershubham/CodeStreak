# 💡 Learn CodeStreak – Personalized AI Coding Streaks

Welcome to **CodeStreak** – an AI-powered platform to build strong coding habits with personalized practice, reminders, and community streaks.

This repo is part of the [CodeStreak](https://code-streak-lyart.vercel.app/) ecosystem. It is structured for contributors and developers to **explore the frontend + backend logic, notification workflows, AI integrations, and full-stack architecture** of a modern competitive coding assistant.

> ⚠️ This is a **development version** and contributions are welcome to enhance functionality.

---

## 🧠 What is CodeStreak?

CodeStreak helps coders stay consistent by:

- Sending **AI-curated daily problems** to your inbox or WhatsApp.
- Building your **personal practice path** based on skills/goals.
- Reminding you of **upcoming coding contests** across platforms.
- Allowing you to **battle friends in CodeRooms**.
- Competing in **college-wise leaderboards**.

---

## ⚙️ Tech Stack

**Frontend (Next.js – App Router):**
- ✅ **Next.js 14+** (App Directory)
- ✅ **TypeScript**
- ✅ **Tailwind CSS**
- ✅ **ShadCN/UI** for components
- ✅ **Framer Motion** for animations
- ✅ **Passport.js** for authentication
- ✅ **React Query / SWR** for data fetching (optional)

**Backend (Express.js – MVC):**
- ✅ **Node.js + Express.js**
- ✅ **MongoDB with Mongoose**
- ✅ **RESTful API**
- ✅ **Nodemailer** for emails
- ✅ **Twilio / WhatsApp API** (for notifications)
- ✅ **CRON Jobs** for daily tasks (e.g., reminders)
- ✅ **OpenAI API** (for AI-generated paths/problems)

---

## ✨ Core Features Breakdown

| Feature                        | Description |
|-------------------------------|-------------|
| 🔔 Daily Problem Notifications | Personalized problems delivered via Email/WhatsApp |
| 🧠 AI Practice Path            | Adaptive learning paths based on your progress |
| 📅 Contest Reminder System    | Notifies you of upcoming contests (Codeforces, LeetCode, etc.) |
| ⚔️ CodeRoom Battles           | Join/create live battle rooms with friends |
| 🏆 College Leaderboard        | Track progress within your institution’s community |

---

## 📁 Explore the Codebase

### Frontend:
- Located in: `/frontend/app`
- Structure based on **Next.js App Router** with one `page.tsx` per feature
- Responsive UI using Tailwind and reusable components

### Backend:
- Located in: `/backend/src`
- Organized in **MVC pattern**: `controllers/`, `routes/`, `models/`, `services/`
- Built using Express.js + MongoDB
- Scheduled tasks via `node-cron`

---

## 👥 Want to Contribute?

We welcome PRs that:
- Improve UI/UX
- Fix bugs
- Add new coding platforms
- Enhance AI logic
- Add authentication providers

Check out [`CONTRIBUTING.md`](./CONTRIBUTING.md) to get started!

---

## 📚 Learn More

### Frontend
- [Next.js Docs](https://nextjs.org/docs)
- [ShadCN UI](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Backend
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Docs](https://www.mongodb.com/docs/)
- [OpenAI API Reference](https://platform.openai.com/docs)

---

## 🔗 Live Project (Soon)

👉 [Visit CodeStreak](https://code-streak-lyart.vercel.app) _(Coming Soon!)_

Stay consistent. Stay ahead. ✨
