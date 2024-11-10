// actions/addProduct.js
import axios from 'axios';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const addProduct = (productData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/products/add/', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAILURE,
      payload: error.response ? error.response.data : "Network Error",
    });
  }
};
