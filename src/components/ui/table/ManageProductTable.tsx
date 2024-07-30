import React, { useRef, useState } from "react";
import { TProduct } from "../../../types/Product.interface";
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Spin, Table } from 'antd';
import { useGetProductQuery } from "../../../redux/api/baseApi";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import EditProductButton from "../button/EditProductButton";
import DeleteProductButton from "../button/DeleteProductButton";
import PaginationComponent from "../Pagination/Pagination";

type DataIndex = keyof TProduct;

const ManageProductTable: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState<DataIndex | ''>('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const searchInput = useRef<InputRef>(null);

    const { data: ProductData, isLoading: productDataLoading } = useGetProductQuery({
        page, limit
    });

    const totalProducts = ProductData?.data?.total || 0;

    const products: TProduct[] = ProductData?.data?.data?.filter((product: TProduct) => !product.isDeleted)
        ?.map((product: TProduct) => ({
            key: product?._id,
            _id: product?._id,
            category: product?.category?.categoryName,
            title: product?.title,
            description: product?.description,
            quantity: product?.quantity,
            price: product?.price,
            productImage: product?.productImage,
            outOfStock: product?.outOfStock,
            rating: product?.rating,
            isDeleted: product?.isDeleted,
        })) || [];

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<TProduct> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) => {
            const recordValue = record[dataIndex];
            return recordValue ? recordValue.toString().toLowerCase().includes((value as string).toLowerCase()) : false;
        },
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const columns: TableColumnsType<TProduct> = [
        {
            title: 'Product Image',
            dataIndex: 'productImage',
            key: 'productImage',
            width: '10%',
            render: (text) => <img className="rounded-xl border border-indigo-400" src={text} alt="product" style={{ width: 50, height: 40 }} />,
        },
        {
            title: 'Product Name',
            dataIndex: 'title',
            key: 'title',
            width: '20%',
            ...getColumnSearchProps('title'),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: "category",
            width: '10%',
            ...getColumnSearchProps('category'),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: "price",
            width: '10%',
            ...getColumnSearchProps('price'),
        },
        {
            title: 'Available Quantity',
            dataIndex: 'quantity',
            key: "quantity",
            width: '10%',
            ...getColumnSearchProps('quantity'),
        },
        {
            title: 'Status',
            dataIndex: 'outOfStock',
            key: "outOfStock",
            width: '10%',
            render: (text) => (text ? 'Out Of Stock' : 'In Stock'),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            width: '10%',
            ...getColumnSearchProps('rating'),
        },
        {
            title: 'Action',
            key: 'action',
            width: '30%',
            render: (_, record) => (
                <Space size="middle">
                    <EditProductButton record={record} />
                    <DeleteProductButton record={record} />
                </Space>
            ),
        },
    ];

    if (productDataLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={products}
                pagination={false} // Remove default pagination
                scroll={{ x: 700 }}
            />
            <div className="flex justify-center mt-8">
                {ProductData && (
                    <PaginationComponent
                        current={page}
                        total={totalProducts}
                        pageSize={limit}
                        onChange={handlePageChange}
                    />
                )}
            </div>
        </>
    );
};

export default ManageProductTable;
