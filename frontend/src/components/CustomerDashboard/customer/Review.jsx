// ReviewOrders.js
import React, { useState, useEffect } from 'react';

function ReviewOrders() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch applications when the component mounts
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://your-api-url/applications/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setApplications(data);  // assuming data is an array of applications
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
      <h2 className="text-2xl font-bold mb-6">Your Applications</h2>
      
      {loading ? (
        <p>Loading...</p>
      ) : applications.length > 0 ? (
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
            {applications.map((app, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{app.animal_type}</td>
                <td className="px-4 py-2">{app.quantity}</td>
                <td className="px-4 py-2">{app.feed_type}</td>
                <td className="px-4 py-2">{app.drug_requirements}</td>
                <td className="px-4 py-2">{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
}

export default ReviewOrders;
