import { Button, Input, Select, Spin } from 'antd';
import { useGetCategoryQuery, useGetProductQuery } from '../../redux/api/baseApi';
import { TProduct } from '../../types/Product.interface';
import ProductCard from '../ui/Card/ProductCard';
import { useState } from 'react';
import DebounceSearch from '../../hooks/debounceSearchHook';
import PaginationComponent from '../ui/Pagination/Pagination';
import { TCategory } from '../../types/Category.interface';

const { Search } = Input;

const Products = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [limit] = useState(6);

    const debouncedSearchTerm = DebounceSearch(searchTerm, 500);
    const { data, isLoading } = useGetProductQuery({ searchTerm: debouncedSearchTerm, sort, filter, page, limit });
    const { data: categoryData } = useGetCategoryQuery({});
    const products: TProduct[] = data?.data?.data || [];
    const totalProducts = data?.data?.total || 0;

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (value: string) => {
        setFilter(value);
    };

    const handleSortChange = (value: string) => {
        setSort(value);
    };

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="my-20 lg:mx-20 mx-4">
            <div className='flex flex-col md:flex-row gap-2 justify-between mb-8'>
                <Select
                    className='w-32 hidden md:flex'
                    showSearch
                    placeholder="Filter"
                    onChange={handleFilterChange}
                    options={
                        [
                            { value: '', label: 'All' },
                            ...(categoryData?.data?.data?.map((category: TCategory) => ({
                                value: category._id,
                                label: category.categoryName
                            })) || [])
                        ]
                    }
                />
                <Search
                    style={{ borderColor: '#00e676' }}
                    className='my-auto w-[250px] mx-auto hidden md:flex'
                    placeholder="input search text"
                    allowClear
                    enterButton={<Button style={{ backgroundColor: '#00c853', borderColor: '#00c853', color: '#fff' }}>Search</Button>}
                    size="large"
                    onChange={handleSearch}
                />
                <div className='flex justify-between'>
                    <Select
                        className=''
                        showSearch
                        placeholder="Sort"
                        onChange={handleSortChange}
                        options={[
                            { value: 'price', label: 'Price' },
                            { value: 'rating', label: 'Rating' },
                            { value: 'title', label: 'Title' },
                        ]}
                    />
                    <Search
                        style={{ borderColor: '#00e676' }}
                        className='flex my-auto w-[250px] md:hidden'
                        placeholder="input search text"
                        allowClear
                        enterButton={<Button style={{ backgroundColor: '#00c853', borderColor: '#00c853', color: '#fff' }}>Search</Button>}
                        size="large"
                        onChange={handleSearch}
                    />
                </div>
                <Select
                    className='w-32 flex md:hidden'
                    showSearch
                    placeholder="Filter"
                    onChange={handleFilterChange}
                    options={
                        categoryData?.data?.data?.map((category: TCategory) => ({
                            value: category._id,
                            label: category.categoryName
                        })) || []}
                />
            </div>
            <div className="">
                <div className="flex flex-wrap gap-4 justify-center mx-auto">
                    {products?.map((product: TProduct) => {
                        return (
                            <ProductCard key={product?._id} product={product} />
                        )
                    })}
                </div>
            </div>
            <div className="flex justify-end mt-8">
                <PaginationComponent
                    current={page}
                    total={totalProducts}
                    pageSize={limit}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Products;