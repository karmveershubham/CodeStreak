"use client";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type TeamMember = {
  name: string;
  role: string;
  avatarUrl: string;
  github: string;
  linkedin: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Anushka Srivastava",
    role: "Backend Developer",
    avatarUrl: "https://ui-avatars.com/api/?name=Anushka+Srivastava",
    github: "https://github.com/anushkasrivastava",
    linkedin: "https://linkedin.com/in/anushkasrivastava",
  },
  {
    name: "John Doe",
    role: "Frontend Developer",
    avatarUrl: "https://ui-avatars.com/api/?name=John+Doe",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  {
    name: "Jane Smith",
    role: "UI/UX Designer",
    avatarUrl: "https://ui-avatars.com/api/?name=Jane+Smith",
    github: "https://github.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
  },
];

const TeamCard: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teamMembers.map((member, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow hover:shadow-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center transition-transform duration-300 transform hover:-translate-y-1 animate-fadeIn"
        >
          <img
            src={member.avatarUrl}
            alt={member.name}
            className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500"
          />
          <h3 className="font-semibold text-lg">{member.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">{member.role}</p>
          <div className="flex space-x-4 mt-3">
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              <FaGithub size={20} />
            </a>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamCard;