import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../common/Sidebar';


import OverviewPage from "./OverviewPage";
import ProductsPage from "./ProductsPage";
import UsersPage from "./UsersPage";
import SalesPage from "./SalesPage";
import OrdersPage from "./OrdersPage";
import AnalyticsPage from "./AnalyticsPage";
// import SettingsPage from "./SettingsPage";

const Dashboard = () => {
  return (
    <div>
      <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
      <OverviewPage/>
	  		
			<Routes>
				{/* <Route path='/overview' element={<OverviewPage />} /> */}
				<Route path='/products' element={<ProductsPage />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path='/sales' element={<SalesPage />} />
				<Route path='/orders' element={<OrdersPage />} />
				<Route path='/analytics' element={<AnalyticsPage />} />
			</Routes>
		</div>
    </div>
  )
}

export default Dashboard
