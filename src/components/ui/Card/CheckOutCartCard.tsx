import React from 'react';
import { CartItem } from '../../../types/cart.interface';

interface CheckOutCartCardProps {
    item: CartItem;
}

const CheckOutCartCard: React.FC<CheckOutCartCardProps> = ({ item }) => {
    return (
        <div key={item._id} className="flex bg-white text-[#524434] items-start gap-4 p-4 rounded-xl border border-indigo-200">
            <img src={item.productImage} alt={item.title} className="min-w-24 min-h-24 max-w-24 max-h-24 rounded-xl object-contain border border-[#524434]" />
            <div className="w-full">
                <h3 className="text-base text-[#524434]">{item.title}</h3>
                <ul className="text-xs text-[#524434] space-y-2 mt-2">
                    <li className="flex flex-wrap gap-4">Category <span className="ml-auto">{item?.category?.categoryName}</span></li>
                    <li className="flex flex-wrap gap-4">Quantity <span className="ml-auto">{item.cartQuantity}</span></li>
                    <li className="flex flex-wrap gap-4">Total Price <span className="ml-auto">${(item.price * item.cartQuantity).toFixed(2)}</span></li>
                </ul>
            </div>
        </div>
    );
};

export default CheckOutCartCard;
