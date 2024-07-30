import React from 'react';
import { Button } from 'antd';
import { CartItem } from '../../../types/cart.interface';

interface CartCardProps {
    item: CartItem;
    handleQuantityChange: (id: string, quantity: number) => void;
    handleRemoveFromCart: (id: string) => void;
}

const CartCard: React.FC<CartCardProps> = ({ item, handleQuantityChange, handleRemoveFromCart }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity) && item._id) {
            handleQuantityChange(item._id, newQuantity);
        }
    };

    return (
        <div key={item._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            {item.productImage && (
                <img src={item.productImage} alt={item.title ?? 'Product Image'} className="rounded-lg h-40 min-w-44" />
            )}
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    {item.title && (
                        <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
                    )}
                    {item.category?.categoryName && (
                        <p className="mt-1 text-xs text-gray-700">{item.category.categoryName}</p>
                    )}
                    <p className="mt-4 text-xs text-[#524434] p-1 bg-green-200 w-20 rounded-full text-center border border-green-500">Price : {item.price}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                        <span onClick={() => item._id && handleQuantityChange(item._id, item.cartQuantity - 1)} className="h-8 w-8 cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">-</span>
                        <input
                            type="number"
                            value={item.cartQuantity ?? 1}
                            onChange={handleChange}
                            className="w-16 text-center border py-1 remove-arrow"
                            min={1}
                            max={item.quantity}
                        />
                        <span onClick={() => item._id && handleQuantityChange(item._id, item.cartQuantity + 1)} className="h-8 w-8 cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">+</span>
                    </div>
                    <Button
                        danger
                        onClick={() => item._id && handleRemoveFromCart(item._id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartCard;
