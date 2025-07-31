
"use client";

import React from 'react';

const GalaxyBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Beautiful gradient backgrounds without particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/25 to-purple-900/15 will-change-auto" />
      
      {/* Cosmic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-indigo-900/8 to-violet-900/15 will-change-auto" />
      
      {/* Additional depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-slate-800/10 will-change-auto" />
    </div>
  );
};

export default GalaxyBackground;

