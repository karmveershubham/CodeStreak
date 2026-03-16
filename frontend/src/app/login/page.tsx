"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa"; // Changed from FaLinkedin to FaGithub

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Get the backend URL - use the correct environment variable
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUrl}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // so refresh tokens get stored in cookies
      });

      if (!res.ok) throw new Error("Login failed");

      router.push("/profile");
    } catch (err: any) {
      console.error(err.message);
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/auth/google`;
  };

  const handleGithubLogin = () => { // Changed from handleLinkedInLogin
    window.location.href = `${backendUrl}/auth/github`; // Changed from /auth/linkedin
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-center text-white">
      <div className="w-[400px] flex flex-col items-center gap-6 p-8 bg-gray-800 bg-opacity-95 rounded-2xl shadow-xl">
        
        {/* Heading */}
        <div className="w-full text-left">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-300">Glad you're back!</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
          <input
            type="email"
            placeholder="Email"
            className="w-full h-14 px-4 border border-gray-500 bg-transparent rounded-md text-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full h-14 px-4 border border-gray-500 bg-transparent rounded-md text-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            Remember me
          </label>

          <button
            type="submit"
            className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-lg font-semibold hover:opacity-90 transition"
          >
            Login
          </button>

          <a href="#" className="text-sm text-blue-400 hover:underline">
            Forgot password?
          </a>
        </form>

        {/* Divider */}
        <div className="flex items-center w-full">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-2 text-gray-400">Or</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* OAuth Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 w-40 h-12 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition"
          >
            <FaGoogle /> Google
          </button>
          <button
            onClick={handleGithubLogin} // Changed to handleGithubLogin
            className="flex items-center justify-center gap-2 w-40 h-12 bg-[#333] text-white rounded-md font-medium hover:bg-[#444] transition" // Changed to GitHub colors
          >
            <FaGithub /> GitHub {/* Changed from LinkedIn to GitHub */}
          </button>
        </div>

        {/* Signup link */}
        <p className="text-sm text-gray-300">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}