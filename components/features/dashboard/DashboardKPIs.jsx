"use client";
import React from "react";
import { TrendingUp, TrendingDown, Clock, Target, CheckCircle2 } from "lucide-react";

const KPI_DATA = [
    {
        title: "Mocks Completed",
        value: "24",
        change: "+12%",
        trend: "up",
        icon: CheckCircle2,
    },
    {
        title: "Average Score",
        value: "86",
        suffix: "/100",
        change: "+4.3%",
        trend: "up",
        icon: Target,
    },
    {
        title: "Practice Time",
        value: "142",
        suffix: "m",
        change: "−2%",
        trend: "down",
        icon: Clock,
    },
];

const DashboardKPIs = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {KPI_DATA.map((kpi, idx) => {
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
                            {kpi.change} vs last week
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DashboardKPIs;
