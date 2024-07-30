import React, { createContext, ReactNode, useReducer } from "react";
import { CartItem, CartState } from "../../types/cart.interface";
import cartReducer, { initialState } from "../reducers/cartReducers";

interface CartProviderProps {
    children: ReactNode;
}

const CartContext = createContext<{
    state: CartState;
    addToCart: (product: CartItem) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
} | null>(null);

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product: CartItem) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: { product }
        });
    };

    const updateQuantity = (id: string, quantity: number) => {
        dispatch({
            type: "UPDATE_QUANTITY",
            payload: { id, quantity },
        });
    };

    const removeFromCart = (id: string) => {
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: { id }
        });
    };

    return (
        <CartContext.Provider value={{ state, addToCart, updateQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, CartContext };
