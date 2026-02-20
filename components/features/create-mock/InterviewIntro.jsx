"use client";
import React, { useState } from "react";
import { ArrowRight, Mic, Video, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Interview from "./Interview";

const InterviewIntro = () => {
  const [start, setStart] = useState(false);

  if (start) return <Interview />;

  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <div className="w-full max-w-md mx-4">

        <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">

          {/* Header strip */}
          <div className="bg-[#fafafa] border-b border-gray-100 px-8 py-6 flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 shrink-0">
              <Image src="/visa-officer.png" alt="Visa Officer" fill className="object-cover" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                U.S. Consular Officer
              </p>
              <h2 className="text-sm font-semibold text-[#0a0a0a]">Officer Chen · F-1 Division</h2>
            </div>
          </div>

          <div className="px-8 py-8">
            <h1 className="text-2xl font-bold tracking-tight text-[#0a0a0a] mb-2">
              Ready to begin?
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-7">
              You're about to start a live AI-powered F-1 visa mock interview. Make sure your microphone and camera are ready before continuing.
            </p>

            {/* Checklist */}
            <div className="space-y-2 mb-8">
              {[
                { icon: <Mic className="w-3.5 h-3.5" />, label: "Microphone enabled" },
                { icon: <Video className="w-3.5 h-3.5" />, label: "Camera ready" },
                { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Quiet environment" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3 py-2.5 px-3.5 border border-gray-100 rounded-lg bg-[#fafafa]">
                  <span className="text-gray-400">{icon}</span>
                  <span className="text-sm text-gray-600">{label}</span>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => setStart(true)}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white text-sm font-medium py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-150"
            >
              Start Interview
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-[11px] text-gray-400 mt-4">
              The interview ends automatically once a decision is delivered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewIntro;
