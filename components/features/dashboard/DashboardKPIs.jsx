"use client";
import React from "react";
import { TrendingUp, TrendingDown, Clock, Target, CheckCircle2 } from "lucide-react";

const DashboardKPIs = ({ mockInterviews = [], loading = false }) => {
  const count = mockInterviews.length;

  const practiceMinutes = Math.round(
    mockInterviews.reduce((sum, m) => sum + (m.duration_seconds || 0), 0) / 60
  );

  const approved = mockInterviews.filter((m) => m.outcome === "approved").length;
  const approvalRate = count > 0 ? Math.round((approved / count) * 100) : null;

  // Compare last 7 days vs previous 7 days for mocks completed trend
  const now = Date.now();
  const last7 = mockInterviews.filter((m) => now - new Date(m.created_at) < 7 * 86400 * 1000).length;
  const prev7 = mockInterviews.filter((m) => {
    const age = now - new Date(m.created_at);
    return age >= 7 * 86400 * 1000 && age < 14 * 86400 * 1000;
  }).length;
  const countTrend = last7 >= prev7 ? "up" : "down";

  const kpis = [
    {
      title: "Mocks Completed",
      value: loading ? "—" : String(count),
      suffix: null,
      label: count === 0 ? "Get started" : `${last7} this week`,
      trend: countTrend,
      icon: CheckCircle2,
    },
    {
      title: "Approval Rate",
      value: loading ? "—" : (approvalRate !== null ? String(approvalRate) : "—"),
      suffix: approvalRate !== null ? "%" : null,
      label: count === 0 ? "No sessions yet" : `${approved} of ${count} approved`,
      trend: approvalRate !== null && approvalRate >= 50 ? "up" : "down",
      icon: Target,
    },
    {
      title: "Practice Time",
      value: loading ? "—" : String(practiceMinutes),
      suffix: "m",
      label: "Total minutes",
      trend: practiceMinutes > 0 ? "up" : "down",
      icon: Clock,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-100 hover:border-gray-300 p-8 transition-all duration-150"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                {kpi.title}
              </span>
              <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-700 flex items-center justify-center shrink-0">
                <Icon size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-3xl font-bold text-[#0a0a0a] tracking-tight">
                {kpi.value}
              </span>
              {kpi.suffix && (
                <span className="text-lg font-semibold text-gray-400 ml-0.5">{kpi.suffix}</span>
              )}
            </div>
            <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${kpi.trend === "up" ? "text-gray-700" : "text-gray-400"}`}>
              {kpi.trend === "up"
                ? <TrendingUp className="w-3 h-3" />
                : <TrendingDown className="w-3 h-3" />
              }
              {kpi.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardKPIs;
