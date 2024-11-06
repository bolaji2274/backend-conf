import { motion } from "framer-motion";

import Header from "../common/Header";
import StatCard from "../common/StatCard";
import Sidebar from "../common/Sidebar";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import { TbCurrencyNaira } from "react-icons/tb";
import CategoryDistributionChart from "../overview/CategoryDistributionChart";
import SalesTrendChart from "../products/SalesTrendChart";
import ProductsTable from "../products/ProductsTable";
import { useState, useEffect } from "react";
import axios from 'axios'
import Spinner from '../../../pages/Spinner.js'

const ProductsPage = () => {
	const [data, setData] = useState();

  	useEffect(() => {
    // Fetch data from the API
    axios.get('https://api-bkrt.onrender.com/api/product-dashboard/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the dashboard data!", error);
      });
  }, []);

	if (!data) {
    return <div>
			{/* Loading... */}
			<Spinner/>
	</div>;
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
			<Header title='Products' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Products' icon={Package} value={data.total_products} color='#6366F1' />
					<StatCard name='Top Selling' icon={TrendingUp} value={data.top_selling_product.name} color='#10B981' />
					<StatCard name='Low Stock' icon={AlertTriangle} value={(data.low_stock_products)? 0 : data.low_stock_products} color='#F59E0B' />
					<StatCard name='Total Revenue' icon={TbCurrencyNaira} value={`₦${data.total_revenue}`} color='#EF4444' />
				</motion.div>

				<ProductsTable />

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div>
			</main>
		</div>
		</div>
	);
};
export default ProductsPage;
