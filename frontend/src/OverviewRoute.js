import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/common/Sidebar.jsx";

import OverviewPage from "./newPage/OverviewPage.jsx";
import ProductsPage from "./newPage/ProductsPage.jsx";
import UsersPage from "./newPage/UsersPage.jsx";
import SalesPage from "./newPage/SalesPage.jsx";
import OrdersPage from "./newPage/OrdersPage.jsx";
import AnalyticsPage from "./newPage/AnalyticsPage.jsx";
import SettingsPage from "./newPage/SettingsPage.jsx";

function OverviewRoute() {
	return (
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
			<Routes>
				{/* <Route path='/dashboard/overview' element={<OverviewPage />} /> */}
				<Route path='/products' element={<ProductsPage />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path='/sales' element={<SalesPage />} />
				<Route path='/orders' element={<OrdersPage />} />
				<Route path='/analytics' element={<AnalyticsPage />} />
				<Route path='/settings' element={<SettingsPage />} />
			</Routes>
		</div>
	);
}

export default OverviewRoute;
