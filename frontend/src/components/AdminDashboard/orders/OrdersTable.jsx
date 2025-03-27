import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, X, CheckCircle, AlertCircle } from "lucide-react";
import { getAllOrders, updateOrderStatus } from '../../../context/allApi';
import Spinner from "../../../pages/Spinner";

const STATUSES = {
  Pending: { color: "yellow", label: "Pending" },
  Accepted: { color: "green", label: "Accepted" },
  Shipped: { color: "blue", label: "Shipped" },
  Completed: { color: "purple", label: "Completed" },
  Rejected: { color: "red", label: "Rejected" }
};

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [statusUpdateMessage, setStatusUpdateMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedCustomerOrders, setSelectedCustomerOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState({ orderId: null, status: null });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    getAllOrders()
      .then((response) => {
        setOrders(response.data.orders);
        setFilteredOrders(response.data.orders);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(order.customer_id).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateOrderStatus(currentAction.orderId, currentAction.status);
      setOrders(prev => prev.map(order => 
        order.id === currentAction.orderId ? {...order, status: currentAction.status} : order
      ));
      setStatusUpdateMessage({
        type: 'success',
        content: `Order #${currentAction.orderId} status updated to ${currentAction.status}`
      });
    } catch (error) {
      setStatusUpdateMessage({
        type: 'error',
        content: `Failed to update order status: ${error.message}`
      });
    } finally {
      setIsUpdating(false);
      setIsConfirmModalOpen(false);
      setCurrentAction({ orderId: null, status: null });
    }
  };

  const confirmStatusChange = (orderId, status) => {
    setCurrentAction({ orderId, status });
    setIsConfirmModalOpen(true);
  };

  const StatusBadge = ({ status }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
      bg-${STATUSES[status].color}-100 text-${STATUSES[status].color}-800`}>
      {STATUSES[status].label}
    </span>
  );

  const ConfirmationModal = () => (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-gray-800 rounded-xl p-6 border border-gray-700 w-96"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="w-12 h-12 text-yellow-500" />
          <h3 className="text-xl font-semibold text-white">Confirm Status Change</h3>
          <p className="text-gray-300 text-center">
            Are you sure you want to change the status of order #{currentAction.orderId} to{' '}
            <span className={`text-${STATUSES[currentAction.status].color}-400`}>
              {currentAction.status}
            </span>?
          </p>
          <div className="flex space-x-4 w-full justify-end">
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className="px-4 py-2 text-gray-300 hover:text-white disabled:opacity-50"
              disabled={isUpdating}
            >
              Cancel
            </button>
            <button
              onClick={handleStatusUpdate}
              className={`px-4 py-2 rounded-lg ${
                isUpdating 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : `bg-${STATUSES[currentAction.status].color}-600 hover:bg-${STATUSES[currentAction.status].color}-700`
              } text-white`}
              disabled={isUpdating}
            >
              {isUpdating ? <Spinner size="small" /> : 'Confirm'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const groupedCustomers = filteredOrders.reduce((acc, order) => {
    const key = order.customer_id;
    if (!acc[key]) {
      acc[key] = {
        name: order.customer_name,
        customerId: order.customer_id,
        orders: []
      };
    }
    acc[key].orders.push(order);
    return acc;
  }, {});

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {statusUpdateMessage && (
        <motion.div
          className={`mb-4 p-3 rounded-lg ${
            statusUpdateMessage.type === 'error' 
              ? 'bg-red-800/50 text-red-300' 
              : 'bg-green-800/50 text-green-300'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-2">
            {statusUpdateMessage.type === 'error' ? (
              <AlertCircle size={18} />
            ) : (
              <CheckCircle size={18} />
            )}
            <span>{statusUpdateMessage.content}</span>
          </div>
        </motion.div>
      )}

      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>Customers List</h2>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search customers...'
            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
        </div>
      </div>

      <div className="space-y-4">
        {Object.values(groupedCustomers).map((customer) => (
          <motion.div
            key={customer.customerId}
            className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
            onClick={() => {
              setSelectedCustomerOrders(customer.orders);
              setIsModalOpen(true);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-100">{customer.name}</h3>
                <p className="text-sm text-gray-400">Customer ID: {customer.customerId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">{customer.orders.length} orders</p>
                <p className="text-sm text-gray-400">
                  Total spent: ₦{customer.orders.reduce((sum, order) => sum + order.total_price, 0)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl p-6 border border-gray-700 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                Orders for {selectedCustomerOrders[0]?.customer_name}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Order ID</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Product</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Quantity</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Total</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Status</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Date</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide divide-gray-700'>
                {selectedCustomerOrders.map((order) => (
                  <tr key={order.id}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>#{order.id}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {order.application_details.product_details.name}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {order.application_details.quantity}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      ₦{order.total_price}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <StatusBadge status={order.status} />
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className="flex space-x-2">
                        {order.status === 'Pending' && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                confirmStatusChange(order.id, 'Accepted');
                              }}
                              className="text-green-400 hover:text-green-300"
                              title="Accept Order"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                confirmStatusChange(order.id, 'Rejected');
                              }}
                              className="text-red-400 hover:text-red-300"
                              title="Reject Order"
                            >
                              <X size={18} />
                            </button>
                          </>
                        )}
                        {order.status === 'Accepted' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              confirmStatusChange(order.id, 'Shipped');
                            }}
                            className="text-blue-400 hover:text-blue-300"
                            title="Mark as Shipped"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        {order.status === 'Shipped' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              confirmStatusChange(order.id, 'Completed');
                            }}
                            className="text-purple-400 hover:text-purple-300"
                            title="Mark as Completed"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      )}

      {isConfirmModalOpen && <ConfirmationModal />}
    </motion.div>
  );
};

export default OrdersTable;