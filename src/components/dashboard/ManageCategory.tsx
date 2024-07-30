import ManageCategoryTable from "../ui/table/ManageCategoryTable";
import AddCategoryButton from "../ui/button/AddCategoryButton";

const ManageCategory = () => {
    return (
        <div>
            <div className="my-5 flex justify-end">
                <AddCategoryButton />
            </div>

            <ManageCategoryTable />
        </div>
    );
};

export default ManageCategory;