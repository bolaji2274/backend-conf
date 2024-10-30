import { motion } from "framer-motion";

import Header from "../common/Header";
import StatCard from "../common/StatCard";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import SalesOverviewChart from "../sales/SalesOverviewChart";
import SalesByCategoryChart from "../sales/SalesByCategoryChart";
import DailySalesTrend from "../sales/DailySalesTrend";
import Sidebar from "../common/Sidebar";

const salesStats = {
	totalRevenue: "$0",
	averageOrderValue: "$0",
	conversionRate: "0%",
	salesGrowth: "0%",
};

const SalesPage = () => {
	return (
		  <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Sales Dashboard' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* SALES STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Revenue' icon={DollarSign} value={salesStats.totalRevenue} color='#6366F1' />
					<StatCard
						name='Avg. Order Value'
						icon={ShoppingCart}
						value={salesStats.averageOrderValue}
						color='#10B981'
					/>
					<StatCard
						name='Conversion Rate'
						icon={TrendingUp}
						value={salesStats.conversionRate}
						color='#F59E0B'
					/>
					<StatCard name='Sales Growth' icon={CreditCard} value={salesStats.salesGrowth} color='#EF4444' />
				</motion.div>

				<SalesOverviewChart />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<SalesByCategoryChart />
					<DailySalesTrend />
				</div>
			</main>
		</div>
		</div>
	);
};
export default SalesPage;
