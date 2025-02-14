import { createSlice } from '@reduxjs/toolkit';
import hen from '../assets/images/hens.jpg';
import catFishs from '../assets/images/images-3.jpeg';
// import catFish from '../assets/images/images.jpeg';
import bird from '../assets/images/birds.jpg';
import chicken from '../assets/images/chicken-5.jpg';
import chick from '../assets/images/chick.jpg';
import layer_chick from '../assets/images/chicken-2.jpg';
import broiler from '../assets/images/chicken-coop.jpg';
import turkey from '../assets/images/turkey-2.jpg';
import egg from '../assets/images/eggs.jpg';

const initialState = [
  { id: 5, name: "Organic Chicken", category: "Poultry", price: 20.0, stock: 50, image: hen },
    { id: 6, name: "Chicks", category: "Fish", price: 25.0, stock: 400, image: bird },
    { id: 7, name: "Eggs", category: "Eggs", price: 25.0, stock: `${350} Create`, image: egg },
    { id: 8, name: "Layer Chicks", category: "Fish", price: 25.0, stock: 400, image: layer_chick },
    { id: 9, name: "Broiler", category: "Fish", price: 35.0, stock: 400, image: broiler },
    { id: 10, name: "Cat Fish", category: "Fish", price: 15.0, stock: 100, image: chicken },
    { id: 11, name: "Broiler Chicks", category: "Fish", price: 12.0, stock: 350, image: chick },
    { id: 12, name: "Turkey", category: "Turkey", price: 30.0, stock: 30, image: turkey },
];

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {}
});

export const selectProducts = (state) => state.stores;
export default storeSlice.reducer;