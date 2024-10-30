import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { TextField, Button, MenuItem, Typography, Grid } from '@mui/material';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import { getProducts, createApplication } from '../../../context/allApi';

const swal = require('sweetalert2')

const Application = () => {
  const [products, setProducts] = useState([]);
  const [orderData, setOrderData] = useState({
    product: '',
    quantity: 1,
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch available products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createApplication(orderData);
      swal.fire({
                    title: "Application submitted successfully ! You Need To Wait For Approval Before Processing Your Order",
                    icon: "success",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
      })
      setMessage('Application submitted successfully');
      setOrderData({ product: '', quantity: 1 });
    } catch (error) {
      swal.fire({
                    title: "Your Application Was Not Submitted Successfully! Try Again Later",
                    text: "Something went wrong.",
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
      console.error('Error submitting application:', error);
      setMessage('Failed to submit application');
    }
  };


  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Background Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      <Sidebar />
		<div className='flex-1 relative z-10 overflow-auto'>
			<Header title={"Livestock Application"} />
      {/* Form Container */}
      <div className="flex-1 flex justify-center items-center relative z-10 p-6">
     <motion.form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h5" className="text-center mb-6 text-gray-100">
          Place an Order
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              select
              label="Select Product"
              name="product"
              value={orderData.product}
              onChange={handleChange}
              fullWidth
              className="bg-gray-700 text-gray-100 rounded-lg"
              disabled={loading}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {products.map((prod) => (
                <MenuItem key={prod.id} value={prod.id} className="text-gray-100">
                  {prod.name} - {prod.stock} in stock
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={orderData.quantity}
              onChange={handleChange}
              inputProps={{ min: 1 }}
              fullWidth
              className="bg-gray-700 text-gray-100 rounded-lg"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4"
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                className="bg-blue-600 text-white font-semibold rounded-lg"
              >
                Submit Order
              </Button>
            </motion.div>
          </Grid>
        </Grid>

        {message && (
          <Typography
            variant="body2"
            className="text-center mt-4 text-gray-400"
          >
            {message}
          </Typography>
        )}
      </motion.form>
      </div>
      </div>
    </div>
  );
};

export default Application;
