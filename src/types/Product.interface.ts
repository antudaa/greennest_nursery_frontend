import { TGetCategory } from "./Category.interface";

export type TProduct = {
    _id?: string;
    category: TGetCategory;
    title: string;
    description: string;
    quantity: number;
    price: number;
    productImage: string;
    outOfStock: boolean;
    rating: number;
    isDeleted: boolean;
};

export type TProductEdit = {
    _id?: string;
    category?: TGetCategory;
    title?: string;
    description?: string;
    quantity?: number;
    price?: number;
    productImage?: string;
    outOfStock?: boolean;
    rating?: number;
    isDeleted?: boolean;
};

