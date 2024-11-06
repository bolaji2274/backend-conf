import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";
import { getAllOrders, updateOrderStatus } from '../../../context/allApi';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [statusUpdateMessage, setStatusUpdateMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    getAllOrders()
      .then((response) => {
		console.log(response.data.orders);
        setOrders(response.data.orders);
        setFilteredOrders(response.data.orders); // Set filtered orders initially
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Update filtered orders whenever the search term changes
    const filtered = orders.filter(
      (order) =>
        String(order.id).toLowerCase().includes(searchTerm.toLowerCase()) || // Convert id to string
        order.application_details.product_details.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]); // Add orders to dependency array

  const handleStatusUpdate = (orderId, status) => {
    updateOrderStatus(orderId, status)
      .then((response) => {
        setStatusUpdateMessage(`Order ${orderId} updated to ${status}`);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          )
        );
      })
      .catch((error) => setStatusUpdateMessage('Failed to update status'));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>Order List</h2>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search orders...'
            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={searchTerm}
            onChange={handleSearch} // Correct usage of handleSearch
          />
          <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Order ID</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Customer</th>
			   <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Product Type</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Total QT</th>
			   <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Total Price</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Status</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Date</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>

          <tbody className='divide divide-gray-700'>
            {filteredOrders.map((order) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>{order.id}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>{order.customer_name}</td>
				<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>{order.application_details.product_details.name}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>{order.application_details.quantity}</td>
				<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>₦{order.total_price}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === "Accepted"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{new Date(order.created_at).toLocaleDateString()}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <button className='text-indigo-400 hover:text-indigo-300 mr-2' onClick={() => handleStatusUpdate(order.id, 'Accepted')}>Accept</button>
                  <button className='text-indigo-400 hover:text-indigo-300 mr-2' onClick={() => handleStatusUpdate(order.id, 'Rejected')}>Reject</button>
                  <button className='text-indigo-400 hover:text-indigo-300' onClick={() => handleStatusUpdate(order.id, 'Completed')}>Complete</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default OrdersTable;
