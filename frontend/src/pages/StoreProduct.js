// ProductList.js
import React, { useEffect, useState } from 'react';
import { Typography, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/CartSlice';
import './ProductList.css';
import Nav from './Nav';
import AppFooter from './AppFooter';
import { selectProducts } from '../store/ProductSlice';


const StoreProduct = () => {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});
  const products = useSelector(selectProducts);

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
    <>
    <Nav />
      <div className="product-list-container">
      <Typography variant="h4" gutterBottom className='text-center'>Products</Typography>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="product-image" />
            </Link>
            <div className="product-details">
              <Link to={`/product/${product.id}`}>
                <h3>{product.name}</h3>
              </Link>
              <p>Category: {product.category}</p>
              <p>Price: ₦{product.price.toFixed(2)}</p>
              <p>Stock: {product.stock} available</p>

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
    <AppFooter />
        </>
  );
};

export default StoreProduct;
