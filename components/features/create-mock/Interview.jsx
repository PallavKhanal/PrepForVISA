"use client";

import PostInterviewComponent from "./PostInterviewComponent";
import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Bot } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";

const Interview = () => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [vapi, setVapi] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [showPostInterview, setShowPostInterview] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Start Camera
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.log("Camera/Mic Permission Denied:", err);
      }
    };

    startCamera();

    // Start Vapi Call
    const v = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    setVapi(v);

    v.start(process.env.NEXT_PUBLIC_VAPI_AGENT_ID)
      .then(() => {
        setCallActive(true);

        // Auto-end after 3 minutes
        timerRef.current = setTimeout(() => {
          handleEndCall();
        }, 180000);
      })
      .catch((err) => console.error("Call start failed:", err));

    // Cleanup on unmount
    return () => {
      v.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mic Control
  const handleMicToggle = () => {
    if (!vapi) return;
    const newState = !micOn;
    setMicOn(newState);
    vapi.setMuted(!newState);
  };

  // Camera Control (local only)
  const handleVideoToggle = () => {
    setVideoOn(!videoOn);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        if (track.kind === "video") track.enabled = !videoOn;
      });
    }
  };

  // End Interview Cleanly
  const handleEndCall = async () => {
    try {
      if (vapi) await vapi.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (timerRef.current) clearTimeout(timerRef.current);
      setCallActive(false);
      setShowPostInterview(true);
    } catch (err) {
      console.log("Error ending call:", err);
    }
  };

  if (showPostInterview) return <PostInterviewComponent />;

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white text-black p-6">
      {/* Layout */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-10 items-center justify-center">
        {/* Self Camera */}
        <div className="relative w-full md:w-[60%] aspect-video rounded-xl overflow-hidden shadow-xl border border-black bg-black">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* AI Interviewer Card */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border border-black shadow-md">
            <Image src="/avatar.webp" alt="AI" fill className="object-cover" />
          </div>
          <h2 className="text-2xl font-semibold">AI Interviewer</h2>
          <p className="text-sm text-gray-600">
            {callActive ? "Interview in progress..." : "Connecting..."}
          </p>
          <div className="w-20 h-20 flex items-center justify-center rounded-full border border-black">
            <Bot className="w-8 h-8 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex space-x-6 mt-10">
        <Button
          variant="outline"
          className="border border-black hover:bg-black hover:text-white"
          onClick={handleMicToggle}
        >
          {micOn ? <Mic /> : <MicOff />}
        </Button>

        <Button
          variant="outline"
          className="border border-black hover:bg-black hover:text-white"
          onClick={handleVideoToggle}
        >
          {videoOn ? <Video /> : <VideoOff />}
        </Button>

        <Button
          className="bg-black text-white hover:bg-gray-800 px-6"
          onClick={handleEndCall}
        >
          <PhoneOff />
        </Button>
      </div>

      <p className="text-gray-600 text-xs mt-4">
        {callActive ? "Connected • Speaking" : "Disconnected"}
      </p>
    </div>
  );
};

export default Interview;
