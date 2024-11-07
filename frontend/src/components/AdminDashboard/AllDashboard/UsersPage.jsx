import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import Header from "../common/Header";
import StatCard from "../common/StatCard";
import UsersTable from "../users/UsersTable";
import UserGrowthChart from "../users/UserGrowthChart";
import UserActivityHeatmap from "../users/UserActivityHeatmap";
import UserDemographicsChart from "../users/UserDemographicsChart";
import Sidebar from "../common/Sidebar";
import Spinner from '../../../pages/Spinner.js'

const UsersPage = () => {
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('https://api-bkrt.onrender.com/api/metrics/users/');
        
        if (response.ok) {
          const data = await response.json();
          setMetrics(data);
        } else {
          throw new Error("Failed to fetch user metrics.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <div>
      <Spinner/>
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      {/* BG */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>

      <Sidebar />
      <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Users' />

        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
          {/* STATS */}
          <motion.div
            className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name='Total Users'
              icon={UsersIcon}
              value={metrics.total_users?.toLocaleString() || 0} // Use fetched data
              color='#6366F1'
            />
            <StatCard
              name='New Users Today'
              icon={UserPlus}
              value={metrics.new_users_today || 0} // Use fetched data
              color='#10B981'
            />
            <StatCard
              name='Active Users'
              icon={UserCheck}
              value={metrics.active_users?.toLocaleString() || 0} // Use fetched data
              color='#F59E0B'
            />
            <StatCard
              name='Churn Rate'
              icon={UserX}
              value={metrics.churn_rate || "0.0%"} // Use fetched data
              color='#EF4444'
            />
          </motion.div>

          <UsersTable />

          {/* USER CHARTS */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
            <UserGrowthChart />
            <UserActivityHeatmap />
            <UserDemographicsChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UsersPage;
