import React from 'react';
import WecomeContainer from '@/components/features/dashboard/WecomeContainer';
import CreateOptions from '@/components/features/dashboard/CreateOptions';
import DashboardKPIs from '@/components/features/dashboard/DashboardKPIs';
import PerformanceChart from '@/components/features/dashboard/PerformanceChart';
import ActivityFeed from '@/components/features/dashboard/ActivityFeed';
import LatestInterviewList from '@/components/features/dashboard/LatestInterviewList';

const Dashboard = () => {
  return (
    <div className="w-full">

      {/* Page header */}
      <WecomeContainer />

      {/* Primary actions — full width, dominant, appropriately sized */}
      <CreateOptions />

      {/* KPI strip */}
      <div className="mb-8">
        <DashboardKPIs />
      </div>

      {/* Analytics row: chart (2/3) + activity feed (1/3) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-0">
        <div className="xl:col-span-2">
          <PerformanceChart />
        </div>
        <div className="xl:col-span-1">
          <ActivityFeed />
        </div>
      </div>

      {/* History table */}
      <LatestInterviewList />

    </div>
  );
};

export default Dashboard;