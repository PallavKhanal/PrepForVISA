"use client"
import React from 'react'
import { useUser } from '@/app/Provider';
import Image from 'next/image';

     


const WecomeContainer = () => {
    const {user} = useUser();
  return (
    <div className="w-full flex justify-between items-center mb-8">
        <div className="w-1/2">
        <h2 className="text-2xl font-bold"> Welcome Back!! {user?.name} </h2>
        <h2 className="text-lg">Ready to start your next interview?</h2>
        </div>
        {user?.picture && (
        <Image
          src={user.picture}
          alt="user image"
          width={50}
          height={50}
          className="rounded-full mt-2 border border-gray-300 shadow-sm"
        />
      )}
    </div>
    
  )
}

export default WecomeContainer