"use client";
import React from 'react'
import { Video } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CreateOptions = () => {
  const router = useRouter();
  return (
    <div className='grid grid-cols-2 gap-5'>
        <div className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/dashboard/create-interview')}>
            
            <div className='flex items-center mb-2'>
                <Video className='mr-2 h-5 w-5'/>
                Generate Sample Questions
            </div>
            Generate random sample questions that are most commonly asked when applying for a F1 student VISA.
            
        </div>
        <div className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer    " onClick={()=> router.push('/dashboard/create-mock')}>
            <div className='flex items-center mb-2'>
                <Video className='mr-2 h-5 w-5'/>
                Mock Interview with AI
            </div>
            Practice your interview skills with a simulated mock interview session.
        </div>

    </div>
  )
}

export default CreateOptions