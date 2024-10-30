import Header from "../common/Header";
import Sidebar from "../common/Sidebar";

import OverviewCards from "../analytics/OverviewCards";
import RevenueChart from "../analytics/RevenueChart";
import ChannelPerformance from "../analytics/ChannelPerformance";
import ProductPerformance from "../analytics/ProductPerformance";
import UserRetention from "../analytics/UserRetention";
import CustomerSegmentation from "../analytics/CustomerSegmentation";
import AIPoweredInsights from "../analytics/AIPoweredInsights";

const AnalyticsPage = () => {
	return (
		  <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title={"Analytics Dashboard"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<OverviewCards />
				<RevenueChart />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<ChannelPerformance />
					<ProductPerformance />
					<UserRetention />
					<CustomerSegmentation />
				</div>

				<AIPoweredInsights />
			</main>
		</div>
		</div>
	);
};
export default AnalyticsPage;
