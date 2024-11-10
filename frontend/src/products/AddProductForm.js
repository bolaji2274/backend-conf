// AddProductForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from './addProduct';

const AddProductForm = () => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in productData) {
      formData.append(key, productData[key]);
    }
    dispatch(addProduct(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={productData.name} onChange={handleChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={productData.description} onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={productData.price} onChange={handleChange} />
      </label>
      <label>
        Stock:
        <input type="number" name="stock" value={productData.stock} onChange={handleChange} />
      </label>
      <label>
        Image:
        <input type="file" name="image" onChange={handleImageChange} />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
