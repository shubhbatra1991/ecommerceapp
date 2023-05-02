import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";




export const setIsCartOpen = (boolean) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);





    const addCartItem = (cartItems, productToAdd) => {
        //find if cart items contains product to add.
        const existingCartItem = cartItems.find(
            (cartItem) => cartItem.id === productToAdd.id
            );
    
        if(existingCartItem){
            return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity +1}
            :cartItem
            );
        }
        return [...cartItems, { ...productToAdd, quantity: 1}];
    };
    
    const removeCartItem = (cartItems, cartItemToRemove) => {
        // find cart item to remove
        const existingCartItem = cartItems.find(
            (cartItem) => cartItem.id === cartItemToRemove.id
        );
    
    
        //check if quantity is equal to 1, then remove others
        if(existingCartItem.quantity === 1){
            return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
        }
    
        //return back as selected with reduced quty
        return cartItems.map((cartItem) => 
            cartItem.id === cartItemToRemove.id ? 
            {...cartItem, quantity: cartItem.quantity - 1}
            :cartItem
        );
    };


    const clearCartItem = (cartItems, cartItemToClear) => {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
    };


    //Replacing the context with reducer:

export const addItemToCart = (cartItems, product) => {
        const newCartitems = addCartItem(cartItems, product);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartitems);
    };

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
        const newCartitems = removeCartItem(cartItems, cartItemToRemove);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartitems);
    };

export const clearItemFromCart = (cartItems, cartItemToClear) => {
        const newCartitems = clearCartItem(cartItems, cartItemToClear);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartitems);
    };