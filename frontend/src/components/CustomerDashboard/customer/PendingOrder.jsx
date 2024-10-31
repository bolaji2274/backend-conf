// PendingOrders.js
import React, { useState, useEffect } from 'react';

function PendingOrders() {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch applications when the component mounts
    const fetchApplications = async () => {
      try {
        const response = await fetch('https://api-bkrt.onrender.com/api/applications/pending/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          // Filter applications with "pending" status
          const pending = data.filter(app => app.status === "Pending");
          setPendingApplications(pending);
        } else {
          console.error('Error fetching applications');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pending Applications</h2>
      
      {loading ? (
        <p>Loading...</p>
      ) : pendingApplications.length > 0 ? (
        <table className="min-w-full bg-white border rounded-md shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">Animal Type</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Feed Type</th>
              <th className="px-4 py-2">Drug Requirements</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingApplications.map((app, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{app.animal_type}</td>
                <td className="px-4 py-2">{app.quantity}</td>
                <td className="px-4 py-2">{app.feed_type}</td>
                <td className="px-4 py-2">{app.drug_requirements}</td>
                <td className="px-4 py-2 status-pending">{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending applications found.</p>
      )}
    </div>
  );
}

export default PendingOrders;
