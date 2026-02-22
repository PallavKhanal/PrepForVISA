"use client";
import React, { useState } from "react";
import { BarChart3 } from "lucide-react";

const OUTCOME_SCORE = { approved: 100, denied: 30, unknown: 60 };

/* ── Build last-7-days data ─────────────────────────────────── */
function buildWeekData(mockInterviews) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split("T")[0];
    const day = d.toLocaleDateString("en-US", { weekday: "short" });
    const dayInterviews = mockInterviews.filter(
      (m) => m.created_at && m.created_at.startsWith(dateStr)
    );
    const score =
      dayInterviews.length === 0
        ? 0
        : Math.round(
            dayInterviews.reduce((sum, m) => sum + (OUTCOME_SCORE[m.outcome] ?? 60), 0) /
              dayInterviews.length
          );
    return { label: day, score, count: dayInterviews.length };
  });
}

/* ── Build current-month weekly-bucket data ─────────────────── */
function buildMonthData(mockInterviews) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const buckets = [
    { label: "W1", start: 1, end: 7 },
    { label: "W2", start: 8, end: 14 },
    { label: "W3", start: 15, end: 21 },
    { label: "W4", start: 22, end: 28 },
    ...(daysInMonth > 28 ? [{ label: "W5", start: 29, end: daysInMonth }] : []),
  ];

  return buckets.map(({ label, start, end }) => {
    const bucketInterviews = mockInterviews.filter((m) => {
      if (!m.created_at) return false;
      const d = new Date(m.created_at);
      return d.getFullYear() === year && d.getMonth() === month &&
        d.getDate() >= start && d.getDate() <= end;
    });
    const score =
      bucketInterviews.length === 0
        ? 0
        : Math.round(
            bucketInterviews.reduce((sum, m) => sum + (OUTCOME_SCORE[m.outcome] ?? 60), 0) /
              bucketInterviews.length
          );
    return { label, score, count: bucketInterviews.length };
  });
}

const PerformanceChart = ({ mockInterviews = [] }) => {
  const [period, setPeriod] = useState("week");

  const rawData = period === "week" ? buildWeekData(mockInterviews) : buildMonthData(mockInterviews);
  const maxScore = Math.max(...rawData.map((d) => d.score), 1);
  const chartData = rawData.map((d) => ({
    ...d,
    heightPct: d.score === 0 ? 0 : Math.round((d.score / maxScore) * 100),
  }));

  const hasAnyData = chartData.some((d) => d.score > 0);

  return (
    <div className="bg-background border border-border hover:border-input rounded-xl p-8 transition-all duration-150">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Performance Trend
          </p>
          <h3 className="font-semibold text-base text-foreground">Interview Outcomes</h3>
        </div>

        {/* Period toggle */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {[{ key: "week", label: "This Week" }, { key: "month", label: "This Month" }].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setPeriod(key)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all ${
                period === key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {!hasAnyData ? (
        <div className="h-40 flex flex-col items-center justify-center text-muted-foreground">
          <p className="text-sm font-medium">
            No interviews {period === "week" ? "this week" : "this month"}
          </p>
          <p className="text-xs mt-1">Complete a mock interview to see your trend</p>
        </div>
      ) : (
        <>
          {/* Bar chart */}
          <div className="flex items-end justify-between gap-2 h-40 border-b border-border pb-0">
            {chartData.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-0 group flex-1">
                <div className="relative w-full flex justify-center items-end h-36">
                  {item.score > 0 && (
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-semibold py-1 px-2 rounded whitespace-nowrap transition-opacity duration-150 pointer-events-none text-center leading-snug">
                      Score: {item.score}<br />{item.count} session{item.count !== 1 ? "s" : ""}
                    </span>
                  )}
                  <div
                    className="w-full max-w-[36px] bg-muted group-hover:bg-foreground transition-colors duration-150 rounded-t-md"
                    style={{ height: `${item.heightPct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between gap-2 pt-3">
            {chartData.map((item, index) => (
              <div key={index} className="flex-1 flex justify-center">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PerformanceChart;
