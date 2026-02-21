"use client";
import React from "react";
import { Mic, FileText, CheckCircle2 } from "lucide-react";

const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const ActivityFeed = ({ mockInterviews = [], interviews = [] }) => {
  const activities = [
    ...mockInterviews.map((m) => ({
      id: m.id,
      title: "Completed Mock Interview",
      description:
        m.outcome === "approved"
          ? "F1 Visa — Visa Approved"
          : m.outcome === "denied"
          ? "F1 Visa — Visa Denied"
          : "F1 Visa — Session ended",
      time: m.created_at,
      icon: Mic,
    })),
    ...interviews.map((i) => ({
      id: i.interview_id || i.id,
      title: "Generated Question Bank",
      description: `${i.questions?.length || 0} questions for ${i.country || "F1"} Visa`,
      time: i.created_at,
      icon: FileText,
    })),
  ]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 4);

  return (
    <div className="bg-white border border-gray-100 hover:border-gray-300 rounded-xl p-8 transition-all duration-150 h-full flex flex-col">
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
          Activity
        </p>
        <h3 className="font-semibold text-base text-[#0a0a0a]">Recent Activity</h3>
      </div>

      <div className="relative flex-1">
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 py-8">
            <CheckCircle2 className="w-8 h-8 mb-3 text-gray-200" />
            <p className="text-sm font-medium">No activity yet</p>
            <p className="text-xs mt-1">Your sessions will appear here</p>
          </div>
        ) : (
          <>
            {/* Timeline line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gray-100" />

            <ul className="space-y-6">
              {activities.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id} className="relative flex items-start gap-4 group">
                    <div className="relative z-10 w-8 h-8 rounded-lg bg-gray-50 text-gray-700 border border-gray-100 flex items-center justify-center shrink-0 transition-all duration-150 group-hover:border-gray-300">
                      <Icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-sm font-semibold text-[#0a0a0a] leading-snug">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5 leading-relaxed truncate">
                        {item.description}
                      </p>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mt-1.5">
                        {timeAgo(item.time)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>

      <button className="mt-8 w-full py-2.5 text-sm font-medium text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-[#0a0a0a] bg-white rounded-lg transition-all duration-150">
        View all activity
      </button>
    </div>
  );
};

export default ActivityFeed;
