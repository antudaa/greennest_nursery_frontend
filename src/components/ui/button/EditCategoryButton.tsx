import { Button, Form, Input, message, Modal } from "antd";
import { TCategoryEdit } from "../../../types/Category.interface";
import { useEffect, useState } from "react";
import { useUpdateCategoryMutation } from "../../../redux/api/baseApi";

interface TCategoryEditButtonProps {
    record: TCategoryEdit,
}

const EditCategoryButton: React.FC<TCategoryEditButtonProps> = ({ record }) => {
    const [open, setOpen] = useState(false);
    const [updateCategory] = useUpdateCategoryMutation();
    const [initialValues, setInitialValues] = useState<TCategoryEdit>({
        categoryName: record.categoryName,
        categoryImage: record.categoryImage,
    });

    useEffect(() => {
        setInitialValues({
            categoryName: record.categoryName,
            categoryImage: record.categoryImage,
        })
    }, [record]);

    const handleEdit = () => {
        setOpen(true);
    };

    const onFinish = async (values: TCategoryEdit) => {
        const changedData: Partial<TCategoryEdit> = {};

        (Object.keys(values) as Array<keyof TCategoryEdit>).forEach(key => {
            if (values[key] !== initialValues[key]) {
                changedData[key] = values[key];
            }
        });

        if (Object.keys(changedData).length === 0) {
            message.error('No changes detected!');
            return;
        }

        try {
            const categoryId = record._id as string;
            const res = await updateCategory({ categoryId: categoryId, categoryBody: values }).unwrap();
            if (res.success) {
                message.success(res.message);
                setOpen(false);
            }
        } catch (error: any) {
            message.error(error.data.message);
        }
    };

    const onFinishFailed = () => {
        message.error('Failed');
    };

    return (
        <div>
            <Button type="link" onClick={() => handleEdit()} style={{ backgroundColor: '#3b82f6', color: 'white' }}>Edit</Button>

            <Modal
                title={<p>Edit Category</p>}
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}
                centered
            >
                <Form
                    name={`editCategory`}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{
                        categoryName: record.categoryName,
                        categoryImage: record.categoryImage,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label={"Category Name"}
                        name="categoryName"
                        rules={[{ required: false }]}
                    >
                        <Input placeholder="Enter category name..." />
                    </Form.Item>

                    <Form.Item
                        label="Category Image"
                        name="categoryImage"
                        rules={[{ required: false }]}
                    >
                        <Input placeholder="Enter category image link..." />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button className="w-full" type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default EditCategoryButton;