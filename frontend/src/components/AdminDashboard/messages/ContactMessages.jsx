import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { getContactMessage } from "../../../context/allApi";
import Spinner from '../../../pages/Spinner.js'
import { useDispatch } from "react-redux";
import { addNotification } from "../../../store/notificationSlice.js";

import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

function AdminContactMessages() {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getContactMessage();
        setMessages(response.data);
        setFilteredMessages(response.data);

        // Simulate new notifications for fetched messages
        if (response.data.length > 0) {
          dispatch(addNotification());
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const filtered = messages.filter(
      (msg) =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMessages(filtered);
  }, [searchTerm, messages]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRowClick = (message) => {
    setSelectedMessage(message);
  };

  const closeModal = () => {
    setSelectedMessage(null);
  };

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
		<div className='flex-1 relative z-10 overflow-auto'>
			<Header title={"Contact Messages"} />
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Messages</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-300"><Spinner /></p>
      ) : filteredMessages.length === 0 ? (
        <p className="text-gray-300">No messages available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Message Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredMessages.map((msg) => (
                <motion.tr
                  key={msg.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer hover:bg-gray-700"
                  onClick={() => handleRowClick(msg)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {msg.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {msg.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {msg.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {msg.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {msg.message.slice(0, 30)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
            <h3 className="text-xl font-bold text-gray-100 mb-4">
              Message Details
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              <strong>Name:</strong> {selectedMessage.name}
            </p>
            <p className="text-sm text-gray-300 mb-2">
              <strong>Phone:</strong> {selectedMessage.phone}
            </p>
            <p className="text-sm text-gray-300 mb-2">
              <strong>Service:</strong> {selectedMessage.service}
            </p>
            <p className="text-sm text-gray-300 mb-2">
              <strong>Email:</strong> {selectedMessage.email}
            </p>
            <p className="text-sm text-gray-300 mb-2">
              <strong>Message:</strong> {selectedMessage.message}
            </p>
            <p className="text-sm text-gray-300">
              <strong>Date:</strong>{" "}
              {new Date(selectedMessage.created_at).toLocaleString()}
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
    </div>
    </div>
  );
}

export default AdminContactMessages;
