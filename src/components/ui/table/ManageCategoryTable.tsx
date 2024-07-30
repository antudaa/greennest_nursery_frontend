import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Spin, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { TGetCategory } from "../../../types/Category.interface";
import { useGetCategoryQuery } from '../../../redux/api/baseApi';
import EditCategoryButton from '../button/EditCategoryButton';
import DeleteCategoryButton from '../button/DeleteCategoryButton';
import PaginationComponent from '../Pagination/Pagination';

type DataIndex = keyof TGetCategory;

const ManageCategoryTable = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(8);
    const searchInput = useRef<InputRef>(null);

    const { data, isLoading } = useGetCategoryQuery({});
    const totalCategories = data?.data?.total || [];
    const categories: TGetCategory[] = data?.data?.data?.filter((category: TGetCategory) => !category.isDeleted)
        ?.map((category: TGetCategory) => ({
            key: category._id,
            _id: category._id,
            categoryName: category.categoryName,
            categoryImage: category.categoryImage,
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

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<TGetCategory> => ({
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
                        close
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

    const columns: TableColumnsType<TGetCategory> = [
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',
            width: '40%',
            ...getColumnSearchProps('categoryName'),
        },
        {
            title: 'Status',
            dataIndex: 'isDeleted',
            key: 'isDeleted',
            width: '20%',
            render: (text) => (text ? 'Deleted' : 'Active'),
        },
        {
            title: 'Action',
            key: 'action',
            width: '40%',
            render: (_, record) => (
                <Space size="middle">
                    <EditCategoryButton record={record} />
                    <DeleteCategoryButton record={record} />
                </Space>
            ),
        },
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <>
            <Table columns={columns} dataSource={categories} scroll={{ x: 700 }} />
            <div className="flex justify-center mt-8">
                {data && (
                    <PaginationComponent
                        current={page}
                        total={totalCategories}
                        pageSize={limit}
                        onChange={handlePageChange}
                    />
                )}
            </div>
        </>
    );
};

export default ManageCategoryTable;