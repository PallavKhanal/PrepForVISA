"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Mic, Video, ShieldCheck, Lock } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
const Interview = dynamic(() => import("./Interview"), { ssr: false });
import { useUser } from "@/app/Provider";
import supabase from "@/lib/supabase";
import Link from "next/link";

const PLAN_LIMITS = { free: 2, pro: 7, max: 15 };

const InterviewIntro = () => {
  const [start, setStart] = useState(false);
  const { user } = useUser();
  const [planCheck, setPlanCheck] = useState({ checking: true, canStart: true, used: 0, limit: 2 });

  useEffect(() => {
    if (!user?.email) return;
    const check = async () => {
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      const [{ data: userData }, { count }] = await Promise.all([
        supabase.from("Users").select("plan").eq("email", user.email).single(),
        supabase
          .from("MockInterviews")
          .select("*", { count: "exact", head: true })
          .eq("user_email", user.email)
          .gte("created_at", monthStart.toISOString()),
      ]);

      const plan = userData?.plan || "free";
      const limit = PLAN_LIMITS[plan] ?? 2;
      const used = count || 0;
      setPlanCheck({ checking: false, canStart: used < limit, used, limit });
    };
    check();
  }, [user]);

  if (start) return <Interview />;

  return (
    <div className="flex items-center justify-center w-full h-full bg-background">
      <div className="w-full max-w-md mx-4">
        <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">

          {/* Header strip */}
          <div className="bg-muted border-b border-border px-8 py-5 flex items-center gap-4">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border shrink-0">
              <Image src="/visa-officer.png" alt="Visa Officer" fill className="object-cover" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
                U.S. Consular Officer
              </p>
              <h2 className="text-sm font-semibold text-foreground">Officer Mitchell · F-1 Division</h2>
            </div>
          </div>

          <div className="px-8 py-7">
            <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              Ready to begin?
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              You&apos;re about to start a live AI-powered F-1 visa mock interview. Make sure your microphone and camera are ready before continuing.
            </p>

            {/* Checklist */}
            <div className="space-y-2 mb-7">
              {[
                { icon: <Mic className="w-3.5 h-3.5" />, label: "Microphone enabled" },
                { icon: <Video className="w-3.5 h-3.5" />, label: "Camera ready" },
                { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Quiet environment" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3 py-2.5 px-3.5 border border-border rounded-lg bg-muted">
                  <span className="text-muted-foreground">{icon}</span>
                  <span className="text-sm text-foreground/80">{label}</span>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
              ))}
            </div>

            {planCheck.checking ? (
              <button disabled className="w-full inline-flex items-center justify-center gap-2 bg-foreground/40 text-background text-sm font-medium py-3 rounded-lg cursor-not-allowed">
                Checking…
              </button>
            ) : !planCheck.canStart ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-lg border border-border bg-muted px-4 py-3">
                  <Lock className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    You&apos;ve used all {planCheck.limit} mock interview{planCheck.limit !== 1 ? "s" : ""} for this month. Upgrade your plan to continue practicing.
                  </p>
                </div>
                <Link
                  href="/billing"
                  className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background text-sm font-medium py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-150"
                >
                  View Plans
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <button
                onClick={() => setStart(true)}
                className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background text-sm font-medium py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-150"
              >
                Start Interview
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <p className="text-center text-[11px] text-muted-foreground mt-4">
              The interview ends automatically once a decision is delivered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewIntro;
