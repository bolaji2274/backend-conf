// src/components/CustomerOrders.js
import React, { useEffect, useState } from 'react';
import { getCustomerOrders, cancelCustomerOrder } from '../../../context/allApi';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getCustomerOrders()
      .then((response) => setOrders(response.data))
      .catch((error) => console.error(error));
  }, []);
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await cancelCustomerOrder(orderId);
      if (response.status === 200) {
        alert(response.data.detail);
        getCustomerOrders();  // Refresh the order list
      } else {
        alert(response.data.detail || "Failed to cancel the order");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  return (
    <div>
      <h2>Your Orders</h2>
      <ul>
       {orders.map((order) => (
          <li key={order.id}>
            Product: {order.application_details.product_details.name ? order.application_details.product_details.name : 'Unknown Product'} | 
            Quantity: {order.application_details.quantity} | 
            Total Price: ${order.total_price} |
            Status: {order.status} | 
            Created At: {new Date(order.created_at).toLocaleDateString()} |
            {/* {order.status === 'Pending' && (  // Only show cancel button for pending orders
              <button onClick={() => handleCancelOrder(order.id)}>Cancel Order</button>
            )} */}

          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerOrders;
