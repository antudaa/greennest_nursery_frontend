import { Tabs } from 'antd';
import ManageProduct from '../components/dashboard/ManageProduct';
import ManageCategory from '../components/dashboard/ManageCategory';

const ProductAndCategoryManagementPage = () => {
    return (
        <div className="min-h-screen w-full">
            <h1 className="text-[#524434] text-3xl md:text-4xl font-semibold animate-fade-in whitespace-nowrap my-4">
                Manage Products🌴
            </h1>

            <Tabs
                defaultActiveKey="2"
                items={[
                    {
                        key: "1",
                        label: "Manage Categories",
                        children: <ManageCategory />,
                    },
                    {
                        key: "2",
                        label: "Manage Products",
                        children: <ManageProduct />,
                    },
                ]}
            />
        </div>
    );
};

export default ProductAndCategoryManagementPage;