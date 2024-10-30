import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Sidebar from '../common/Sidebar.jsx';

import Application from './Application.jsx'
import Overview from './Overview.jsx'
import Notification from './Notification.jsx'
import Order from './Order.jsx'
import Profile from './Profile.jsx'
import ReviewOrders from './Review.jsx';
import PendingOrders from './PendingOrder.jsx';

const CustomerDashboard = () => {
  return (
    <div>
      <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
       <Overview />
	  		
			<Routes>
				{/* <Route path='/overview' element={<OverviewPage />} /> */}
				<Route path='/application' element={<Application />} />
				<Route path='/notification' element={<Notification />} />
				<Route path='/corder' element={<Order />} />
				<Route path='/Profile' element={<Profile />} />
				<Route path='/review' element={<ReviewOrders />} />
				<Route path='/applications/pending/' element={<PendingOrders/>} />
				{/* <Route path='/settings' element={<SettingsPage />} /> */}
			</Routes>
		</div>
    </div>
  )
}

export default CustomerDashboard