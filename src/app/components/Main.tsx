
const Main = () => {
  return (
    <main className="px-6 flex flex-col items-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Keep Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">Code Streak</span> Alive
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
        CodeStreak helps you stay consistent in your coding journey with daily reminders, personalized insights, and seamless progress tracking. Maintain your streak, build skills, and reach new milestones one day at a time.
      </p>
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        
        <a href="/join" className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-300 transition">Join Now</a>
        <a href="/login" className="px-8 py-3 border border-white rounded-full font-semibold hover:bg-white hover:text-black transition">Log In</a>
      </div>
    </main>
  );
};

export default Main;
