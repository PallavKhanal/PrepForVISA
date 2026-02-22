"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/app/Provider";
import supabase from "@/lib/supabase";
import { Check, Zap, Crown, Sparkles, ArrowRight, Mic, FileQuestion } from "lucide-react";

const PLANS = {
  free: {
    key: "free",
    name: "Free",
    priceLabel: "$0",
    tagline: "Try the experience",
    mockInterviews: 2,
    questionGenerations: 2,
    icon: Sparkles,
    features: [
      "2 live mock interviews / month",
      "2 AI question banks / month",
      "Interview history",
      "Expert advice guide",
    ],
  },
  pro: {
    key: "pro",
    name: "Pro",
    comingSoon: true,
    tagline: "For serious applicants",
    mockInterviews: 7,
    questionGenerations: 5,
    icon: Zap,
    features: [
      "7 live mock interviews / month",
      "5 AI question banks / month",
      "Full interview history",
      "Smart question progression",
      "Expert advice guide",
    ],
  },
  max: {
    key: "max",
    name: "Max",
    comingSoon: true,
    tagline: "Daily prep until interview day",
    mockInterviews: 15,
    questionGenerations: 8,
    icon: Crown,
    features: [
      "15 live mock interviews / month",
      "8 AI question banks / month",
      "Full interview history",
      "Smart question progression",
      "Expert advice guide",
      "Priority support",
    ],
  },
};

const PLAN_ORDER = { free: 0, pro: 1, max: 2 };

