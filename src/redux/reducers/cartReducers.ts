import { CartAction, CartState } from "../../types/cart.interface";

export const initialState: CartState = {
    cart: [],
    total_item: 0,
    total_amount: 0,
    shipping_fee: 5,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingProduct = state.cart.find(item => item._id === action.payload.product._id);
            if (existingProduct) {
                const updatedCart = state.cart?.map(item =>
                    item._id === action.payload.product._id
                        ? { ...item, cartQuantity: Math.min(item.cartQuantity + 1, item.quantity) }
                        : item
                );
                const newTotalAmount = updatedCart.reduce((total, item) => total + item.price * item.cartQuantity, 0);
                return {
                    ...state,
                    cart: updatedCart,
                    total_amount: newTotalAmount,
                };
            }
            const updatedCart = [...state.cart, { ...action.payload.product, cartQuantity: 1 }];
            const newTotalAmount = updatedCart.reduce((total, item) => total + item.price * item.cartQuantity, 0);
            return {
                ...state,
                cart: updatedCart,
                total_amount: newTotalAmount,
            };
        }
        case "UPDATE_QUANTITY": {
            const updatedCart = state.cart?.map(item => {
                if (item._id === action.payload.id) {
                    const newQuantity = Math.min(Math.max(action.payload.quantity, 1), item.quantity);
                    return { ...item, cartQuantity: newQuantity };
                }
                return item;
            });
            const newTotalAmount = updatedCart.reduce((total, item) => total + item.price * item.cartQuantity, 0);
            return {
                ...state,
                cart: updatedCart,
                total_amount: newTotalAmount,
            };
        }
        case "REMOVE_FROM_CART": {
            const filteredCart = state.cart.filter(item => item._id !== action.payload.id);
            const remainingTotalAmount = filteredCart.reduce((total, item) => total + item.price * item.cartQuantity, 0);
            return {
                ...state,
                cart: filteredCart,
                total_amount: remainingTotalAmount,
            };
        }
        default:
            return state;
    }
};

export default cartReducer;
