import React from 'react';
import { motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/CartSlice';
import { Typography, Button, List, ListItem, ListItemText, TextField } from '@mui/material';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: parseInt(quantity, 10) }));
  };

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{ maxWidth: "500px", margin: "auto", color: "#E5E7EB" }}
    >
      <Typography variant="h4" style={{ color: '#E5E7EB', marginBottom: '20px' }}>Your Cart</Typography>
      
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id} className="bg-gray-900 p-4 rounded-lg mb-4">
            <ListItemText
              primary={`${item.name} - $${item.price.toFixed(2)}`}
              secondary={`Total: $${(item.price * item.quantity).toFixed(2)}`}
              primaryTypographyProps={{ style: { color: "#8B5CF6" } }}
              secondaryTypographyProps={{ style: { color: "#9CA3AF" } }}
            />
            <TextField
              type="number"
              label="Quantity"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              inputProps={{ min: 1 }}
              style={{ width: '80px', marginRight: '20px', color: '#E5E7EB' }}
              InputLabelProps={{ style: { color: "#9CA3AF" } }}
              InputProps={{ style: { color: "#E5E7EB" } }}
            />
            <Button
              variant="contained"
              style={{
                backgroundColor: '#EF4444',
                color: '#FFFFFF',
                marginLeft: '10px'
              }}
              onClick={() => dispatch(removeFromCart(item))}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" style={{ marginTop: '20px', color: '#9CA3AF' }}>
        Total: $
        {cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ).toFixed(2)}
      </Typography>
      
      <Button
        variant="contained"
        style={{
          backgroundColor: '#8B5CF6',
          color: '#FFFFFF',
          width: '100%',
          marginTop: '20px'
        }}
        onClick={() => dispatch(clearCart())}
      >
        Clear Cart
      </Button>
    </motion.div>
  );
};

export default Cart;
