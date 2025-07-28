

"use client";

import { FaBell, FaFire, FaChartBar, FaCalendarAlt } from "react-icons/fa";

const features = [
  {
    title: "Daily Reminder Scheduling",
    description:
      "Never miss a coding session! Set up daily reminders to stay consistent.",
    icon: <FaBell className="text-blue-500 text-4xl mb-4" />,
  },
  {
    title: "Personalized Streak Insights",
    description:
      "Get data-driven insights tailored to your coding habits and streaks.",
    icon: <FaFire className="text-red-500 text-4xl mb-4" />,
  },
  {
    title: "Goal Completion Stats",
    description:
      "Track and analyze how often you meet your coding goals.",
    icon: <FaChartBar className="text-green-500 text-4xl mb-4" />,
  },
  {
    title: "Calendar Heatmap",
    description:
      "Visualize your progress with a sleek contribution-style calendar heatmap.",
    icon: <FaCalendarAlt className="text-purple-500 text-4xl mb-4" />,
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Explore CodeStreak Features</h1>
      <p className="text-gray-600 mb-10 text-lg max-w-xl mx-auto">
        Discover how CodeStreak helps you build powerful coding habits with real data and smooth reminders.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all dark:bg-gray-800 dark:text-white">
            <div className="flex flex-col items-center">
              {feature.icon}
              <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}