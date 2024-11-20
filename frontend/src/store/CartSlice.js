// // CartSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// // Helper functions for loading and saving to local storage
// const loadCartFromLocalStorage = () => {
//   const savedCart = localStorage.getItem('cart');
//   return savedCart ? JSON.parse(savedCart) : { items: [] };
// };

// const saveCartToLocalStorage = (cart) => {
//   localStorage.setItem('cart', JSON.stringify(cart));
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: loadCartFromLocalStorage(), // Load initial state from local storage
//   reducers: {
//     addToCart: (state, action) => {
//       const { id, quantity } = action.payload;
//       const existingItem = state.items.find(item => item.id === id);
//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         state.items.push({ ...action.payload });
//       }
//       saveCartToLocalStorage(state); // Save updated state to local storage
//     },
//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload;
//       const existingItem = state.items.find(item => item.id === id);
//       if (existingItem) {
//         existingItem.quantity = quantity;
//       }
//       saveCartToLocalStorage(state); // Save updated state to local storage
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload.id);
//       saveCartToLocalStorage(state); // Save updated state to local storage
//     },
//     clearCart: (state) => {
//       state.items = [];
//       saveCartToLocalStorage(state); // Save updated state to local storage
//     },
//   },
// });

// export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


// CartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper functions for loading and saving to local storage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : { items: [] };
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(), // Load initial state from local storage
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity; // Increment quantity for the same product
      } else {
        state.items.push({ ...action.payload }); // Add new product with specified quantity
      }
      saveCartToLocalStorage(state); // Save updated state to local storage
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      saveCartToLocalStorage(state); // Save updated state to local storage
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      saveCartToLocalStorage(state); // Save updated state to local storage
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state); // Save updated state to local storage
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
