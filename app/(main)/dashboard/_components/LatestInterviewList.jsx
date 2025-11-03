"use client"
import React, {useState} from 'react'
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';

const LatestInterviewList = () => {
    const [interviews, setInterviews] = useState([]);
  return (
    <div>
        <h2 className='my-5 font-bold text-2xl'>
            Previously Created Interviews
        </h2>
        {
            interviews?.length === 0 &&
            <div className=" py-10 items-center justify-center flex flex-col ">
                <Video className=" h-10 w-10 " />
                <p className="text-gray-500">No interviews created yet.</p>
                <Button className="mt-4">+ Create an Interview</Button>
            </div>
        }
    </div>
  )
}

export default LatestInterviewList