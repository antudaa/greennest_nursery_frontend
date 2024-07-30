import ManageProductTable from "../ui/table/ManageProductTable";
import AddProductButton from "../ui/button/AddProductButton";

const ManageProduct = () => {
    return (
        <div>
            <div className="my-5 flex justify-end">
                <AddProductButton />
            </div>

            <ManageProductTable />
        </div>
    );
};

export default ManageProduct;