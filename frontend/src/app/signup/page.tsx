// app/signup/page.tsx
"use client";
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '../../lib/appwrite';

export default function SignupPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Create a new user account with Appwrite
      await account.create('unique()', email, password);
      alert('Account created successfully');
      router.push('/login');  // Redirect to login page after signup
    } 
    
    catch (error: any) { // Using 'any' to access 'message' property
      console.error('Signup error:', error.message);
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
}