export default function BillingPage() {
  const { user } = useUser();
  const [currentPlan, setCurrentPlan] = useState(null);
  const [mockUsed, setMockUsed] = useState(0);
  const [questionsUsed, setQuestionsUsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    const fetchData = async () => {
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      const [{ data: userData }, { count: mockCount }, { count: questionCount }] =
        await Promise.all([
          supabase.from("Users").select("plan").eq("email", user.email).single(),
          supabase
            .from("MockInterviews")
            .select("*", { count: "exact", head: true })
            .eq("user_email", user.email)
            .gte("created_at", monthStart.toISOString()),
          supabase
            .from("Interviews")
            .select("*", { count: "exact", head: true })
            .eq("user_email", user.email)
            .gte("created_at", monthStart.toISOString()),
        ]);

      setCurrentPlan(userData?.plan || "free");
      setMockUsed(mockCount || 0);
      setQuestionsUsed(questionCount || 0);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleUpgrade = async (planKey) => {
    if (!user?.email || planKey === currentPlan) return;
    setUpgrading(planKey);
    const { error } = await supabase
      .from("Users")
      .update({ plan: planKey })
      .eq("email", user.email);
    if (!error) setCurrentPlan(planKey);
    setUpgrading(null);
  };

  if (loading) {
    return (
      <div className="h-full p-6 flex flex-col gap-5 animate-pulse">
        <div className="h-6 w-32 bg-muted rounded-lg" />
        <div className="h-20 bg-muted rounded-2xl" />
        <div className="flex-1 grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => <div key={i} className="bg-muted rounded-2xl" />)}
        </div>
        <div className="h-10 bg-muted rounded-xl" />
      </div>
    );
  }

  const plan = PLANS[currentPlan] || PLANS.free;
  const mockRemaining = Math.max(0, plan.mockInterviews - mockUsed);
  const questionsRemaining = Math.max(0, plan.questionGenerations - questionsUsed);

  return (
    <div className="relative h-full">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:16px_16px]"
      />

      <div className="flex flex-col gap-5 h-full p-6">

        {/* Header */}
        <div className="shrink-0 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">Billing</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Manage your plan and track your usage.</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-widest ${
            currentPlan === "max"
              ? "bg-foreground text-background border-foreground"
              : currentPlan === "pro"
              ? "bg-foreground/90 text-background border-foreground/90"
              : "bg-muted text-muted-foreground border-border"
          }`}>
            <plan.icon className="w-3 h-3" />
            {plan.name} Plan
          </div>
        </div>

        {/* Usage row */}
        <div className="shrink-0 grid grid-cols-2 gap-4">
          <UsageStat
            icon={Mic}
            label="Mock Interviews remaining"
            used={mockUsed}
            total={plan.mockInterviews}
            remaining={mockRemaining}
          />
          <UsageStat
            icon={FileQuestion}
            label="Question Banks remaining"
            used={questionsUsed}
            total={plan.questionGenerations}
            remaining={questionsRemaining}
          />
        </div>

        {/* Plan cards */}
        <div className="flex-1 grid grid-cols-3 gap-5 min-h-0">
          {Object.values(PLANS).map((p) => (
            <PlanCard
              key={p.key}
              plan={p}
              isCurrent={currentPlan === p.key}
              isUpgrading={upgrading === p.key}
              onSelect={() => handleUpgrade(p.key)}
              currentPlanKey={currentPlan}
            />
          ))}
        </div>


      </div>
    </div>
  );
}

/* ── Usage stat ── */
function UsageStat({ icon: Icon, label, used, total, remaining }) {
  const pct = Math.min(100, (used / total) * 100);
  const isFull = pct >= 100;

  return (
    <div className="rounded-xl border border-border bg-background/70 backdrop-blur px-6 py-5 flex items-center gap-5">
      <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground truncate">{label}</span>
          <span className={`text-sm font-bold ml-2 shrink-0 ${isFull ? "text-red-500" : "text-foreground"}`}>
            {remaining} / {total}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isFull ? "bg-red-400" : "bg-foreground"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className={`mt-1.5 text-[12px] font-medium ${isFull ? "text-red-500" : "text-muted-foreground"}`}>
          {isFull ? "Limit reached — upgrade to continue" : `${remaining} remaining`}
        </p>
      </div>
    </div>
  );
}

/* ── Plan card ── */
function PlanCard({ plan, isCurrent, isUpgrading, onSelect, currentPlanKey }) {
  const Icon = plan.icon;
  const isDowngrade = PLAN_ORDER[plan.key] < PLAN_ORDER[currentPlanKey];
  const comingSoon = !!plan.comingSoon;

  return (
    <div className={`flex flex-col rounded-2xl border p-6 transition-all duration-200 overflow-hidden ${
      isCurrent
        ? "border-foreground bg-foreground text-background shadow-lg"
        : comingSoon
        ? "border-border bg-background/40 opacity-70"
        : "border-border bg-background/70 backdrop-blur hover:border-input hover:shadow-md"
    }`}>

      {/* Top badge row */}
      <div className="flex items-center justify-between mb-5">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
          isCurrent ? "bg-background/10" : "bg-muted"
        }`}>
          <Icon className={`w-4 h-4 ${isCurrent ? "text-background" : "text-muted-foreground"}`} />
        </div>
        {isCurrent && (
          <span className="text-[10px] font-bold uppercase tracking-widest bg-background/15 text-background px-2.5 py-1 rounded-full">
            Active
          </span>
        )}
        {comingSoon && (
          <span className="text-[10px] font-bold uppercase tracking-widest bg-muted text-muted-foreground border border-border px-2.5 py-1 rounded-full">
            Coming Soon
          </span>
        )}
      </div>

      {/* Name + price */}
      <p className={`text-[11px] font-semibold uppercase tracking-widest mb-1 ${isCurrent ? "text-background/50" : "text-muted-foreground"}`}>
        {plan.name}
      </p>
      {!comingSoon && (
        <div className="flex items-end gap-1 mb-1">
          <span className={`text-3xl font-bold leading-none ${isCurrent ? "text-background" : "text-foreground"}`}>
            {plan.priceLabel}
          </span>
        </div>
      )}
      <p className={`text-[12px] mb-5 ${isCurrent ? "text-background/50" : "text-muted-foreground"}`}>
        {comingSoon ? "Launching soon" : plan.tagline}
      </p>

      {/* Features */}
      <ul className="space-y-2 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px]">
            <Check className={`mt-0.5 w-3.5 h-3.5 shrink-0 ${isCurrent ? "text-background/60" : "text-muted-foreground"}`} />
            <span className={isCurrent ? "text-background/80" : "text-foreground/80"}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={comingSoon ? undefined : onSelect}
        disabled={isCurrent || !!isUpgrading || comingSoon}
        className={`mt-5 w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-150 ${
          isCurrent
            ? "bg-background/10 text-background/40 cursor-default"
            : comingSoon
            ? "bg-muted text-muted-foreground border border-border cursor-not-allowed"
            : isDowngrade
            ? "border border-border text-muted-foreground hover:border-input hover:text-foreground"
            : "bg-foreground text-background hover:opacity-90 active:scale-[0.98]"
        }`}
      >
        {isUpgrading ? (
          <span className="opacity-60">Updating…</span>
        ) : isCurrent ? (
          "Current plan"
        ) : comingSoon ? (
          "Coming soon"
        ) : isDowngrade ? (
          `Switch to ${plan.name}`
        ) : (
          <>
            Get {plan.name} <ArrowRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </div>
  );
}
