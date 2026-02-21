"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/app/Provider";
import supabase from "@/lib/supabase";
import { Check, Zap, Crown, Sparkles, ArrowRight, Mic, FileQuestion } from "lucide-react";

const PLANS = {
  free: {
    key: "free",
    name: "Free",
    price: 0,
    priceLabel: "$0",
    period: "forever",
    tagline: "Try the experience",
    mockInterviews: 1,
    questionGenerations: 1,
    icon: Sparkles,
    features: [
      "1 live mock interview",
      "1 AI question bank",
      "Interview history",
      "Expert advice guide",
    ],
  },
  pro: {
    key: "pro",
    name: "Pro",
    price: 5,
    priceLabel: "$5",
    period: "per month",
    tagline: "For weekly practice",
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
    price: 13,
    priceLabel: "$13",
    period: "per month",
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

      const [
        { data: userData },
        { count: mockCount },
        { count: questionCount },
      ] = await Promise.all([
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
      <div className="p-8 space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-gray-100 rounded-lg" />
        <div className="h-32 bg-gray-100 rounded-2xl" />
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => <div key={i} className="h-96 bg-gray-100 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  const plan = PLANS[currentPlan] || PLANS.free;
  const mockRemaining = Math.max(0, plan.mockInterviews - mockUsed);
  const questionsRemaining = Math.max(0, plan.questionGenerations - questionsUsed);
  const mockPct = Math.min(100, (mockUsed / plan.mockInterviews) * 100);
  const questionsPct = Math.min(100, (questionsUsed / plan.questionGenerations) * 100);

  return (
    <div className="relative">
      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:16px_16px]"
      />

      <div className="mx-auto max-w-5xl px-6 py-10 space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0a0a0a]">Billing</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage your plan and track your monthly usage.
          </p>
        </div>

        {/* Current usage card */}
        <section className="rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">Current plan</p>
              <div className="flex items-center gap-2 mt-1">
                <h2 className="text-xl font-bold text-[#0a0a0a]">{plan.name}</h2>
                <span className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  currentPlan === "max"
                    ? "bg-black text-white"
                    : currentPlan === "pro"
                    ? "bg-neutral-800 text-white"
                    : "bg-neutral-100 text-neutral-600"
                }`}>
                  {currentPlan === "free" ? "Free tier" : currentPlan === "pro" ? "Pro" : "Max"}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">Resets</p>
              <p className="text-sm font-medium text-neutral-700">1st of each month</p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <UsageStat
              icon={Mic}
              label="Mock Interviews"
              used={mockUsed}
              total={plan.mockInterviews}
              remaining={mockRemaining}
              pct={mockPct}
            />
            <UsageStat
              icon={FileQuestion}
              label="Question Banks"
              used={questionsUsed}
              total={plan.questionGenerations}
              remaining={questionsRemaining}
              pct={questionsPct}
            />
          </div>
        </section>

        {/* Plan cards */}
        <div>
          <h2 className="text-base font-semibold text-neutral-800 mb-4">Choose a plan</h2>
          <div className="grid gap-5 sm:grid-cols-3">
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

        {/* Stripe note */}
        <div className="rounded-xl border border-dashed border-neutral-300 bg-white/50 px-5 py-4 flex items-center gap-3 backdrop-blur">
          <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
          <p className="text-[13px] text-neutral-500">
            Payments are coming soon. Plan upgrades are free during the beta period — enjoy full access while it lasts.
          </p>
        </div>

      </div>
    </div>
  );
}

/* ── Usage stat with progress bar ── */
function UsageStat({ icon: Icon, label, used, total, remaining, pct }) {
  const isFull = pct >= 100;
  return (
    <div className="rounded-xl border bg-white/60 p-4 backdrop-blur">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-neutral-600" />
        </div>
        <span className="text-[13px] font-semibold text-neutral-700">{label}</span>
      </div>
      <div className="flex items-end justify-between mb-2">
        <span className="text-2xl font-bold text-[#0a0a0a]">{remaining}</span>
        <span className="text-[12px] text-neutral-400 mb-0.5">{used} / {total} used</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isFull ? "bg-red-400" : "bg-[#0a0a0a]"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className={`mt-1.5 text-[11px] font-medium ${isFull ? "text-red-500" : "text-neutral-400"}`}>
        {isFull ? "Limit reached — upgrade to continue" : `${remaining} remaining this month`}
      </p>
    </div>
  );
}

/* ── Plan card ── */
function PlanCard({ plan, isCurrent, isUpgrading, onSelect, currentPlanKey }) {
  const Icon = plan.icon;
  const planOrder = { free: 0, pro: 1, max: 2 };
  const isDowngrade = planOrder[plan.key] < planOrder[currentPlanKey];
  const isMax = plan.key === "max";

  return (
    <div className={`relative flex flex-col rounded-2xl border p-6 shadow-sm transition-all duration-200 ${
      isCurrent
        ? "border-[#0a0a0a] bg-[#0a0a0a] text-white shadow-lg"
        : "border-neutral-200 bg-white/70 backdrop-blur hover:border-neutral-400 hover:shadow-md"
    }`}>

      {isCurrent && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-white border border-neutral-200 text-[#0a0a0a] text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
            Current Plan
          </span>
        </div>
      )}

      {isMax && !isCurrent && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-[#0a0a0a] text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {/* Icon + name */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
          isCurrent ? "bg-white/10" : "bg-neutral-100"
        }`}>
          <Icon className={`w-4.5 h-4.5 ${isCurrent ? "text-white" : "text-neutral-700"}`} />
        </div>
        <div>
          <p className={`text-[11px] font-semibold uppercase tracking-widest ${isCurrent ? "text-white/60" : "text-neutral-400"}`}>
            Plan
          </p>
          <p className={`text-base font-bold leading-none ${isCurrent ? "text-white" : "text-[#0a0a0a]"}`}>
            {plan.name}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="mb-1">
        <span className={`text-3xl font-bold ${isCurrent ? "text-white" : "text-[#0a0a0a]"}`}>
          {plan.priceLabel}
        </span>
        <span className={`text-[13px] ml-1 ${isCurrent ? "text-white/50" : "text-neutral-400"}`}>
          {plan.period}
        </span>
      </div>
      <p className={`text-[13px] mb-5 ${isCurrent ? "text-white/60" : "text-neutral-500"}`}>
        {plan.tagline}
      </p>

      {/* Feature list */}
      <ul className="space-y-2 flex-1 mb-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13.5px]">
            <Check className={`mt-0.5 w-3.5 h-3.5 shrink-0 ${isCurrent ? "text-white/70" : "text-neutral-500"}`} />
            <span className={isCurrent ? "text-white/80" : "text-neutral-700"}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onSelect}
        disabled={isCurrent || isUpgrading}
        className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-150 ${
          isCurrent
            ? "bg-white/10 text-white/50 cursor-default"
            : isDowngrade
            ? "border border-neutral-200 text-neutral-400 hover:border-neutral-300 hover:text-neutral-600"
            : "bg-[#0a0a0a] text-white hover:bg-neutral-800 active:scale-[0.98]"
        }`}
      >
        {isUpgrading ? (
          <span className="opacity-60">Updating…</span>
        ) : isCurrent ? (
          "Active"
        ) : isDowngrade ? (
          "Switch to " + plan.name
        ) : (
          <>
            Upgrade to {plan.name}
            <ArrowRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </div>
  );
}
