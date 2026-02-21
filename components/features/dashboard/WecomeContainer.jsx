"use client";
import React from 'react';
import { useUser } from '@/app/Provider';

const WelcomeContainer = ({ mockInterviews = [] }) => {
  const { user } = useUser();

  const recentCount = mockInterviews.filter((m) => {
    const daysDiff = (Date.now() - new Date(m.created_at)) / (1000 * 86400);
    return daysDiff <= 7;
  }).length;

  return (
    <div className="pt-2 pb-10 mb-10 border-b border-gray-100">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-4">
        Dashboard
      </p>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#0a0a0a] leading-snug">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}.
          </h1>
          <p className="text-sm text-gray-500 mt-3 leading-relaxed max-w-md">
            {recentCount > 0
              ? <>Continue your preparation. You have <span className="font-semibold text-[#0a0a0a]">{recentCount} session{recentCount !== 1 ? 's' : ''}</span> this week.</>
              : <>Start your preparation. Complete your first mock interview to track progress.</>
            }
          </p>
        </div>
        <div className="shrink-0">
          <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-xs text-gray-500 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Preparation active
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeContainer;
