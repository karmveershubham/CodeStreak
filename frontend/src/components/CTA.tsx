import React, { useState } from 'react';
import { Zap } from 'lucide-react';

interface CTAProps {
  isDark: boolean;
}

const CTA: React.FC<CTAProps> = ({ isDark }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    mode: 'whatsapp',
    whatsappOptIn: true,
    agreeTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <section id="get-started" className={`py-20 px-4 transition-all duration-500 relative overflow-hidden bg-transparent`}>
      {/* Animated background gradient */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-tr from-blue-500/20 via-teal-500/20 to-purple-600/20 animate-gradient-x' 
          : 'bg-gradient-to-tr from-blue-300/30 via-teal-300/30 to-purple-400/30 animate-gradient-x'
      }`}></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ready to Start Your <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Streak</span>?
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of coders who never miss a day
          </p>
        </div>
        
        <div className={`max-w-2xl mx-auto p-8 rounded-2xl shadow-2xl ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:scale-105 ${
                    isDark 
                      ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:scale-105 ${
                    isDark 
                      ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Preferred Mode
              </label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:scale-105 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                <option value="whatsapp">📱 WhatsApp</option>
                <option value="email">📧 Email</option>
                <option value="sms">💬 SMS</option>
              </select>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="whatsappOptIn"
                  checked={formData.whatsappOptIn}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-500 border-2 rounded focus:ring-blue-500"
                />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  📲 Send me WhatsApp updates about contests and streaks
                </span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-500 border-2 rounded focus:ring-blue-500"
                  required
                />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  I agree to the <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
                </span>
              </label>
            </div>
            
            <button
              type="submit"
              className="group w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-8 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 relative overflow-hidden"
            >
              <span className="flex items-center justify-center gap-3">
                <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Start My Streak Today
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </span>
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              🔒 We respect your privacy. No spam, only coding challenges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;