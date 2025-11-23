import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

// create empty cart
const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props)=>{

    const [allProducts, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setAllProducts(data)});   
    },[])

    const addToCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem("auth-token")) { // means we're logged in
            fetch('http://localhost:4000/addtocart',{
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem("auth-token")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data));
        }
    }

    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem("auth-token")) { // means we're logged in
            fetch('http://localhost:4000/removefromcart',{
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem("auth-token")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data));
        }

    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = allProducts.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount; 
    }

    const getTotalCartItems = ()=>{
        let totalItems = 0;
        for(const item in cartItems) {
            if(cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    }
    
    const contextValue = {allProducts, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};
    return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>)
}

export default ShopContextProvider;