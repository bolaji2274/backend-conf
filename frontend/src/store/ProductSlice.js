// src/store/ProductSlice.js

import { createSlice } from '@reduxjs/toolkit';
import hen from '../assets/images/hens.jpg';
import catFishs from '../assets/images/images-3.jpeg';
import bird from '../assets/images/birds.jpg';
import turkey from '../assets/images/turkey-2.jpg';

// import catFish from '../assets/images/images.jpeg';
import chicken from '../assets/images/chicken-5.jpg';
import chick from '../assets/images/chick.jpg';
import layer_chick from '../assets/images/chicken-2.jpg';
import broiler from '../assets/images/chicken-coop.jpg';
import egg from '../assets/images/eggs.jpg';


const initialState = [
    { id: 1, name: "Organic Chicken", category: "Poultry", price: 2500.0, stock: 50, image: hen },
    { id: 2, name: "Cat Fish", category: "Fish", price: 7450.0, stock: 100, image: catFishs },
    { id: 3, name: "Chicks", category: "Chicken", price: 5300.0, stock: 400, image: bird },
    { id: 4, name: "Turkey", category: "Turkey", price: 32000.0, stock: 30, image: turkey },
    { id: 5, name: "Organic Chicken", category: "Poultry", price: 2750.0, stock: 50, image: hen },
    { id: 6, name: "Chicks", category: "Fish", price: 2500.0, stock: 400, image: bird },
    { id: 7, name: "Eggs", category: "Eggs", price: 25000.0, stock: `${350} Create`, image: egg },
    { id: 8, name: "Layer Chicks", category: "Fish", price: 3500.0, stock: 400, image: layer_chick },
    { id: 9, name: "Broiler", category: "Fish", price: 3750.0, stock: 400, image: broiler },
    { id: 10, name: "Cat Fish", category: "Fish", price: 7500.0, stock: 100, image: chicken },
    { id: 11, name: "Broiler Chicks", category: "Fish", price: 8200.0, stock: 350, image: chick },
    { id: 12, name: "Turkey", category: "Turkey", price: 12500.0, stock: 30, image: turkey },
];

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}
});

export const selectProducts = (state) => state.products;
export default productSlice.reducer;
