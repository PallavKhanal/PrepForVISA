"use client";

import PostInterviewComponent from "./PostInterviewComponent";
import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Bot } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";

// Keywords that signal the interviewer has delivered a final visa decision
const DECISION_KEYWORDS = [
  "visa is approved",
  "visa is accepted",
  "visa has been approved",
  "visa has been accepted",
  "visa is rejected",
  "visa is denied",
  "visa has been rejected",
  "visa has been denied",
  "application is approved",
  "application is rejected",
  "cannot grant you",
  "i am unable to approve",
];

const Interview = () => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [callActive, setCallActive] = useState(false);
  const [showPostInterview, setShowPostInterview] = useState(false);

  // Use refs for everything that handleEndCall touches so closures never go stale
  const vapiRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  // Prevent handleEndCall from running more than once per session
  const endingRef = useRef(false);
  // Track whether the real mount has committed (used to guard visibilitychange)
  const mountedRef = useRef(false);

  // ------------------------------------------------------------------
  // End call – reads only from refs so it's always current, never stale
  // ------------------------------------------------------------------
  const handleEndCall = () => {
    if (endingRef.current) return;
    endingRef.current = true;

    try {
      if (vapiRef.current) {
        vapiRef.current.stop();
        vapiRef.current = null;
      }
    } catch (err) {
      console.log("Error stopping vapi:", err);
    }

    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    } catch (err) {
      console.log("Error stopping stream:", err);
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setCallActive(false);
    setShowPostInterview(true);
  };

  useEffect(() => {
    // Reset guards each time the effect truly re-runs (handles React Strict Mode
    // double-invoke: the cleanup fires, then refs are reset before the real mount)
    endingRef.current = false;
    mountedRef.current = true;

    // ----------------------------------------------------------------
    // 1. Start Camera
    // ----------------------------------------------------------------
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

    // ----------------------------------------------------------------
    // 2. Init Vapi and wire events BEFORE starting the call
    // ----------------------------------------------------------------
    const v = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    vapiRef.current = v;

    // Absorb Vapi's internal errors so EventEmitter doesn't throw them as
    // unhandled exceptions. Do NOT call handleEndCall here — Vapi fires this
    // event for non-fatal events (e.g. WebRTC negotiation warnings) with an
    // empty {} payload. The "call-end" event is the correct signal to end.
    v.on("error", (err) => {
      console.warn("Vapi non-fatal error:", err);
    });

    // Bug 4 fix: end automatically when the assistant finishes the call
    v.on("call-end", () => {
      handleEndCall();
    });

    // Bug 4 fix: detect visa decision in assistant transcript
    v.on("message", (message) => {
      if (message?.role === "assistant" && message?.content) {
        const text = message.content.toLowerCase();
        const isDecision = DECISION_KEYWORDS.some((kw) => text.includes(kw));
        if (isDecision) {
          // Brief delay so the agent finishes speaking before we cut the call
          setTimeout(() => handleEndCall(), 2000);
        }
      }

    });

    // Start the call
    v.start(process.env.NEXT_PUBLIC_VAPI_AGENT_ID)
      .then(() => {
        setCallActive(true);
        // Safety-net: auto-end after 10 minutes
        timerRef.current = setTimeout(() => handleEndCall(), 600_000);
      })
      .catch((err) => console.error("Call start failed:", err));

    // ----------------------------------------------------------------
    // Bug 5 fix: end interview when user switches to another tab
    // ----------------------------------------------------------------
    const handleVisibilityChange = () => {
      if (document.hidden && mountedRef.current) {
        handleEndCall();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // ----------------------------------------------------------------
    // Cleanup — only release resources, do NOT call handleEndCall here.
    // Calling handleEndCall() in cleanup would trigger the PostInterview
    // screen during React Strict Mode's intentional mount→cleanup→mount
    // double-invoke in development.
    // ----------------------------------------------------------------
    return () => {
      mountedRef.current = false;
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      // Stop Vapi
      try {
        if (vapiRef.current) {
          vapiRef.current.stop();
          vapiRef.current = null;
        }
      } catch (_) { }

      // Stop camera/mic tracks
      try {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
      } catch (_) { }

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ------------------------------------------------------------------
  // Mic toggle
  // ------------------------------------------------------------------
  const handleMicToggle = () => {
    if (!vapiRef.current) return;
    const newState = !micOn;
    setMicOn(newState);
    vapiRef.current.setMuted(!newState);
  };

  // ------------------------------------------------------------------
  // Camera toggle (local stream only — Vapi is audio-only)
  // ------------------------------------------------------------------
  const handleVideoToggle = () => {
    setVideoOn((prev) => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          if (track.kind === "video") track.enabled = !prev;
        });
      }
      return !prev;
    });
  };

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
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
          className="bg-red-600 text-white hover:bg-red-700 px-6"
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
