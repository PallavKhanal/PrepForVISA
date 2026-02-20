"use client";
import React, { useState } from "react";
import { ArrowRight, Mic, Video, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Interview from "./Interview";

const InterviewIntro = () => {
  const [start, setStart] = useState(false);

  if (start) return <Interview />;

  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-[#0a0a0f] overflow-hidden">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full bg-blue-900/20 blur-[140px]" />
        <div className="absolute -bottom-60 -right-60 w-[600px] h-[600px] rounded-full bg-indigo-900/15 blur-[140px]" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-10 shadow-2xl backdrop-blur-xl">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            {/* Avatar */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 shadow-lg shadow-indigo-900/40 mb-5">
              <Image src="/visa-officer.png" alt="Visa Officer" fill className="object-cover" />
            </div>
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-indigo-400 mb-3">
              U.S. Consular Interview Simulation
            </span>
            <h1 className="text-2xl font-bold text-white mb-2">
              Ready to begin?
            </h1>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              You're about to enter a live AI-powered F-1 visa interview with Officer Chen. Make sure your microphone and camera are ready.
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-2.5 mb-8">
            {[
              { icon: <Mic className="w-3.5 h-3.5" />, label: "Microphone enabled" },
              { icon: <Video className="w-3.5 h-3.5" />, label: "Camera ready" },
              { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Quiet environment" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-emerald-400">{icon}</div>
                <span className="text-sm text-white/50">{label}</span>
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => setStart(true)}
            className="w-full flex items-center justify-center gap-2.5 bg-white text-[#0a0a0f] font-semibold text-sm py-4 rounded-2xl shadow-lg hover:bg-white/90 hover:gap-4 active:scale-[0.98] transition-all duration-200"
          >
            Start Interview
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-[11px] text-white/20 mt-4">
            The interview will end automatically once a decision is rendered.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewIntro;
