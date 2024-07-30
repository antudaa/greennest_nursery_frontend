import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TCategory, TCategoryEdit } from '../../types/Category.interface';
import { TProduct, TProductEdit } from '../../types/Product.interface';
import { TOrder } from '../../types/order.interface';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://green-nest-nursery-backend.vercel.app/api` }),
    tagTypes: ["products", "categories"],
    endpoints: (builder) => ({
        addCategory: builder.mutation({
            query: (categoryBody: TCategory) => {
                return {
                    method: 'POST',
                    url: `/category`,
                    body: categoryBody,
                }
            },
            invalidatesTags: ['categories'],
        }),
        getCategory: builder.query({
            query: () => ({
                method: "GET",
                url: '/category'
            }),
            providesTags: ["categories"],
        }),
        updateCategory: builder.mutation({
            query: ({ categoryId, categoryBody }: { categoryId: string; categoryBody: TCategoryEdit }) => {
                return {
                    method: "PATCH",
                    url: `/category/${categoryId}`,
                    body: categoryBody,
                }
            },
            invalidatesTags: ["categories"],
        }),
        deleteCategory: builder.mutation({
            query: ({ categoryId }: { categoryId: string }) => ({
                method: 'DELETE',
                url: `/category/${categoryId}`
            }),
            invalidatesTags: ['categories'],
        }),
        addProduct: builder.mutation({
            query: (productBody: TProduct) => {
                return {
                    method: 'POST',
                    url: `/product`,
                    body: productBody
                }
            },
            invalidatesTags: ['products'],
        }),
        getProduct: builder.query({
            query: ({ searchTerm, sort, filter: category, page, limit }) => ({
                method: "GET",
                url: '/product',
                params: { searchTerm, sort, category, page, limit },
            }),
            providesTags: ["products"],
        }),
        getSingleProduct: builder.query({
            query: (slug: string) => (
                {
                    method: "GET",
                    url: `/product/${slug}`,
                }
            )
        }),
        updateProduct: builder.mutation({
            query: ({ productId, productBody }: { productId: string; productBody: TProductEdit }) => {
                return {
                    method: "PATCH",
                    url: `/product/${productId}`,
                    body: productBody,
                }
            },
            invalidatesTags: ['products'],
        }),
        deleteProduct: builder.mutation({
            query: ({ productId }: { productId: string }) => ({
                method: 'DELETE',
                url: `/product/${productId}`
            }),
            invalidatesTags: ['products'],
        }),
        createOrder: builder.mutation({
            query: (orderBody: TOrder) => {
                return {
                    method: "POST",
                    url: '/order',
                    body: orderBody,
                }
            },
            invalidatesTags: ['products'],
        }),
    }),
})

export const { useAddCategoryMutation, useGetCategoryQuery, useUpdateCategoryMutation, useDeleteCategoryMutation, useAddProductMutation, useGetProductQuery, useGetSingleProductQuery, useUpdateProductMutation, useDeleteProductMutation, useCreateOrderMutation } = baseApi;