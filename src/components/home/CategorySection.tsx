import { Spin } from 'antd';
import { useGetCategoryQuery } from '../../redux/api/baseApi';
import { TGetCategory } from '../../types/Category.interface';

type TCategory = {
    categoryName: string,
    categoryImage: string,
}

const CategorySection = () => {
    const { data, isLoading } = useGetCategoryQuery({});

    // Check for errors and loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spin size="large" />
            </div>
        );
    }

    const categories = data?.data?.data || [];
    const backgroundColors = [
        'bg-green-100',
        'bg-teal-100',
        'bg-yellow-100',
        'bg-blue-100',
        'bg-purple-100',
        'bg-orange-100',
        'bg-pink-100',
        'bg-cyan-100',
        'bg-red-100',
        'bg-lime-100',
    ];

    return (
        <div className='lg:mx-20 mx-4 my-10'>
            <div className='flex flex-col items-center my-10'>
                <div className='flex items-center gap-4 w-full'>
                    <hr className='flex-grow border-t-1 border-[#524434] min-w-[50px]' />
                    <h1 className="text-[#524434] text-3xl md:text-4xl font-semibold animate-fade-in whitespace-nowrap">
                        Category
                    </h1>
                    <hr className='flex-grow border-t-1 border-[#524434] min-w-[50px]' />
                </div>
            </div>
            <div className="">
                <div className="flex flex-wrap gap-4 justify-center mx-auto">
                    {categories?.filter((category: TGetCategory) => !category.isDeleted)?.map((category: TCategory, index: number) => (
                        <div
                            key={index}
                            className={`p-4 flex justify-between gap-2 border rounded-full shadow-md text-white cursor-pointer my-auto min:w-[150px] w-[180px] ${backgroundColors[index % backgroundColors.length]}`}
                        >
                            <h2 className="text-md font-semibold text-[#524434] my-auto">{category.categoryName}</h2>
                            <img className="w-10 h-10 bg-[aliceblue] border rounded-full" src={category?.categoryImage} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategorySection;