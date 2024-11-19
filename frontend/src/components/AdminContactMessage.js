import React, { useEffect, useState } from 'react';

function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('https://api-bkrt.onrender.com/api/contact/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages available.</p>
      ) : (
        <table className="table-auto w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className="border-t">
                <td className="px-4 py-2">{msg.name}</td>
                <td className="px-4 py-2">{msg.phone}</td>
                <td className="px-4 py-2">{msg.service}</td>
                <td className="px-4 py-2">{msg.email}</td>
                <td className="px-4 py-2">{msg.message}</td>
                <td className="px-4 py-2">{new Date(msg.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminContactMessages;
