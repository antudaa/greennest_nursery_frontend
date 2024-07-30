import { useContext } from "react";
import { CartContext } from "../redux/context/cartContext";
import NoCartDataFound from "../components/ui/error/NoCartDataFound";
import CheckOutCartCard from "../components/ui/Card/CheckOutCartCard";
import { Tabs } from "antd";
import StripePaymentForm from "../components/ui/form/StripePaymentForm";
import CashOnDeliveryInfoForm from "../components/ui/form/CashOnDeliveryInfoForm";

const CheckoutPage = () => {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        return <div>Error: CartContext not found</div>;
    }

    const { state } = cartContext;
    const { cart, total_amount, shipping_fee } = state;

    if (cart.length === 0) {
        return <NoCartDataFound />;
    }

    return (
        <div className="bg-white rounded-xl">
            <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
                <div className="rounded-l-xl bg-[aliceblue] sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
                    <div className="relative h-full">
                        <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <CheckOutCartCard
                                        key={item._id}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </div>
                        <hr />
                        <div className="md:absolute md:left-0 md:bottom-0 bg-[aliceblue] w-full p-4 rounded-bl-xl">
                            <h4 className="flex flex-wrap gap-4 text-base text-[#524434]">Total Including Tax 5$ <span className="ml-auto">${(total_amount + shipping_fee).toFixed(2)}</span></h4>
                        </div>
                    </div>
                </div>


                <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
                    <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
                    <Tabs
                        defaultActiveKey="2"
                        items={[
                            {
                                key: "1",
                                label: "Pay With Stripe",
                                children: <StripePaymentForm />,
                            },
                            {
                                key: "2",
                                label: "Cash On Delivery",
                                children: <CashOnDeliveryInfoForm />,
                            },
                        ]}
                    />
                    
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
