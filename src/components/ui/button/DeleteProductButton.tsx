import { Button, Popconfirm, message } from "antd";
import { TProduct } from "../../../types/Product.interface";
import { useDeleteProductMutation } from "../../../redux/api/baseApi";

interface TProductDeleteButtonProps {
    record: TProduct;
}

const DeleteProductButton: React.FC<TProductDeleteButtonProps> = ({ record }) => {

    const [deleteProduct] = useDeleteProductMutation();

    const handleDelete = async () => {
        try {
            const productId = record?._id as string;
            const res = await deleteProduct({ productId }).unwrap();
            if (res.success) {
                message.success(res.message);
            }
        } catch (error) {
            message.error('Something went wrong!');
        }
    }

    const confirm = async () => {
        await handleDelete();
    };

    const cancel = () => {
        message.error('Action cancelled');
    };

    return (
        <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
        >
            <Button style={{ backgroundColor: '#ef4444', color: 'white' }} danger>Delete</Button>
        </Popconfirm>
    );
};

export default DeleteProductButton;