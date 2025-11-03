"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import supabase from '@/services/supabaseClient'

const login = () => {

  const SignInWithGoogle = async () => {
    const {error} = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    if(error) console.log('Error: ', error.message);
  }


  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
  {/* Login Box */}
  <div className="flex flex-col justify-center items-center border-2 border-gray rounded-2xl p-8 bg-white shadow-md">
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
      <p>Your one-stop solution for visa preparation.</p>
      <p>Login using Google to continue.</p>
      <Button className="mt-7 w-full" onClick={SignInWithGoogle}>Log in with Google</Button>
    </div>
  </div>
</div>

  )
}

export default login