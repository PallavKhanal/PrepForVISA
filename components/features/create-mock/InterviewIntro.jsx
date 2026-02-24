"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Mic, Video, ShieldCheck, Lock } from "lucide-react";
import dynamic from "next/dynamic";
const Interview = dynamic(() => import("./Interview"), { ssr: false });
import { useUser } from "@/app/Provider";
import supabase from "@/lib/supabase";
import Link from "next/link";

const PLAN_LIMITS = { free: 2, pro: 7, max: Infinity };

const OFFICERS = [
  {
    id: "michelle",
    name: "Officer Michelle",
    vapiId: "0fcf61fb-973d-40fe-b71b-5525d6512b0c",
    title: "Consular Officer",
    unit: "Nonimmigrant Visa Unit",
    image: "/visa-officer.png",
  },
  {
    id: "donna",
    name: "Officer Donna",
    vapiId: "50e9943d-3c57-4eb8-aba3-87ba85171883",
    title: "Consular Officer",
    unit: "Nonimmigrant Visa Unit",
    image: "/officers/donna.webp",
  },
  {
    id: "henry",
    name: "Officer Henry",
    vapiId: "4e0f1d61-5945-4e5a-92fb-9d8bfc833dea",
    title: "Consular Officer",
    unit: "Nonimmigrant Visa Unit",
    image: "/officers/henry.webp",
  },
];

const InterviewIntro = () => {
  const [selectedOfficer, setSelectedOfficer] = useState(null);
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

  if (start && selectedOfficer) return <Interview officer={selectedOfficer} />;

  // ── Step 1: Officer selection ──────────────────────────────────────────────
  if (!selectedOfficer) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-background px-6 py-8 overflow-auto">
        <div className="w-full max-w-4xl">

          {/* Page header */}
          <div className="mb-10 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">
              U.S. Consulate · F-1 Visa Division
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              Select a Visa Officer
            </h1>
            <p className="text-sm text-muted-foreground">
              You will be conducting your mock F-1 visa interview with the officer you select.
            </p>
          </div>

          {/* Officer cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {OFFICERS.map((officer) => (
              <button
                key={officer.id}
                onClick={() => setSelectedOfficer(officer)}
                className="group text-left rounded-xl overflow-hidden border border-border bg-background transition-all duration-200 hover:border-foreground/20 hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
              >
                {/* Photo */}
                <div className="relative overflow-hidden bg-muted" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={officer.image}
                    alt={officer.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                  {/* Name overlay */}
                  <div className="absolute bottom-0 inset-x-0 px-4 pb-4">
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-white/60 mb-0.5">
                      {officer.title}
                    </p>
                    <h3 className="text-sm font-semibold text-white leading-snug">{officer.name}</h3>
                    <p className="text-[10px] text-white/50 mt-0.5">{officer.unit}</p>
                  </div>
                </div>

                {/* CTA row */}
                <div className="px-4 py-3 flex items-center justify-between bg-muted border-t border-border">
                  <span className="text-xs text-muted-foreground">Interview with this officer</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-150" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Step 2: Confirmation ───────────────────────────────────────────────────
  return (
    <div className="flex items-center justify-center w-full h-full bg-background">
      <div className="w-full max-w-md mx-4">
        <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">

          {/* Header strip */}
          <div className="bg-muted border-b border-border px-8 py-5 flex items-center gap-4">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border shrink-0">
              <img
                src={selectedOfficer.image}
                alt={selectedOfficer.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
                U.S. Consular Officer
              </p>
              <h2 className="text-sm font-semibold text-foreground truncate">
                {selectedOfficer.name} · F-1 Division
              </h2>
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

            <button
              onClick={() => setSelectedOfficer(null)}
              className="w-full mt-3 inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Choose a different officer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewIntro;
