"use client";
import React from "react";
import { BarChart3 } from "lucide-react";

const PERFORMANCE_DATA = [
    { day: "Mon", score: 65 },
    { day: "Tue", score: 72 },
    { day: "Wed", score: 68 },
    { day: "Thu", score: 85 },
    { day: "Fri", score: 78 },
    { day: "Sat", score: 92 },
    { day: "Sun", score: 88 },
];

const PerformanceChart = () => {
    return (
        <div className="bg-white border border-gray-100 hover:border-gray-300 rounded-xl p-8 transition-all duration-150">
            <div className="flex items-start justify-between mb-8">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                        This Week
                    </p>
                    <h3 className="font-semibold text-base text-[#0a0a0a]">Performance Trend</h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-700 flex items-center justify-center">
                    <BarChart3 size={18} />
                </div>
            </div>

            {/* Bar chart */}
            <div className="flex items-end justify-between gap-2 h-40 border-b border-gray-100 pb-0">
                {PERFORMANCE_DATA.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-0 group flex-1">
                        <div className="relative w-full flex justify-center items-end h-36">
                            {/* Score tooltip */}
                            <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0a0a0a] text-white text-[10px] font-semibold py-1 px-2 rounded whitespace-nowrap transition-opacity duration-150 pointer-events-none">
                                {item.score}
                            </span>
                            <div
                                className="w-full max-w-[36px] bg-gray-100 group-hover:bg-[#0a0a0a] transition-colors duration-150 rounded-t-md"
                                style={{ height: `${item.score}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between gap-2 pt-3">
                {PERFORMANCE_DATA.map((item, index) => (
                    <div key={index} className="flex-1 flex justify-center">
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                            {item.day}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PerformanceChart;
