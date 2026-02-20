"use client";
import React from "react";
import { Mic, FileText, CheckCircle2, BarChart2 } from "lucide-react";

const ACTIVITY_DATA = [
    {
        id: 1,
        title: "Completed Mock Interview",
        description: "F1 Visa — USA. Score: 88/100",
        time: "2 hours ago",
        icon: Mic,
    },
    {
        id: 2,
        title: "Generated Question Bank",
        description: "15 questions for F1 Visa — USA",
        time: "5 hours ago",
        icon: FileText,
    },
    {
        id: 3,
        title: "Reviewed Analytics",
        description: "Checked weekly performance trend",
        time: "1 day ago",
        icon: BarChart2,
    },
    {
        id: 4,
        title: "Account Created",
        description: "Registered and verified email",
        time: "3 days ago",
        icon: CheckCircle2,
    },
];

const ActivityFeed = () => {
    return (
        <div className="bg-white border border-gray-100 hover:border-gray-300 rounded-xl p-8 transition-all duration-150 h-full flex flex-col">
            <div className="mb-8">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    Activity
                </p>
                <h3 className="font-semibold text-base text-[#0a0a0a]">Recent Activity</h3>
            </div>

            <div className="relative flex-1">
                {/* Timeline line */}
                <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gray-100" />

                <ul className="space-y-6">
                    {ACTIVITY_DATA.map((item) => {
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
                                        {item.time}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <button className="mt-8 w-full py-2.5 text-sm font-medium text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-[#0a0a0a] bg-white rounded-lg transition-all duration-150">
                View all activity
            </button>
        </div>
    );
};

export default ActivityFeed;
