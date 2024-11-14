import React from 'react';
import { motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/CartSlice';
import { Typography, Button, List, ListItem, ListItemText, TextField, Box, ListItemAvatar, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';


const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: parseInt(quantity, 10) }));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/store');
  };

  return (
    <>
      <Nav />
      <div className='w-full h-full mt-12 mb-12'>
        <motion.div
          className="bg-gray-800 m-8 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ maxWidth: "500px", margin: "auto", color: "#FFFFFF" }}
        >
          <Typography variant="h4" style={{ color: '#FFFFFF', marginBottom: '20px' }}>Your Cart</Typography>
          
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id} className="bg-gray-900 p-4 rounded-lg mb-4" alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    variant="square"
                    sx={{ width: 60, height: 60, marginRight: '10px' }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${item.name} - ₦${item.price.toFixed(2)}`}
                  secondary={`Total: ₦${(item.price * item.quantity).toFixed(2)}`}
                  primaryTypographyProps={{ style: { color: "#FFFFFF" } }}
                  secondaryTypographyProps={{ style: { color: "#D1D5DB" } }}
                />
                <TextField
                  type="number"
                  label="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  inputProps={{ min: 1 }}
                  style={{ width: '80px', marginRight: '20px' }}
                  InputLabelProps={{ style: { color: "#D1D5DB" } }}
                  InputProps={{ style: { color: "#FFFFFF" } }}
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

          <Typography variant="h6" style={{ marginTop: '20px', color: '#D1D5DB' }}>
            Total: ₦
            {cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ).toFixed(2)}
          </Typography>

          <Box display="flex" flexDirection="column" gap="10px" mt="20px">
            <Button
              variant="contained"
              style={{
                backgroundColor: '#8B5CF6',
                color: '#FFFFFF',
                width: '100%',
              }}
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>

            <Button
              variant="contained"
              style={{
                backgroundColor: '#4CAF50',
                color: '#FFFFFF',
                width: '100%',
              }}
              onClick={handleCheckout}
            >
              Checkout
            </Button>

            <Button
              variant="outlined"
              style={{
                borderColor: '#FFFFFF',
                color: '#FFFFFF',
                width: '100%',
              }}
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </Button>
          </Box>
        </motion.div>
      </div>
    </>
  );
};

export default Cart;
