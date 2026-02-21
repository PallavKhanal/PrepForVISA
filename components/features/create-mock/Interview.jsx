"use client";

import PostInterviewComponent from "./PostInterviewComponent";
import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Vapi from "@vapi-ai/web";
import supabase from "@/lib/supabase";
import { useUser } from "@/app/Provider";

const APPROVED_KEYWORDS = [
  "visa has been approved", "your visa has been approved",
  "visa is approved", "visa is accepted", "visa has been accepted",
  "i am satisfied with your responses",
];

const DENIED_KEYWORDS = [
  "visa application has been denied", "your visa application has been denied",
  "visa has been denied", "visa is denied", "visa has been rejected", "visa is rejected",
  "i am not satisfied that you meet the requirements",
  "cannot grant you", "i am unable to approve",
];

const END_CALL_PHRASES = ["this concludes your interview"];

const formatTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const Interview = () => {
  const { user } = useUser();
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(true);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showPostInterview, setShowPostInterview] = useState(false);
  const [interviewOutcome, setInterviewOutcome] = useState("unknown");

  const vapiRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const elapsedRef = useRef(null);
  const mountedRef = useRef(false);

  // Refs to track call data — safe in stale closures since we read .current at call-time
  const callIdRef = useRef(null);
  const outcomeRef = useRef("unknown");
  const transcriptRef = useRef([]);
  const elapsedSecondsRef = useRef(0);
  const savedRef = useRef(false);
  const userEmailRef = useRef(null);

  // Keep userEmailRef current whenever user loads (user starts null, loads async)
  useEffect(() => {
    userEmailRef.current = user?.email || null;
  }, [user]);

  const handleEndCall = () => {
    // Snapshot all data before async cleanup mutates refs
    const finalDuration = elapsedSecondsRef.current;
    const finalOutcome = outcomeRef.current;
    const finalTranscript = [...transcriptRef.current];
    const finalCallId = callIdRef.current;
    const email = userEmailRef.current;

    // Persist to Supabase exactly once
    if (!savedRef.current && email) {
      savedRef.current = true;
      supabase
        .from("MockInterviews")
        .insert([{
          call_id: finalCallId,
          user_email: email,
          duration_seconds: finalDuration,
          outcome: finalOutcome,
          transcript: finalTranscript,
        }])
        .then(() => {})
        .catch((e) => console.warn("Failed to save interview:", e));
    }

    try { if (vapiRef.current) { vapiRef.current.stop(); vapiRef.current = null; } } catch (_) { }
    try { if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; } } catch (_) { }
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    if (elapsedRef.current) { clearInterval(elapsedRef.current); elapsedRef.current = null; }
    setCallActive(false);
    setConnecting(false);
    setAiSpeaking(false);
    setInterviewOutcome(finalOutcome);
    setShowPostInterview(true);
  };

  useEffect(() => {
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
      // Collect finalized transcript turns
      if (msg?.type === "transcript" && msg?.transcriptType === "final" && msg?.transcript) {
        transcriptRef.current.push({ role: msg.role, text: msg.transcript });
      }

      // Detect visa outcome and call-end trigger from assistant messages
      if (msg?.role === "assistant" && msg?.content) {
        const text = msg.content.toLowerCase();
        if (APPROVED_KEYWORDS.some((kw) => text.includes(kw))) {
          outcomeRef.current = "approved";
        } else if (DENIED_KEYWORDS.some((kw) => text.includes(kw))) {
          outcomeRef.current = "denied";
        }
        // End the call when the officer says the closing phrase
        if (END_CALL_PHRASES.some((kw) => text.includes(kw))) {
          setTimeout(() => handleEndCall(), 3000);
        }
      }
    });

    const startCall = async () => {
      // Build previous-topics context from up to 3 prior interviews
      let previousTopics = "This is the applicant's first interview. You have no prior context about them.";
      const email = userEmailRef.current;
      if (email) {
        const { data } = await supabase
          .from("MockInterviews")
          .select("transcript, created_at")
          .eq("user_email", email)
          .order("created_at", { ascending: false })
          .limit(3);
        if (data && data.length > 0) {
          const questions = [];
          data.forEach((session) => {
            (session.transcript || []).forEach((turn) => {
              if (turn.role === "assistant" && turn.text?.includes("?")) {
                questions.push(turn.text.trim());
              }
            });
          });
          if (questions.length > 0) {
            previousTopics = `The applicant has completed ${data.length} previous mock interview(s). Questions asked in prior sessions:\n${questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}\n\nDo NOT repeat these questions. Choose completely different angles.`;
          }
        }
      }

      v.start(process.env.NEXT_PUBLIC_VAPI_AGENT_ID, {
        variableValues: { previousTopics },
      })
        .then((call) => {
          callIdRef.current = call?.id || null;
          setCallActive(true);
          setConnecting(false);
          elapsedRef.current = setInterval(() => {
            setElapsed((s) => {
              elapsedSecondsRef.current = s + 1;
              return s + 1;
            });
          }, 1000);
          timerRef.current = setTimeout(() => handleEndCall(), 600_000);
        })
        .catch((err) => console.error("Call start failed:", err));
    };

    startCall();

    const onVisibility = () => { if (document.hidden && mountedRef.current) handleEndCall(); };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      mountedRef.current = false;
      document.removeEventListener("visibilitychange", onVisibility);
      try { if (vapiRef.current) { vapiRef.current.stop(); vapiRef.current = null; } } catch (_) { }
      try { if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; } } catch (_) { }
      if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
      if (elapsedRef.current) { clearInterval(elapsedRef.current); elapsedRef.current = null; }
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

  if (showPostInterview) return (
    <PostInterviewComponent
      outcome={interviewOutcome}
      durationSeconds={elapsedSecondsRef.current}
    />
  );

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">

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
          <div className="flex-1 rounded-xl border border-gray-100 bg-white flex flex-col items-center justify-center p-6 text-center shadow-sm relative overflow-hidden">

            {/* Connecting overlay */}
            {connecting && (
              <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center z-10 rounded-xl">
                <Loader2 className="w-6 h-6 text-gray-400 animate-spin mb-3" />
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Please wait</p>
                <p className="text-xs text-gray-400">Connecting to Officer Mitchell…</p>
              </div>
            )}

            {/* Avatar with speaking ring */}
            <div className="relative mb-4">
              <div className={`absolute -inset-1.5 rounded-full border-2 transition-all duration-500 ${aiSpeaking ? "border-gray-400 opacity-100" : "border-transparent opacity-0"}`} />
              <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                <Image src="/visa-officer.png" alt="Visa Officer" fill className="object-cover" />
              </div>
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Consular Officer</p>
            <h3 className="text-base font-semibold text-[#0a0a0a] mb-0.5">Officer Mitchell</h3>
            <p className="text-xs text-gray-400 mb-4">U.S. Consulate · F-1 Division</p>

            {/* Speaking indicator */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 ${aiSpeaking
                ? "border-gray-300 bg-[#fafafa] text-gray-600"
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
                <span>{callActive ? "Listening" : "Ready"}</span>
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
