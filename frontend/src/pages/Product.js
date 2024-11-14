// src/components/ProductList.js
// eslint-disable-next-line

import React, { useState } from 'react';
import { Typography, Button, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/CartSlice';
import { selectProducts } from '../store/ProductSlice';
import './ProductList.css';


const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts).slice(0, 4); // Only show the first 4 products
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, stock, value) => {
    const quantity = Math.max(1, Math.min(stock, parseInt(value) || 1));
    setQuantities({ ...quantities, [id]: quantity });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    if (quantity <= product.stock) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  return (
    <div className="product-list-container">
     
       <motion.h2
                    className="text-4xl font-semibold text-gray-400 mb-6 mt-6 text-center "
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Check Out Our Products Below 
                </motion.h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="product-image" />
            </Link>
            <div className="product-details">
              <Link to={`/product/${product.id}`}>
              <div>
              
                <h3>{product.name}</h3>
             
              <p>Category: {product.category}</p>
              <p>Price: ₦{product.price.toFixed(2)}</p>
              <p>Stock: {product.stock} available</p>
              </div>
               </Link>

              <TextField
                label="Quantity"
                type="number"
                value={quantities[product.id] || 1}
                onChange={(e) => handleQuantityChange(product.id, product.stock, e.target.value)}
                InputProps={{ inputProps: { min: 1, max: product.stock } }}
                variant="outlined"
                size="small"
                className='mr-4'
              />

              <Button
                className='ml-4'
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
       <div className="see-more-container mt-8" style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to='/store'>
        <Button
          variant="outlined"
          color="primary"
          // onClick={handleSeeMore}
        >
          See More Product
        </Button>
                
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
