"use client";

import React, { useEffect, useState } from 'react';
import WecomeContainer from '@/components/features/dashboard/WecomeContainer';
import CreateOptions from '@/components/features/dashboard/CreateOptions';
import DashboardKPIs from '@/components/features/dashboard/DashboardKPIs';
import PerformanceChart from '@/components/features/dashboard/PerformanceChart';
import ActivityFeed from '@/components/features/dashboard/ActivityFeed';
import LatestInterviewList from '@/components/features/dashboard/LatestInterviewList';
import { useUser } from '@/app/Provider';
import supabase from '@/lib/supabase';

const Dashboard = () => {
  const { user } = useUser();
  const [mockInterviews, setMockInterviews] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="w-full">

      {/* Page header */}
      <WecomeContainer mockInterviews={mockInterviews} loading={loading} />

      {/* Primary actions */}
      <CreateOptions />

      {/* KPI strip */}
      <div className="mb-8">
        <DashboardKPIs mockInterviews={mockInterviews} loading={loading} />
      </div>

      {/* Analytics row: chart (2/3) + activity feed (1/3) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-0">
        <div className="xl:col-span-2">
          <PerformanceChart mockInterviews={mockInterviews} />
        </div>
        <div className="xl:col-span-1">
          <ActivityFeed mockInterviews={mockInterviews} interviews={interviews} />
        </div>
      </div>

      {/* History table */}
      <LatestInterviewList mockInterviews={mockInterviews} interviews={interviews} loading={loading} />

    </div>
  );
};

export default Dashboard;
