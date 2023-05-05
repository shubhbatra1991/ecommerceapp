import { AnyAction } from "redux";
import { CartItem } from "./cart.types";
import { setCartItems, setIsCartOpen } from "./cart.action";


export type CartState ={
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}

export const CART_INITIAL_STATE : CartState= {
    isCartOpen:false,
    cartItems: [],
};


// reducer is used when one state changes many other values using a single approach. this is the reason we used reducer here.
export const cartReducer = (state = CART_INITIAL_STATE,action: AnyAction ): CartState => {

    if(setIsCartOpen.match(action)){
        return {
            ...state,
            isCartOpen: action.payload,  
        };
    }

    if(setCartItems.match(action)){
        return{
            ...state,
            cartItems: action.payload,
        };
    }

    return state;
};