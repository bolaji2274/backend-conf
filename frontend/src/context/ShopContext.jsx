import { createContext, useState } from "react";
import all_product from "../Util/all_product";
import new_collections from "../Util/new_collection";

export const Shopcontext = createContext(null);

const getDefaultCart = ()=> {
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++){
        cart[index] = 0
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    const getTotalCartAmount = ()=> {
        let totalAmount = 0;
        for (const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id === Number(item))
                totalAmount += cartItems[item] * itemInfo.new_price;
            }
        }
        return totalAmount
    }
    const getTotalCartItems = ()=> {
        let totalItem = 0;
        for (const item in cartItems){
            if(cartItems[item]>0){
                totalItem += cartItems[item];
            }
        }
        return totalItem
    }
    
    const contextValue = {all_product, new_collections, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};

    return (
        <Shopcontext.Provider value={contextValue}>
            {props.children}
        </Shopcontext.Provider>
    )
}

export default ShopContextProvider;