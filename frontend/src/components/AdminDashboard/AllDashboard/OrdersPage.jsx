import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import StatCard from "../common/StatCard";
import DailyOrders from "../orders/DailyOrders";
import OrderDistribution from "../orders/OrderDistribution";
import OrdersTable from "../orders/OrdersTable";
import { getAllOrders } from '../../../context/allApi'
import { useEffect, useState } from "react";


const orderStats = {
	totalOrders: "0",
	pendingOrders: "0",
	completedOrders: "0",
	totalRevenue: "$0",
};

const OrdersPage = () => {
	const [orders, setOrders] = useState([]);
	  useEffect(() => {
		getAllOrders()
		.then((response) => {
			console.log(response.data.summary);
			setOrders(response.data.summary);
		})
		.catch((error) => console.error(error));
  }, []);
	return (
		  <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
		<div className='flex-1 relative z-10 overflow-auto'>
			<Header title={"Orders"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Orders' icon={ShoppingBag} value={orders.total_orders} color='#6366F1' />
					<StatCard name='Pending Orders' icon={Clock} value={orders.pending_orders} color='#F59E0B' />
					<StatCard
						name='Completed Orders'
						icon={CheckCircle}
						value={orders.completed_orders}
						color='#10B981'
					/>
					<StatCard name='Total Revenue' icon={DollarSign} value={orders.total_revenue} color='#EF4444' />
				</motion.div>
					<OrdersTable />
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 mt-3'>
					<DailyOrders />
					<OrderDistribution />
				</div>

				
			</main>
		</div>
		</div>
	);
};
export default OrdersPage;
