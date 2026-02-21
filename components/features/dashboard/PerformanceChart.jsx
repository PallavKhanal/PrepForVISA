"use client";
import React from "react";
import { BarChart3 } from "lucide-react";

const OUTCOME_SCORE = { approved: 100, denied: 30, unknown: 60 };

const PerformanceChart = ({ mockInterviews = [] }) => {
  // Build last 7 days (oldest → newest left to right)
  const chartData = Array.from({ length: 7 }, (_, i) => {
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

    return { day, score, count: dayInterviews.length };
  });

  const hasAnyData = chartData.some((d) => d.score > 0);

  return (
    <div className="bg-background border border-border hover:border-input rounded-xl p-8 transition-all duration-150">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            This Week
          </p>
          <h3 className="font-semibold text-base text-foreground">Performance Trend</h3>
        </div>
        <div className="w-10 h-10 rounded-lg bg-muted text-foreground/80 flex items-center justify-center">
          <BarChart3 size={18} />
        </div>
      </div>

      {!hasAnyData ? (
        <div className="h-40 flex flex-col items-center justify-center text-muted-foreground">
          <p className="text-sm font-medium">No interviews this week</p>
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
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-semibold py-1 px-2 rounded whitespace-nowrap transition-opacity duration-150 pointer-events-none">
                      {item.count} session{item.count !== 1 ? "s" : ""}
                    </span>
                  )}
                  <div
                    className="w-full max-w-[36px] bg-muted group-hover:bg-foreground transition-colors duration-150 rounded-t-md"
                    style={{ height: `${item.score}%` }}
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
                  {item.day}
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
