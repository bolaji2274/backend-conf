// reducers/orderReducer.js
const orderReducer = (state = { orders: [], order: null }, action) => {
  switch (action.type) {
    case 'ORDER_CREATE_SUCCESS':
      return { ...state, order: action.payload };
    case 'ORDER_LIST_SUCCESS':
      return { ...state, orders: action.payload };
    case 'ORDER_CREATE_FAIL':
    case 'ORDER_LIST_FAIL':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default orderReducer;
