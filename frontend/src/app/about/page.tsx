"use client";

import React from "react";
import TeamCard from "@/components/TeamCard";

const AboutPage: React.FC = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Project Intro */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-zinc-900 dark:text-zinc-100">About CodeStreak</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          CodeStreak is an open-source project to help developers build daily coding habits and track progress.
        </p>
      </section>

      {/* Flashcards Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-zinc-800 dark:text-zinc-100">Key Features</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {[
            {
              title: "Streak Tracking",
              description: "Maintain consistency and keep your coding streak alive."
            },
            {
              title: "Motivational Reminders",
              description: "Get daily nudges to stay focused and motivated."
            },
            {
              title: "Daily Goals",
              description: "Set goals and tick them off to stay on track every day."
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="min-w-[250px] p-5 bg-white dark:bg-zinc-900 border rounded shadow-md transition hover:scale-105"
            >
              <h3 className="font-bold text-lg mb-2 text-zinc-800 dark:text-white">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Info Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-zinc-800 dark:text-zinc-100">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              name: "Anushka Srivastava",
              role: "Backend Developer",
              avatarUrl: "https://avatars.githubusercontent.com/u/131137777?v=4",
              github: "https://github.com/anushkacodes",
              linkedin: "https://www.linkedin.com/in/anushka-srivastava-dev/",
            },
          ].map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;