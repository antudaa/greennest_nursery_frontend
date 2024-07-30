import React, { useContext } from 'react';
import { TProduct } from '../../../types/Product.interface';
import { ShoppingCartOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../redux/context/cartContext';
import { CartItem } from '../../../types/cart.interface'; // Adjust the import path as needed

type ProductCardProps = {
    product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { _id, category, title, price, productImage, quantity, rating } = product;

    const cartContext = useContext(CartContext);
    if (!cartContext) {
        throw new Error('CartContext must be used within a CartProvider');
    }
    const { addToCart } = cartContext;

    const handleAddToCart = () => {
        const cartItem: CartItem = {
            _id,
            name: title,
            price,
            quantity,
            cartQuantity: 1,
            productImage,
            category: {
                _id: category?._id,
                categoryName: category?.categoryName,
                categoryImage: category?.categoryImage,
            },
        };
        addToCart(cartItem);
    };

    return (
        <div className="flex-shrink-0 relative overflow-hidden bg-[aliceblue] rounded-lg w-[300px] shadow-lg">
            <div>
                <div className="mt-4 px-6 text-sm flex items-center justify-end text-gray-600">
                    <Tag color="success">{quantity === 0 ? 'Out Of Stock' : 'In Stock'}</Tag>
                </div>

                {/* Image */}
                <Link to={`/product/${_id}`}>
                    <div className="relative pt-4 px-10 flex items-center justify-center">
                        <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{ background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: 0.2 }}></div>
                        <img className="relative w-52 h-40 rounded-lg" src={productImage} alt={title} />
                    </div>

                    <div className="w-full mt-6 px-6 flex-none justify-between text-sm flex items-center text-gray-600">
                        <div className='flex items-center'>
                            <StarOutlined className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-[#524434] whitespace-nowrap mr-3">{rating}</span>
                        </div>
                        <span className="bg-white border border-green-500 rounded-xl text-[#524434] w-[60px] text-xs font-bold px-3 py-1 leading-none items-center">$ {price}</span>
                    </div>

                    <div className="relative text-[#524434] px-6 py-2 h-[80px]">
                        <span className="block opacity-75 -mb-1">{category?.categoryName}</span>
                        <div className="flex justify-between">
                            <span className="block font-semibold text-xl">{title}</span>
                        </div>
                    </div>
                </Link>

                <div className="px-6 flex justify-between gap-4 pb-4 mt-4">
                    <Button
                        onClick={handleAddToCart}
                        className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 disabled:opacity-50 w-full flex items-center justify-center"
                        disabled={quantity === 0}
                    >
                        {quantity === 0 ? (
                            <>
                                Out Of Stock
                                <ShoppingCartOutlined className="h-6 w-6 ml-2 my-auto" />
                            </>
                        ) : (
                            <>
                                Add to Cart
                                <ShoppingCartOutlined className="h-6 w-6 ml-2 my-auto" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
