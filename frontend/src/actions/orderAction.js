// actions/orderActions.js
import axios from 'axios';

export const createOrder = (orderData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/orders/', orderData, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
    });
    dispatch({ type: 'ORDER_CREATE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ORDER_CREATE_FAIL', payload: error.message });
  }
};

export const fetchOrders = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/orders/', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
    });
    dispatch({ type: 'ORDER_LIST_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ORDER_LIST_FAIL', payload: error.message });
  }
};
