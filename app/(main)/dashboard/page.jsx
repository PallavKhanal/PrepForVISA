import React from 'react'
import WecomeContainer from '../dashboard/_components/WecomeContainer';
import CreateOptions from '../dashboard/_components/CreateOptions';
import LatestInterviewList from './_components/LatestInterviewList';

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