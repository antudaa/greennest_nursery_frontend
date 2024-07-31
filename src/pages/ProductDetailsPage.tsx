import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/api/baseApi";
import { TProduct } from "../types/Product.interface";
import { Button, Skeleton } from "antd";
import StarRatings from "react-star-ratings";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { CartContext } from "../redux/context/cartContext";

const ProductDetailsPage = () => {

    const { id: slug } = useParams();
    const { data, isLoading } = useGetSingleProductQuery(slug as string);

    const cartContext = useContext(CartContext);
    if (!cartContext) {
        throw new Error('CartContext must be used within a CartProvider');
    }
    const { addToCart } = cartContext;

    if (isLoading) {
        return <Skeleton active className="min-h-screen" />;
    }

    if (!data || !data.data) {
        return (
            <div className="min-w-screen min-h-screen bg-green-300 flex items-center p-5 lg:p-10 overflow-hidden relative">
                <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                    <div className="md:flex items-center -mx-10">
                        <h1 className="font-bold uppercase text-2xl mb-5">No Product Data Found!🌴😔.</h1>
                    </div>
                </div>
            </div>
        )
    }

    const { title, description, price, rating, productImage, quantity } = data?.data as TProduct;

    return (
        <div>
            <div className="min-w-screen min-h-screen bg-green-100 flex items-center p-5 lg:p-10 overflow-hidden relative">
                <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                    <div className="md:flex items-center -mx-10">
                        <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                            <div className="relative">
                                <img src={productImage} className="w-full relative z-10" alt="Men's Ragged Waterproof Jacket" />
                                <div className="border-4 border-green-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-10">
                            <div className="mb-10">
                                <h1 className="font-bold uppercase text-2xl mb-5">{title}</h1>
                                <div className="w-full my-6 flex-none justify-between text-sm flex items-center text-gray-600">
                                    <div className='flex items-center gap-4'>
                                        <div>
                                            <StarRatings starSpacing="2px" starRatedColor="#22c55e" starDimension="20px" rating={rating} />
                                        </div>
                                        <span className="text-[#524434] whitespace-nowrap mr-3">{rating}</span>
                                    </div>
                                    <span className="bg-white border border-green-500 rounded-xl text-[#524434] text-xs font-bold px-3 py-1 leading-none items-center">{quantity === 0 ? 'Out Of Stock' : "In Stock"}</span>
                                </div>
                                <p className="text-sm">
                                    {description}
                                    <a href="#" className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">
                                    </a>
                                </p>
                            </div>
                            <div>
                                <div className="inline-block align-bottom mr-5">
                                    <span className="text-2xl leading-none align-baseline">$</span>
                                    <span className="font-bold text-5xl leading-none align-baseline">{price - 1}</span>
                                    <span className="text-2xl leading-none align-baseline">.99</span>
                                </div>
                            </div>
                            <div className="mt-10 flex justify-between gap-4 pb-4">
                                <Button
                                    onClick={() => addToCart(data.data)}
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
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;