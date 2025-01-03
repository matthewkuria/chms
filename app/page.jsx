'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import  {setCookie} from "@/utils/cookies"
import ScaleLoader from 'react-spinners/ScaleLoader';
import { ToastProvider} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
  e.preventDefault();

  const email = e.target.email.value; // Assuming you have an input for email
  const password = e.target.password.value; // Assuming you have an input for password
    setLoading(true)
    setError('')
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setLoading(false)
      setSuccess("Successful!")
      toast({
        variant: "success",
        title: "Login Successful",
        description: "Welcome to NCCI dashboard",
      });
      // Store tokens in cookies
      setCookie('access_token', data.access, { expires: 1, secure: true, sameSite: 'Strict' });
      setCookie('refresh_token', data.refresh, { expires: 7, secure: true, sameSite: 'Strict' });
      //  const token = getCookie('access_token');
      // // alert(token)
      // Redirect based on user role
      window.location.href = data.redirect_url; // Redirect to the appropriate dashboard
    } else {      
       toast({
        variant: "destructive",
        title: "Login failed",
        description: data.error,
      });
      setLoading(false)
      setError(data.error)
    }
  } catch (error) {
     toast({
        variant: "destructive",
        title: "Error during login",
        description: error,
      });
  }
  };
  

  return (
     <ToastProvider>     
    <div className="min-h-screen flex items-center justify-center bg-gray-100">     
        <div className="bg-white p-8 rounded shadow-md w-96">
          <Image src="/ncmi-logo.jpg" alt="NCCI-logo" width={200} height={200} className="mx-auto"/>
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          {loading && <ScaleLoader
                color="hsla(217, 90%, 48%, 1)"
                  size={10}
                  speedMultiplier={3}
              /> }
          {error && <p className="text-red-500 font-semibold">{error}</p>}
          {success && <p className="text-green-500 font-semibold">{success}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 w-full rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 w-full rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
            <div className='mt-4 flex justify-end'>
            <Link href="signup" className="">Not a member?<span className='text-blue-900 font-semibold hover:underline border-2 border-slate-200 px-1'>Join Now</span></Link>
          </div>
        </form>
      </div>
    </div>
    </ToastProvider>
  );
}
