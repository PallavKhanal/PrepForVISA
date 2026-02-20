"use client";

import PostInterviewComponent from "./PostInterviewComponent";
import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import Image from "next/image";
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

// Format seconds → MM:SS
const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

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
  const elapsedIntervalRef = useRef(null);
  const endingRef = useRef(false);
  const mountedRef = useRef(false);

  // ─── End call ────────────────────────────────────────────────────────────────
  const handleEndCall = () => {
    if (endingRef.current) return;
    endingRef.current = true;

    try { if (vapiRef.current) { vapiRef.current.stop(); vapiRef.current = null; } } catch (_) { }
    try { if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; } } catch (_) { }

    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    if (elapsedIntervalRef.current) { clearInterval(elapsedIntervalRef.current); elapsedIntervalRef.current = null; }

    setCallActive(false);
    setAiSpeaking(false);
    setShowPostInterview(true);
  };

  // ─── Setup ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    endingRef.current = false;
    mountedRef.current = true;

    // Camera
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => console.warn("Camera/Mic denied:", err));

    // Vapi
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
        // Elapsed interview timer
        elapsedIntervalRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
        // 10-minute safety cap
        timerRef.current = setTimeout(() => handleEndCall(), 600_000);
      })
      .catch((err) => console.error("Call start failed:", err));

    // Tab switching → end interview
    const onVisibility = () => { if (document.hidden && mountedRef.current) handleEndCall(); };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      mountedRef.current = false;
      document.removeEventListener("visibilitychange", onVisibility);
      try { if (vapiRef.current) { vapiRef.current.stop(); vapiRef.current = null; } } catch (_) { }
      try { if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; } } catch (_) { }
      if (timerRef.current) clearTimeout(timerRef.current);
      if (elapsedIntervalRef.current) clearInterval(elapsedIntervalRef.current);
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
    <div className="relative flex flex-col h-screen w-full bg-[#0a0a0f] overflow-hidden">

      {/* ── Ambient gradient blobs ─────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-900/20 blur-[120px]" />
      </div>

      {/* ── Top bar ───────────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between px-8 pt-6 pb-2">
        {/* Status badge */}
        <div className="flex items-center gap-2.5">
          <span className={`relative flex h-2.5 w-2.5`}>
            {callActive && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${callActive ? "bg-emerald-400" : "bg-yellow-400"}`} />
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase text-white/50">
            {callActive ? "Live Interview" : "Connecting…"}
          </span>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-3">
          <div className="font-mono text-sm text-white/40 tabular-nums">
            {formatTime(elapsed)}
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="text-xs text-white/30 font-medium">F-1 Visa Interview</div>
        </div>
      </div>

      {/* ── Main stage ────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 gap-4 px-8 pb-4 min-h-0">

        {/* Self video (large, left) */}
        <div className="relative flex-1 rounded-2xl overflow-hidden bg-[#111118] border border-white/5 shadow-2xl">
          <video
            ref={videoRef}
            autoPlay muted playsInline
            className={`w-full h-full object-cover transition-all duration-300 ${!videoOn ? "opacity-0" : "opacity-100"}`}
          />

          {/* Camera-off placeholder */}
          {!videoOn && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                <VideoOff className="w-8 h-8 text-white/30" />
              </div>
              <p className="text-white/30 text-sm font-medium">Camera is off</p>
            </div>
          )}

          {/* Self label */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
              {!micOn && <MicOff className="w-3 h-3 text-red-400" />}
              <span className="text-xs font-semibold text-white/80">You</span>
            </div>
          </div>
        </div>

        {/* AI Interviewer panel (right) */}
        <div className="w-[320px] shrink-0 flex flex-col gap-4">

          {/* Officer card */}
          <div className="relative flex-1 rounded-2xl overflow-hidden bg-[#111118] border border-white/5 shadow-2xl flex flex-col items-center justify-center p-6">

            {/* Ambient glow when speaking */}
            <div className={`absolute inset-0 rounded-2xl transition-all duration-700 ${aiSpeaking ? "shadow-[inset_0_0_60px_rgba(99,102,241,0.15)]" : ""}`} />

            {/* Avatar + speaking ring */}
            <div className="relative mb-5">
              {/* Outer pulse ring */}
              {aiSpeaking && (
                <>
                  <div className="absolute -inset-3 rounded-full border-2 border-indigo-500/40 animate-ping" style={{ animationDuration: "1.5s" }} />
                  <div className="absolute -inset-1.5 rounded-full border border-indigo-400/30 animate-pulse" />
                </>
              )}
              <div className={`relative w-28 h-28 rounded-full overflow-hidden border-2 transition-all duration-500 ${aiSpeaking ? "border-indigo-400 shadow-[0_0_24px_rgba(99,102,241,0.5)]" : "border-white/10"}`}>
                <Image src="/visa-officer.png" alt="Visa Officer" fill className="object-cover" />
              </div>
            </div>

            {/* Name + role */}
            <h3 className="text-base font-semibold text-white mb-0.5">Officer Chen</h3>
            <p className="text-xs text-white/40 mb-4 tracking-wide">U.S. Consular Officer · F-1 Visa</p>

            {/* Speaking indicator */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 ${aiSpeaking
                ? "bg-indigo-500/10 border-indigo-500/30"
                : callActive
                  ? "bg-white/5 border-white/10"
                  : "bg-yellow-500/10 border-yellow-500/20"
              }`}>
              {aiSpeaking ? (
                <>
                  {/* Animated soundwave bars */}
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-indigo-400 rounded-full animate-bounce"
                      style={{ height: `${8 + (i % 3) * 4}px`, animationDelay: `${i * 0.1}s`, animationDuration: "0.6s" }}
                    />
                  ))}
                  <span className="text-[10px] font-semibold text-indigo-300 ml-1 tracking-wider uppercase">Speaking</span>
                </>
              ) : (
                <span className="text-[10px] font-semibold tracking-wider uppercase text-white/30">
                  {callActive ? "Listening…" : "Connecting…"}
                </span>
              )}
            </div>

            {/* Info strip */}
            <div className="absolute bottom-0 inset-x-0 border-t border-white/5 bg-white/[0.02] px-4 py-3 flex items-center justify-between">
              <span className="text-[10px] text-white/25 uppercase tracking-widest">U.S. Embassy</span>
              <span className="text-[10px] text-white/25 uppercase tracking-widest">AI Simulation</span>
            </div>
          </div>

          {/* Tip card */}
          <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
            <p className="text-[11px] text-white/30 leading-relaxed">
              💡 <strong className="text-white/50">Tip:</strong> Speak clearly and answer truthfully.
              The officer may ask follow-up questions based on your responses.
            </p>
          </div>
        </div>
      </div>

      {/* ── Control bar ───────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-center gap-4 pb-8 pt-2">
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">

          {/* Mic */}
          <ControlButton
            active={micOn}
            onClick={handleMicToggle}
            activeIcon={<Mic className="w-5 h-5" />}
            inactiveIcon={<MicOff className="w-5 h-5" />}
            label={micOn ? "Mute" : "Unmute"}
            inactiveColor="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
          />

          {/* Camera */}
          <ControlButton
            active={videoOn}
            onClick={handleVideoToggle}
            activeIcon={<Video className="w-5 h-5" />}
            inactiveIcon={<VideoOff className="w-5 h-5" />}
            label={videoOn ? "Hide camera" : "Show camera"}
            inactiveColor="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
          />

          {/* Divider */}
          <div className="w-px h-8 bg-white/10 mx-1" />

          {/* End call */}
          <button
            onClick={handleEndCall}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-red-600 border border-red-500 flex items-center justify-center shadow-lg shadow-red-900/40 group-hover:bg-red-500 group-hover:scale-105 transition-all duration-200">
              <PhoneOff className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] text-white/30 group-hover:text-white/50 transition-colors">End</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Reusable control button ─────────────────────────────────────────────────
const ControlButton = ({ active, onClick, activeIcon, inactiveIcon, label, inactiveColor }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1.5 group">
    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-200 group-hover:scale-105 ${active
        ? "bg-white/10 border-white/15 text-white hover:bg-white/15"
        : inactiveColor
      }`}>
      {active ? activeIcon : inactiveIcon}
    </div>
    <span className="text-[10px] text-white/30 group-hover:text-white/50 transition-colors">{label}</span>
  </button>
);

export default Interview;
