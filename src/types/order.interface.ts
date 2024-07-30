export type TPersonalDetails = {
    firstName: string;
    lastName: string;
    email: string;
    contactNo: string;
};

export type TShippingAddress = {
    fullAddress: string;
    city: string;
    state: string;
    zipCode: string;
};

export type TProductInfo = {
    productId: string;
    productName: string;
    category: {
        _id: string;
        categoryName: string;
        categoryImage: string;
    };
    unitPrice: number;
    productImage: string;
    quantity: number;
    totalPrice: number;
    cartQuantity?: number;
};

export type TOrderDetails = {
    orderedProducts: TProductInfo[];
    productNumber: number;
    totalPrice: number;
};

export type TOrder = {
    personalDetails: TPersonalDetails;
    shippingAddress: TShippingAddress;
    orderDetails: TOrderDetails;
};

export type TPersonalDetailsForm = Partial<TPersonalDetails>;
export type TShippingAddressForm = Partial<TShippingAddress>;
export type TProductInfoForm = Partial<TProductInfo>;
export type TOrderDetailsForm = Partial<TOrderDetails>;
export type TOrderForm = Partial<TOrder>;
