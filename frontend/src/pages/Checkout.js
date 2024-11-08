import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, List, ListItem, ListItemText, TextField, Divider, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { motion } from 'framer-motion';
import { removeFromCart, updateQuantity } from '../store/CartSlice';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import AppFooter from './AppFooter';
import { PaystackButton } from 'react-paystack';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: parseInt(quantity, 10) }));
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = 15.00;
  const total = subtotal + shippingFee;

  const publicKey = "pk_test_213417fbea5430139901577a1004d6769b559123";
  const email = "user@example.com"; // Replace with user's email from auth state or input
  const amount = total * 100; // Amount in kobo

  const componentProps = {
    email,
    amount,
    publicKey,
    text: "Pay Now",
    onSuccess: (reference) => handlePaymentSuccess(reference),
    onClose: () => alert("Payment cancelled")
  };

  const handlePaymentSuccess = (reference) => {
    fetch("/api/verify_payment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ reference: reference.reference })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status) {
        alert("Payment successful! Transaction reference: " + reference.reference);
        // Clear the cart or redirect the user after successful payment
      } else {
        alert("Payment verification failed. Please contact support.");
      }
    })
    .catch((error) => console.error("Payment verification error:", error));
  };

  return (
    <>
      <Nav />
      <div className='w-full h-full mt-12 mb-12'>
        <motion.div
          className="checkout-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            maxWidth: "800px",
            margin: "auto",
            color: "#333",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
          }}
        >
          <Typography variant="h4" style={{ marginBottom: '20px', color: '#4B5563' }}>Checkout</Typography>
          
          {/* Cart Summary */}
          <Typography variant="h6" style={{ marginBottom: '10px', color: '#4B5563' }}>Order Summary</Typography>
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id} style={{ padding: '10px 0' }}>
                <ListItemText
                  primary={item.name}
                  secondary={`₦${item.price.toFixed(2)} x ${item.quantity} = ₦${(item.price * item.quantity).toFixed(2)}`}
                  primaryTypographyProps={{ style: { color: "#1F2937", fontWeight: "bold" } }}
                  secondaryTypographyProps={{ style: { color: "#6B7280" } }}
                />
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  inputProps={{ min: 1 }}
                  style={{ width: '80px', marginLeft: '20px' }}
                  InputProps={{ style: { color: "#1F2937" } }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => dispatch(removeFromCart(item))}
                  style={{ marginLeft: '20px', backgroundColor: '#EF4444', color: '#FFFFFF' }}
                >
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>

          <Divider style={{ margin: "20px 0" }} />

          {/* Shipping Options */}
          <Typography variant="h6" style={{ marginBottom: '10px', color: '#4B5563' }}>Shipping Options</Typography>
          <RadioGroup defaultValue="standard" style={{ color: "#1F2937" }}>
            <FormControlLabel
              value="standard"
              control={<Radio color="primary" />}
              label="Standard Shipping - ₦15.00"
            />
            <FormControlLabel
              value="express"
              control={<Radio color="primary" />}
              label="Express Shipping - ₦25.00"
            />
          </RadioGroup>

          <Divider style={{ margin: "20px 0" }} />

          {/* Summary & Checkout */}
          <Box display="flex" flexDirection="column" gap="10px" mt="20px">
            <Box display="flex" justifyContent="space-between" mt="10px">
              <Typography variant="body1" style={{ color: '#4B5563' }}>Subtotal:</Typography>
              <Typography variant="body1" style={{ color: '#1F2937', fontWeight: "bold" }}>₦{subtotal.toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" style={{ color: '#4B5563' }}>Shipping:</Typography>
              <Typography variant="body1" style={{ color: '#1F2937', fontWeight: "bold" }}>₦{shippingFee.toFixed(2)}</Typography>
            </Box>
            <Divider style={{ margin: "10px 0" }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" style={{ color: '#1F2937', fontWeight: "bold" }}>Total:</Typography>
              <Typography variant="h6" style={{ color: '#1F2937', fontWeight: "bold" }}>₦{total.toFixed(2)}</Typography>
            </Box>

            <Box mt={3}>
              <PaystackButton {...componentProps} style={{
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                width: '100%',
                padding: '10px 0',
                fontSize: '16px',
                textAlign: 'center',
              }} />
            </Box>

            <Button
              variant="outlined"
              color="primary"
              style={{
                color: '#10B981',
                borderColor: '#10B981',
                width: '100%',
                marginTop: '10px',
                padding: '10px 0',
                fontSize: '16px',
              }}
              onClick={() => navigate('/store')}
            >
              Continue Shopping
            </Button>
          </Box>
        </motion.div>
      </div>
      <AppFooter />
    </>
  );
};

export default Checkout;
