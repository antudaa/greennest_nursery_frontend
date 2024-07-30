import React, { useContext, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import {
    TPersonalDetails,
    TShippingAddress,
    TOrder,
    TPersonalDetailsForm,
    TShippingAddressForm,
    TOrderDetailsForm,
    TOrderDetails,
} from '../../../types/order.interface';
import { CartContext } from '../../../redux/context/cartContext';
import { useCreateOrderMutation } from '../../../redux/api/baseApi';

interface IOrderProduct {
    productId: string;
    productName: string;
    category: {
        categoryName: string;
    };
    unitPrice: number;
    productImage: string;
    quantity: number;
    totalPrice: number;
    cartQuantity: number;
}

const CashOnDeliveryInfoForm: React.FC = () => {
    const [personalDetails, setPersonalDetails] = useState<TPersonalDetailsForm>({});
    const [shippingAddress, setShippingAddress] = useState<TShippingAddressForm>({});
    const cartContext = useContext(CartContext);
    const { state } = cartContext || { state: { cart: [] } };
    const { cart } = state;

    const [createOrder] = useCreateOrderMutation();

    const handleSubmit = async () => {
        const orderedProducts: IOrderProduct[] = (cart || [])
            .filter(item => item._id !== undefined)
            .map(item => {
                console.log(item); // Log the item to the console
                return {
                    productId: item._id as string,
                    productName: item.title || 'Unknown Product', // Provide a default value if undefined
                    category: item.category,
                    unitPrice: item.price,
                    productImage: item.productImage,
                    quantity: item.cartQuantity,
                    totalPrice: item.price * item.cartQuantity,
                    cartQuantity: item.cartQuantity, // Include cartQuantity here
                };
            });
        const productNumber = orderedProducts.length;
        const totalPrice = orderedProducts.reduce((total, product) => total + product.totalPrice, 0);

        const orderDetails: TOrderDetailsForm = {
            orderedProducts,
            productNumber,
            totalPrice,
        };

        const paymentData: TOrder = {
            personalDetails: personalDetails as TPersonalDetails,
            shippingAddress: shippingAddress as TShippingAddress,
            orderDetails: orderDetails as TOrderDetails,
        };

        try {
            const res = await createOrder(paymentData).unwrap();

            if (res.success) {
                message.success(res.message);
            }
        } catch (error: any) {
            message.error(error.data.message);
        }
    };

    return (
        <Form onFinish={handleSubmit}>
            <div>
                <h3 className="text-base text-gray-800 mb-4">Personal Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <Form.Item
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your First Name!' }]}
                    >
                        <Input
                            placeholder="First Name"
                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md"
                            onChange={e => setPersonalDetails({ ...personalDetails, firstName: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your Last Name!' }]}
                    >
                        <Input
                            placeholder="Last Name"
                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md"
                            onChange={e => setPersonalDetails({ ...personalDetails, lastName: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!', type: 'email' }]}
                    >
                        <Input
                            placeholder="Email"
                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md"
                            onChange={e => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        name="phoneNo"
                        rules={[{ required: true, message: 'Please input your Phone No!' }]}
                    >
                        <Input
                            placeholder="Phone No."
                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md"
                            onChange={e => setPersonalDetails({ ...personalDetails, contactNo: e.target.value })}
                        />
                    </Form.Item>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-base text-gray-800 mb-4">Shipping Address</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <Form.Item
                        name="fullAddress"
                        rules={[{ required: true, message: 'Please input your Address Line!' }]}
                    >
                        <Input
                            placeholder="Address Line"
                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md"
                            onChange={e => setShippingAddress({ ...shippingAddress, fullAddress: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        name="city"
                        rules={[{ required: true, message: 'Please input your City!' }]}
                    >
                        <Input
                            placeholder="City"
                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md"
                            onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        name="state"
                        rules={[{ required: true, message: 'Please input your State!' }]}
                    >
                        <Input
                            placeholder="State"
                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md"
                            onChange={e => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        name="zipCode"
                        rules={[{ required: true, message: 'Please input your Zip Code!' }]}
                    >
                        <Input
                            placeholder="Zip Code"
                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md"
                            onChange={e => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                        />
                    </Form.Item>
                </div>
                <div className="flex gap-4 max-md:flex-col mt-8">
                    <Button
                        type="default"
                        className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Complete Purchase
                    </Button>
                </div>
            </div>
        </Form>
    );
};

export default CashOnDeliveryInfoForm;

