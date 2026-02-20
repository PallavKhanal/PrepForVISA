"use client";

import PostInterviewComponent from "./PostInterviewComponent";
import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import Image from "next/image";
import Vapi from "@vapi-ai/web";

const DECISION_KEYWORDS = [
  "visa is approved", "visa is accepted", "visa has been approved", "visa has been accepted",
  "visa is rejected", "visa is denied", "visa has been rejected", "visa has been denied",
  "application is approved", "application is rejected", "cannot grant you", "i am unable to approve",
];

const formatTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const Interview = () => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [callActive, setCallActive] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showPostInterview, setShowPostInterview] = useState(false);

  const vapiRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const elapsedRef = useRef(null);
  const endingRef = useRef(false);
  const mountedRef = useRef(false);

  const handleEndCall = () => {
    if (endingRef.current) return;
    endingRef.current = true;
    try { if (vapiRef.current) { vapiRef.current.stop(); vapiRef.current = null; } } catch (_) { }
    try { if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; } } catch (_) { }
    if (timerRef.current) clearTimeout(timerRef.current);
    if (elapsedRef.current) clearInterval(elapsedRef.current);
    setCallActive(false);
    setAiSpeaking(false);
    setShowPostInterview(true);
  };

  useEffect(() => {
    endingRef.current = false;
    mountedRef.current = true;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => console.warn("Camera/Mic denied:", err));

    const v = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    vapiRef.current = v;

    v.on("error", (err) => console.warn("Vapi non-fatal:", err));
    v.on("call-end", () => handleEndCall());
    v.on("speech-start", () => setAiSpeaking(true));
    v.on("speech-end", () => setAiSpeaking(false));
    v.on("message", (msg) => {
      if (msg?.role === "assistant" && msg?.content) {
        const text = msg.content.toLowerCase();
        if (DECISION_KEYWORDS.some((kw) => text.includes(kw))) {
          setTimeout(() => handleEndCall(), 2000);
        }
      }
    });

    v.start(process.env.NEXT_PUBLIC_VAPI_AGENT_ID)
      .then(() => {
        setCallActive(true);
        elapsedRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
        timerRef.current = setTimeout(() => handleEndCall(), 600_000);
      })
      .catch((err) => console.error("Call start failed:", err));

    const onVisibility = () => { if (document.hidden && mountedRef.current) handleEndCall(); };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      mountedRef.current = false;
      document.removeEventListener("visibilitychange", onVisibility);
      try { if (vapiRef.current) { vapiRef.current.stop(); vapiRef.current = null; } } catch (_) { }
      try { if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; } } catch (_) { }
      if (timerRef.current) clearTimeout(timerRef.current);
      if (elapsedRef.current) clearInterval(elapsedRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMicToggle = () => {
    if (!vapiRef.current) return;
    const next = !micOn;
    setMicOn(next);
    vapiRef.current.setMuted(!next);
  };

  const handleVideoToggle = () => {
    setVideoOn((prev) => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => { if (t.kind === "video") t.enabled = !prev; });
      }
      return !prev;
    });
  };

  if (showPostInterview) return <PostInterviewComponent />;

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">

      {/* ── Top bar ── */}
      <div className="shrink-0 flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            {callActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${callActive ? "bg-emerald-500" : "bg-gray-300"}`} />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
            {callActive ? "Live Interview" : "Connecting…"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-gray-400 tabular-nums">{formatTime(elapsed)}</span>
          <div className="h-3.5 w-px bg-gray-200" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">F-1 Visa · Mock Interview</span>
        </div>
      </div>

      {/* ── Main area ── */}
      <div className="flex flex-1 gap-6 p-6 min-h-0">

        {/* Self video */}
        <div className="relative flex-1 rounded-xl overflow-hidden bg-[#fafafa] border border-gray-100">
          <video
            ref={videoRef}
            autoPlay muted playsInline
            className={`w-full h-full object-cover transition-opacity duration-300 ${videoOn ? "opacity-100" : "opacity-0"}`}
          />
          {!videoOn && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-2 shadow-sm">
                <VideoOff className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-400 font-medium">Camera off</p>
            </div>
          )}
          {/* Self label */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-white border border-gray-200 rounded-md px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
              {!micOn && <MicOff className="w-3 h-3 text-gray-400" />}
              <span className="text-xs font-semibold text-gray-600">You</span>
            </div>
          </div>
        </div>

        {/* AI Officer panel */}
        <div className="w-72 shrink-0 flex flex-col gap-4">

          {/* Officer card */}
          <div className="flex-1 rounded-xl border border-gray-100 bg-white flex flex-col items-center justify-center p-6 text-center shadow-sm">

            {/* Avatar with speaking ring */}
            <div className="relative mb-4">
              <div className={`absolute -inset-1.5 rounded-full border-2 transition-all duration-500 ${aiSpeaking ? "border-gray-400 opacity-100" : "border-transparent opacity-0"}`} />
              <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                <Image src="/visa-officer.png" alt="Visa Officer" fill className="object-cover" />
              </div>
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Consular Officer</p>
            <h3 className="text-base font-semibold text-[#0a0a0a] mb-0.5">Officer Chen</h3>
            <p className="text-xs text-gray-400 mb-4">U.S. Embassy · F-1 Division</p>

            {/* Speaking indicator */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 ${aiSpeaking
                ? "border-gray-300 bg-[#fafafa] text-gray-600"
                : callActive
                  ? "border-gray-100 bg-white text-gray-300"
                  : "border-gray-100 bg-white text-gray-300"
              }`}>
              {aiSpeaking ? (
                <>
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-gray-500 rounded-full animate-bounce"
                      style={{ height: `${8 + (i % 2) * 4}px`, animationDelay: `${i * 0.12}s`, animationDuration: "0.7s" }}
                    />
                  ))}
                  <span className="ml-1">Speaking</span>
                </>
              ) : (
                <span>{callActive ? "Listening" : "Connecting…"}</span>
              )}
            </div>
          </div>

          {/* Tip */}
          <div className="rounded-xl border border-gray-100 bg-[#fafafa] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Tip</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Keep answers short and direct. One or two clear sentences signal confidence.
            </p>
          </div>
        </div>
      </div>

      {/* ── Control bar ── */}
      <div className="shrink-0 border-t border-gray-100 bg-white py-4 px-8 flex items-center justify-center gap-3">

        {/* Mic */}
        <button
          onClick={handleMicToggle}
          className={`flex flex-col items-center gap-1.5 group`}
        >
          <div className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-150 ${micOn
              ? "bg-white border-gray-200 text-[#0a0a0a] hover:border-gray-400"
              : "bg-[#fafafa] border-gray-300 text-gray-400"
            }`}>
            {micOn ? <Mic className="w-4.5 h-4.5" /> : <MicOff className="w-4.5 h-4.5" />}
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            {micOn ? "Mute" : "Unmute"}
          </span>
        </button>

        {/* Camera */}
        <button
          onClick={handleVideoToggle}
          className="flex flex-col items-center gap-1.5 group"
        >
          <div className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-150 ${videoOn
              ? "bg-white border-gray-200 text-[#0a0a0a] hover:border-gray-400"
              : "bg-[#fafafa] border-gray-300 text-gray-400"
            }`}>
            {videoOn ? <Video className="w-4.5 h-4.5" /> : <VideoOff className="w-4.5 h-4.5" />}
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            {videoOn ? "Hide cam" : "Show cam"}
          </span>
        </button>

        <div className="w-px h-8 bg-gray-100 mx-2" />

        {/* End call */}
        <button
          onClick={handleEndCall}
          className="flex flex-col items-center gap-1.5 group"
        >
          <div className="w-11 h-11 rounded-xl bg-[#0a0a0a] border border-[#0a0a0a] text-white flex items-center justify-center transition-all duration-150 hover:bg-gray-800">
            <PhoneOff className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">End</span>
        </button>
      </div>
    </div>
  );
};

export default Interview;
