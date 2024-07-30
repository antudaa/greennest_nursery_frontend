import { Button, message, Popconfirm } from "antd";
import { TCategory } from "../../../types/Category.interface";
import { useDeleteCategoryMutation } from "../../../redux/api/baseApi";

interface TCategoryDeleteButtonProps {
    record: TCategory,
}

const DeleteCategoryButton: React.FC<TCategoryDeleteButtonProps> = ({ record }) => {
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleDelete = async () => {
        try {
            const categoryId = record?._id as string;
            const res = await deleteCategory({ categoryId }).unwrap();
            if (res.success) {
                message.success(res.message);
            }
        } catch (error) {
            message.error('Something went wrong! Try again.');
        }
    };

    const confirm = async () => {
        await handleDelete();
    };

    const cancel = () => {
        message.error('Action cancelled');
    };

    return (
        <Popconfirm
            title="Are you sure you want to delete this category?"
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

export default DeleteCategoryButton;