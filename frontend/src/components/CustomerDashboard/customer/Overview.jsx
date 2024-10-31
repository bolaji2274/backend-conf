import { useState, useEffect } from "react";
import axios from 'axios'


import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../common/Header";
import StatCard from "../common/StatCard";

// import SalesOverviewChart from "../components/overview/SalesOverviewChart";
// import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
// import SalesChannelChart from "../components/overview/SalesChannelChart";



const OverviewPage = () => {
    const [metrics, setMetrics] = useState({
        totalApplications: 0,
        approvedRequests: 0,
        pendingRequests: 0,
        receivedLivestock: 0,
    });
  useEffect(() => {
    axios.get('https://api-bkrt.onrender.com/api/metrics')
      .then((response) => {
        setMetrics(response.data);
      })
      .catch((error) => console.error(error));
  }, []);
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Applications Status' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
				
					<StatCard name='Total Applications' icon={Zap} value={metrics.totalApplications} color='#6366F1' />
					<StatCard name='Approved' icon={Users} value={metrics.approvedRequests} color='#8B5CF6' />
					<StatCard name='Pending' icon={ShoppingBag} value={metrics.pendingRequests} color='#EC4899' />
					<StatCard name='Received' icon={BarChart2} value={metrics.receivedLivestock} color='#10B981' />
					
				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* <SalesOverviewChart /> */}
					{/* <CategoryDistributionChart /> */}
					{/* <SalesChannelChart /> */}
				</div>

			</main>
		</div>
	);
};
export default OverviewPage;
