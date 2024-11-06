import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { TbCurrencyNaira } from "react-icons/tb";
import { motion } from "framer-motion";

import Header from "../common/Header";
import StatCard from "../common/StatCard";
import SalesOverviewChart from "../overview/SalesOverviewChart";
import CategoryDistributionChart from "../overview/CategoryDistributionChart";
import SalesChannelChart from "../overview/SalesChannelChart";
import Sidebar from "../common/Sidebar";
import { useState, useEffect } from "react";
import api from "../../../context/api"; // Import the custom Axios instance

const OverviewPage = () => {
  const [data, setData] = useState({
    total_sales: 0,
    new_users: 0,
    total_products: 0,
    conversion_rate: 0,
  });

  useEffect(() => {
    api.get('/overview')  // Use 'api' instead of 'axios' for requests
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      {/* Background */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>
      <Sidebar />
      <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Nasfarm Dashboard' />
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
          {/* Stats */}
          <motion.div
            className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard name='Total Sales' icon={TbCurrencyNaira} value={`₦${data.total_sales}`} color='#6366F1' />
            <StatCard name='New Users' icon={Users} value={data.new_users} color='#8B5CF6' />
            <StatCard name='Total Products' icon={ShoppingBag} value={data.total_products} color='#EC4899' />
            <StatCard name='Conversion Rate' icon={BarChart2} value={`${data.conversion_rate} %`} color='#10B981' />
          </motion.div>

          {/* Charts */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <SalesOverviewChart />
            <CategoryDistributionChart />
            <SalesChannelChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default OverviewPage;
