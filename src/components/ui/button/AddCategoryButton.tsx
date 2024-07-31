import { Button, Form, Input, message, Modal } from "antd";
import { TCategory } from "../../../types/Category.interface";
import { useState } from "react";
import { useAddCategoryMutation } from "../../../redux/api/baseApi";

const AddCategoryButton = () => {
    const [open, setOpen] = useState(false);
    const [addCategory] = useAddCategoryMutation();

    const handleAddCategory = () => {
        setOpen(true);
    }

    const onFinish = async (values: TCategory) => {
        try {
            const res = await addCategory(values).unwrap();
            if (res.success) {
                message.success(res.message);
                setOpen(false);
            }
        } catch (error: any) {
            message.error(error.data.message);
        }
    };

    return (
        <div>
            <Button type="link" onClick={() => handleAddCategory()} style={{ backgroundColor: '#3b82f6', color: 'white' }}>Add Category</Button>

            <Modal
                title={<p>Add Category</p>}
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}
                centered
            >
                <Form
                    name={`Add_Category`}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label={"Category Name"}
                        name="categoryName"
                        rules={[{ required: true, message: 'Category Name is required!' }]}
                    >
                        <Input placeholder="Enter category name..." />
                    </Form.Item>

                    <Form.Item
                        label="Category Image"
                        name="categoryImage"
                        rules={[{ required: true, message: 'Category Image is required!' }]}
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

export default AddCategoryButton;