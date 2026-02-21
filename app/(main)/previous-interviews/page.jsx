"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/app/Provider";
import supabase from "@/lib/supabase";
import {
  Mic,
  FileText,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Minus,
  Video,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";

/* ─── helpers ─────────────────────────────────────────────── */

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatDuration = (seconds) => {
  if (!seconds) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
};

const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`;
  return formatDate(dateStr);
};

/* ─── outcome badge ────────────────────────────────────────── */

const OutcomeBadge = ({ outcome }) => {
  if (outcome === "approved")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold uppercase tracking-widest bg-emerald-50 border-emerald-200 text-emerald-700">
        <CheckCircle2 className="w-3 h-3" /> Approved
      </span>
    );
  if (outcome === "denied")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold uppercase tracking-widest bg-red-50 border-red-200 text-red-600">
        <XCircle className="w-3 h-3" /> Denied
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold uppercase tracking-widest bg-[#fafafa] border-gray-200 text-gray-500">
      <Minus className="w-3 h-3" /> Completed
    </span>
  );
};

/* ─── mock interview card ──────────────────────────────────── */

const MockInterviewCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const duration = formatDuration(item.duration_seconds);
  const transcript = Array.isArray(item.transcript) ? item.transcript : [];

  return (
    <div className="rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-all duration-150 overflow-hidden">
      {/* Row */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-6 py-5 text-left"
      >
        <div className="w-9 h-9 rounded-lg bg-[#fafafa] border border-gray-100 text-gray-500 flex items-center justify-center shrink-0">
          <Mic size={15} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#0a0a0a]">F1 Visa Mock Interview</p>
          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
            <span className="text-xs text-gray-400">{formatDate(item.created_at)}</span>
            {duration && (
              <>
                <span className="text-gray-200 text-xs">·</span>
                <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {duration}
                </span>
              </>
            )}
            {transcript.length > 0 && (
              <>
                <span className="text-gray-200 text-xs">·</span>
                <span className="text-xs text-gray-400">{transcript.length} turns</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <OutcomeBadge outcome={item.outcome} />
          <div className="text-gray-300">
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </button>

      {/* Expanded transcript */}
      {open && (
        <div className="border-t border-gray-100 bg-[#fafafa] px-6 py-5">
          {transcript.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              No transcript recorded for this session.
            </p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {transcript.map((turn, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${turn.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className="shrink-0 pt-0.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      turn.role === "assistant"
                        ? "bg-[#0a0a0a] text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}>
                      {turn.role === "assistant" ? "O" : "Y"}
                    </div>
                  </div>
                  <div className={`max-w-[75%] ${turn.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                    <p className={`text-[10px] font-semibold uppercase tracking-widest mb-1 ${
                      turn.role === "assistant" ? "text-gray-400" : "text-gray-400 text-right"
                    }`}>
                      {turn.role === "assistant" ? "Officer Mitchell" : "You"}
                    </p>
                    <div className={`rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                      turn.role === "assistant"
                        ? "bg-white border border-gray-100 text-[#0a0a0a]"
                        : "bg-[#0a0a0a] text-white"
                    }`}>
                      {turn.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ─── question bank card ───────────────────────────────────── */

const QuestionBankCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const questions = Array.isArray(item.questions) ? item.questions : [];

  return (
    <div className="rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-all duration-150 overflow-hidden">
      {/* Row */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-6 py-5 text-left"
      >
        <div className="w-9 h-9 rounded-lg bg-[#fafafa] border border-gray-100 text-gray-500 flex items-center justify-center shrink-0">
          <FileText size={15} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#0a0a0a]">
            F1 Visa — {questions.length} questions generated
          </p>
          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
            <span className="text-xs text-gray-400">{formatDate(item.created_at)}</span>
            {item.description && (
              <>
                <span className="text-gray-200 text-xs">·</span>
                <span className="text-xs text-gray-400 truncate max-w-[260px]">{item.description}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md border text-[11px] font-semibold uppercase tracking-widest bg-[#fafafa] border-gray-200 text-gray-500">
            Generated
          </span>
          <div className="text-gray-300">
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </button>

      {/* Expanded questions */}
      {open && (
        <div className="border-t border-gray-100 bg-[#fafafa] px-6 py-5">
          {questions.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">No questions found.</p>
          ) : (
            <ol className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {questions.map((q, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-[11px] font-bold text-gray-300 tabular-nums pt-0.5 shrink-0 w-5 text-right">
                    {i + 1}.
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{q}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
};

/* ─── page ─────────────────────────────────────────────────── */

const TABS = ["All", "Mock Interviews", "Question Banks"];

export default function PreviousInterviews() {
  const { user } = useUser();
  const router = useRouter();
  const [mockInterviews, setMockInterviews] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      const [{ data: mocks }, { data: ints }] = await Promise.all([
        supabase
          .from("MockInterviews")
          .select("*")
          .eq("user_email", user.email)
          .order("created_at", { ascending: false }),
        supabase
          .from("Interviews")
          .select("*")
          .eq("user_email", user.email)
          .order("created_at", { ascending: false }),
      ]);
      setMockInterviews(mocks || []);
      setInterviews(ints || []);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  // Merge and sort all sessions for the "All" tab
  const allSessions = [
    ...mockInterviews.map((m) => ({ ...m, _type: "mock" })),
    ...interviews.map((i) => ({ ...i, _type: "questions" })),
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const visibleSessions =
    activeTab === "Mock Interviews"
      ? allSessions.filter((s) => s._type === "mock")
      : activeTab === "Question Banks"
      ? allSessions.filter((s) => s._type === "questions")
      : allSessions;

  const isEmpty = !loading && visibleSessions.length === 0;

  return (
    <div className="w-full">

      {/* Page header */}
      <div className="pt-2 pb-10 mb-10 border-b border-gray-100">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-4">
          History
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0a0a0a] leading-snug">
              Previous Interviews
            </h1>
            <p className="text-sm text-gray-500 mt-3 leading-relaxed max-w-md">
              {loading
                ? "Loading your sessions…"
                : `${allSessions.length} session${allSessions.length !== 1 ? "s" : ""} total — ${mockInterviews.length} mock${mockInterviews.length !== 1 ? "s" : ""}, ${interviews.length} question bank${interviews.length !== 1 ? "s" : ""}.`
              }
            </p>
          </div>
          <div className="shrink-0">
            <button
              onClick={() => router.push("/dashboard/create-mock")}
              className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-150"
            >
              <Plus size={14} />
              New session
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-8 border-b border-gray-100 pb-0">
        {TABS.map((tab) => {
          const count =
            tab === "Mock Interviews"
              ? mockInterviews.length
              : tab === "Question Banks"
              ? interviews.length
              : allSessions.length;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-widest border-b-2 -mb-px transition-all duration-150 flex items-center gap-2 ${
                activeTab === tab
                  ? "border-[#0a0a0a] text-[#0a0a0a]"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
              {!loading && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeTab === tab ? "bg-[#0a0a0a] text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-gray-100 bg-white px-6 py-5 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-gray-100 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-gray-100 rounded w-48" />
                  <div className="h-3 bg-gray-100 rounded w-28" />
                </div>
                <div className="h-7 w-20 bg-gray-100 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {isEmpty && (
        <div className="py-24 flex flex-col items-center justify-center bg-[#fafafa] rounded-xl border border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-5 text-gray-400">
            <Video size={20} />
          </div>
          <h3 className="font-semibold text-base text-[#0a0a0a] mb-2">No sessions yet</h3>
          <p className="text-sm text-gray-500 mb-8 max-w-xs text-center leading-relaxed">
            {activeTab === "All"
              ? "You haven't completed any sessions yet. Start your first mock interview or generate a question bank."
              : activeTab === "Mock Interviews"
              ? "No mock interviews yet. Start one now to practice with the AI officer."
              : "No question banks yet. Generate a custom set of visa interview questions."}
          </p>
          <button
            onClick={() => router.push("/dashboard/create-mock")}
            className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-medium px-7 py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-150"
          >
            Get started
          </button>
        </div>
      )}

      {/* Session list */}
      {!loading && !isEmpty && (
        <div className="space-y-3">
          {visibleSessions.map((session) =>
            session._type === "mock" ? (
              <MockInterviewCard key={session.id} item={session} />
            ) : (
              <QuestionBankCard key={session.interview_id || session.id} item={session} />
            )
          )}
        </div>
      )}
    </div>
  );
}
