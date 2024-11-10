// reducers/productReducer.js
import { ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE } from '../products/addProduct';

const initialState = {
  product: null,
  error: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_SUCCESS:
      return { ...state, product: action.payload, error: null };
    case ADD_PRODUCT_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
