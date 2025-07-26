// // app/login/page.tsx
// "use client";
// import { account } from '../../lib/appwrite';
// import { useRouter } from 'next/navigation';
// import { useState, FormEvent } from 'react';

// export default function LoginPage() {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const router = useRouter();

//   const handleLogin = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       await account.createSession(email, password);
//       router.push('/dashboard');
//     } catch (error: any) { // Cast error to 'any' to access 'message' property
//       console.error('Login failed:', error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="email"
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-center text-white">
      <div className="w-[400px] flex flex-col items-center gap-[20px] p-6 bg-opacity-90 bg-gray-800 rounded-md shadow-lg">
        
        <div className="flex flex-col items-start gap-[14px] w-full">
    
          <div className="w-full">
            <h1 className="text-white font-semibold text-3xl">Login</h1>
            <p className="text-white font-medium text-lg">Glad you’re back!</p>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="w-full">
              <input type="text"  placeholder="Username" className="w-full h-14 px-4 py-2 border border-white bg-transparent rounded-md text-lg text-white placeholder-white focus:outline-none focus:border-blue-500" />
            </div>

            <div className="w-full">
              <div className="flex items-center ">
                <input type="password" placeholder="Password"  className="w-full h-14 px-4 py-2 border border-white bg-transparent rounded-md text-lg text-white placeholder-white focus:outline-none focus:border-blue-500"    />
              </div>

              <label className="flex items-center gap-2 mt-2">
                <input type="checkbox"  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"  />
                <span className="text-white text-sm">Remember me</span>
              </label>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <button className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-lg font-semibold">
            Login
          </button>
          <a href="#" className="text-white text-sm">Forgot password?</a>
        </div>

        <div className="w-full flex flex-col items-center gap-2">
          <div className="flex items-center w-full">
            <hr className="flex-grow border-t border-gray-600" />
            <span className="mx-2 text-gray-400">Or</span>
            <hr className="flex-grow border-t border-gray-600" />
          </div>

          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-white"></button>
            <button className="w-10 h-10 rounded-full bg-white"></button>
          </div>
        </div>
        
        <div className="w-full text-center">
          <p className="text-white text-sm">Don't have an account? <a href="/signup" className="text-blue-400">Signup</a></p>
        </div>
      </div>
    </div>
  );
}


