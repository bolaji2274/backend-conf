import React, { useState } from 'react';
import { Typography, Button, TextField } from "@mui/material";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/CartSlice';
import { useNavigate } from 'react-router-dom';
import hen from '../assets/images/hens.jpg';
import catFishs from '../assets/images/images-3.jpeg';
import bird from '../assets/images/birds.jpg';
import turkey from '../assets/images/turkey-2.jpg';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  const myProduct = [
    { id: 1, name: "Organic Chicken", category: "Poultry", price: 20.0, stock: 50, image: hen },
    { id: 2, name: "Cat Fish", category: "Fish", price: 15.0, stock: 100, image: catFishs },
    { id: 3, name: "Chicks", category: "Chicken", price: 5.0, stock: 400, image: bird },
    { id: 4, name: "Turkey", category: "Turkey", price: 30.0, stock: 30, image: turkey },
  ];

  const handleQuantityChange = (id, stock, value) => {
    const quantity = Math.max(1, Math.min(stock, parseInt(value) || 1));
    setQuantities({ ...quantities, [id]: quantity });
  };

  // const handleAddToCart = (product) => {
  //   const quantity = quantities[product.id] || 1;
  //   if (quantity <= product.stock) {
  //     dispatch(addToCart({ ...product, quantity }));
  //   }
  // };
  const handleAddToCart = (product) => {
  const quantity = quantities[product.id] || 1;
  if (quantity <= product.stock) {
    dispatch(addToCart({ ...product, quantity }));
  }
};

  const handleSeeMore = () => {
    navigate('/store'); // Replace '/store' with the actual route to your full product list page
  };

  return (
    <div className="product-list-container">
      <Typography variant="h4" gutterBottom className='text-center'>Products</Typography>
      <div className="product-grid">
        {myProduct.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h3>{product.name}</h3>
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
  );
};

export default ProductList;
