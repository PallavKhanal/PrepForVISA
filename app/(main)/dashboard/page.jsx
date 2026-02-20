import React from 'react'
import WecomeContainer from '@/components/features/dashboard/WecomeContainer';
import CreateOptions from '@/components/features/dashboard/CreateOptions';
import LatestInterviewList from '@/components/features/dashboard/LatestInterviewList';

const Dashboard = () => {


  return (
    <div className="w-full">
      <WecomeContainer/>
      <h2 className='my-3 font-bold text-2xl'>Dashboard</h2>
      <CreateOptions/>
      <LatestInterviewList/>
    </div>
  )
}

export default Dashboard