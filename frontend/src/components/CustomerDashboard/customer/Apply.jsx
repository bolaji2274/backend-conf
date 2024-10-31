// ManageApplications.js
import React, { useState } from 'react';

function ManageApplications() {
  const [animalType, setAnimalType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [feedType, setFeedType] = useState('');
  const [drugRequirements, setDrugRequirements] = useState('');

// Add this inside the handleSubmit function in ManageApplications.js

const handleSubmit = async (e) => {
  e.preventDefault();

  const applicationData = {
    animal_type: animalType,
    quantity,
    feed_type: feedType,
    drug_requirements: drugRequirements,
  };

  try {
    const response = await fetch('https://api-bkrt.onrender.com/api/applications/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`  // Adjust if needed
      },
      body: JSON.stringify(applicationData),
    });

    if (response.ok) {
      const result = await response.json();
      alert("Application submitted successfully!");
      // Optionally, clear form or update UI with new data
    } else {
      const errorData = await response.json();
      alert("Error submitting application: " + (errorData.detail || "Unknown error"));
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  }
};


  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Apply for Livestock</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-gray-700">Animal Type</label>
          <select
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
            className="border rounded w-full p-2"
            required
          >
            <option value="">Select Animal Type</option>
            <option value="Fish">Fish</option>
            <option value="Broilers">Broilers</option>
            <option value="Layers">Layers</option>
            {/* Add more animal types as needed */}
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border rounded w-full p-2"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-gray-700">Feed Type</label>
          <input
            type="text"
            value={feedType}
            onChange={(e) => setFeedType(e.target.value)}
            className="border rounded w-full p-2"
            placeholder="Enter Feed Type"
          />
        </div>

        <div>
          <label className="block text-gray-700">Drug Requirements</label>
          <input
            type="text"
            value={drugRequirements}
            onChange={(e) => setDrugRequirements(e.target.value)}
            className="border rounded w-full p-2"
            placeholder="Specify if any"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 mt-4 w-full"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default ManageApplications;
