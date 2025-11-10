"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Interview from "./Interview"; // 

const InterviewIntro = () => {
  const [start, setStart] = useState(false);

  // If user clicked start → show Interview UI
  if (start) {
    return <Interview />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-semibold mb-4">Start Your Interview</h1>
      <p className="text-gray-600 text-center max-w-md mb-8">
        You are about to practice a real-time visa interview with our AI Interview Agent.
        Make sure your mic and camera are ready.
      </p>

      <Button
        className="bg-black text-white hover:bg-gray-800 px-8 py-2"
        onClick={() => setStart(true)}
      >
        Start Interview
      </Button>
    </div>
  );
};

export default InterviewIntro;
