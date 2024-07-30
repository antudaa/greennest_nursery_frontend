import { useContext } from "react";
import { CartContext } from "../redux/context/cartContext";
import NoCartDataFound from "../components/ui/error/NoCartDataFound";
import { Link } from "react-router-dom";
import CartCard from "../components/ui/Card/CartCard";

const CartDetailsPage = () => {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        return <div>Error: CartContext not found</div>;
    }

    const { state, updateQuantity, removeFromCart } = cartContext;
    const { cart, total_amount, shipping_fee } = state;

    if (cart.length === 0) {
        return <NoCartDataFound />;
    }

    const handleQuantityChange = (id: string, quantity: number) => {
        const product = cart.find(item => item._id === id);
        if (product && quantity <= product.quantity && quantity >= 1) {
            updateQuantity(id, quantity);
        }
    };

    const handleRemoveFromCart = (id: string) => {
        removeFromCart(id);
    };

    return (
        <div className="min-h-screen bg-gray-100 pt-20">
            <h1 className="mb-10 px-6 text-3xl text-[#524434] font-semibold">Cart Items</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {cart.map((item) => (
                        <CartCard
                            key={item._id}
                            item={item}
                            handleQuantityChange={handleQuantityChange}
                            handleRemoveFromCart={handleRemoveFromCart}
                        />
                    ))}
                </div>
                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">${total_amount.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Shipping</p>
                        <p className="text-gray-700">${shipping_fee.toFixed(2)}</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div className="">
                            <p className="mb-1 text-lg font-bold">${(total_amount + shipping_fee).toFixed(2)} USD</p>
                            <p className="text-sm text-gray-700">including VAT</p>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <Link to='/checkout' className="rounded-md text-nowrap px-20 md:px-16 xl:px-28 bg-green-500 py-1.5 font-medium text-green-50 hover:text-white hover:bg-green-600">Check out</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDetailsPage;
