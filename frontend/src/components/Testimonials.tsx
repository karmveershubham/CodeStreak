import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  isDark: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ isDark }) => {
  const testimonials = [
    {
      name: "Ananya Sharma",
      college: "IIT Delhi",
      avatar: "A",
      rating: 5,
      text: "CodeStreak transformed my preparation! The daily WhatsApp challenges kept me consistent, and I cracked my dream job at Google.",
      tags: ["#LeetcodeStreak", "#GoogleSDE"]
    },
    {
      name: "Vikram Patel",
      college: "NIT Surathkal",
      avatar: "V",
      rating: 5,
      text: "The AI-curated problems are spot on! Went from struggling with DSA to solving hard problems confidently in just 3 months.",
      tags: ["#DSAMaster", "#CPRising"]
    },
    {
      name: "Sneha Reddy",
      college: "BITS Pilani",
      avatar: "S",
      rating: 5,
      text: "Room battles with friends made coding fun again! We all improved together and now we're placement ready.",
      tags: ["#TeamWork", "#PlacementReady"]
    }
  ];

  return (
    <section id="testimonials" className={`py-20 px-4 transition-all duration-500 relative overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
      {/* Geometric Pattern Background */}
      <div className="absolute inset-0">
        {/* Hexagon patterns */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-16 h-16 border-2 rotate-45 animate-spin-slow opacity-10 ${
              isDark ? 'border-yellow-400' : 'border-yellow-500'
            }`}
            style={{
              left: `${(i % 4) * 25 + 10}%`,
              top: `${Math.floor(i / 4) * 30 + 10}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: '20s'
            }}
          />
        ))}
        {/* Triangle patterns */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`triangle-${i}`}
            className={`absolute w-0 h-0 opacity-20 animate-pulse ${
              isDark ? 'border-l-purple-400 border-r-purple-400 border-b-purple-400' : 'border-l-purple-500 border-r-purple-500 border-b-purple-500'
            }`}
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 80 + 10}%`,
              borderLeftWidth: '8px',
              borderRightWidth: '8px',
              borderBottomWidth: '14px',
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              animationDelay: `${i * 1.5}s`,
              animationDuration: '4s'
            }}
          />
        ))}
        {/* Circle patterns */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`circle-${i}`}
            className={`absolute w-4 h-4 rounded-full border-2 animate-ping opacity-30 ${
              isDark ? 'border-blue-400' : 'border-blue-500'
            }`}
            style={{
              left: `${Math.random() * 85 + 7.5}%`,
              top: `${Math.random() * 75 + 12.5}%`,
              animationDelay: `${i * 3}s`,
              animationDuration: '6s'
            }}
          />
        ))}
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Love from <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Coders</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            See what our community is saying about their CodeStreak journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl transition-all duration-500 hover:scale-105 ${
                isDark 
                  ? 'bg-slate-700 hover:bg-slate-600 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10' 
                  : 'bg-gray-50 hover:bg-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/10'
              }`}
            >
              <Quote className={`w-8 h-8 mb-6 ${isDark ? 'text-blue-400' : 'text-blue-500'} opacity-60`} />
              
              <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                "{testimonial.text}"
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {testimonial.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {testimonial.college}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star key={starIndex} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;