// src/api.js
import axios from 'axios';
import api from './api';

const apiNew = axios.create({
  baseURL: 'https://api-bkrt.onrender.com/api/', // Adjust to match your Django backend URL
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
  },
});



// Get product list
export const getProducts = () => apiNew.get('/products/');

// Create an application
export const createApplication = (data) => api.post('/applications/create/', data);

// Get customer orders
export const getCustomerOrders = () => api.get('/orders/');

export const deleteProduct = () => api.delete('/products/${id}/');

// Get all orders (admin)
export const getAllOrders = () => api.get('/admin/orders/');

// get all the contact message 

export const getContactMessage = () => api.get('/contact/');

// Update order status (admin)
export const updateOrderStatus = (orderId, status) =>
  api.post('/admin/orders/', { order_id: orderId, status });

export const cancelCustomerOrder = async (orderId) => {
  return api.delete(`/orders/${orderId}/`);  // Use DELETE method
};