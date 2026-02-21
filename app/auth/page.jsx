"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import supabase from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

  // If already signed in, go straight to dashboard
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace('/dashboard');
    });
  }, []);

  const SignInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) console.log('Error: ', error.message);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-muted">
      <div className="flex flex-col justify-center items-center border-2 border-border rounded-2xl p-8 bg-background shadow-md">

        <div>
          <Image
            src="/Logo.png"
            alt="Logo"
            width={400}
            height={100}
            className="w-[100px]"
          />
        </div>

        <div className="flex flex-col items-center">
          <Image
            src="/login.jpg"
            alt="Login"
            width={400}
            height={400}
            className="w-[300px]"
          />
          <h2 className="text-2xl font-bold text-center">Welcome to PrepForVISA</h2>
          <p>Your one-stop solution for F1 visa preparation.</p>
          <p>Login using Google to continue.</p>
          <Button className="mt-7 w-full" onClick={SignInWithGoogle}>
            Log in with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
