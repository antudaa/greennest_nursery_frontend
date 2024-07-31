import { Button, Form, Modal, Input, Select, InputNumber, message } from "antd";
import { useState } from "react";
import { useAddProductMutation, useGetCategoryQuery } from "../../../redux/api/baseApi";
import { TCategory } from "../../../types/Category.interface";
import { TProduct } from "../../../types/Product.interface";

const { Option } = Select;


const AddProductButton = () => {

    const [open, setOpen] = useState(false);
    const [addProduct] = useAddProductMutation();
    const { data: CategoryData } = useGetCategoryQuery({});
    const Categories = CategoryData?.data?.data;

    const handleEdit = () => {
        setOpen(true);
    };

    const onFinish = async (values: TProduct) => {
        try {
            const res = await addProduct(values).unwrap();
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
            <Button type="link" onClick={handleEdit} style={{ backgroundColor: '#3b82f6', color: 'white' }}>Add Product</Button>

            <Modal
                title={<p>Add Product</p>}
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}
                centered
            >
                <Form
                    name={`Add_Product`}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Product Name"
                        name="title"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Enter Product Name" />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="Select">
                            {Categories?.map((category: TCategory) =>
                                <Option key={category?._id} value={category?._id}>{category?.categoryName}</Option>
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea showCount maxLength={1000} placeholder="Add a short description..." />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true }]}
                    >
                        <InputNumber placeholder="Enter product price" className="w-full" />
                    </Form.Item>

                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true }]}
                    >
                        <InputNumber placeholder="Add ratings" className="w-full" />
                    </Form.Item>

                    <Form.Item
                        label="Available Quantity"
                        name="quantity"
                        rules={[{ required: true }]}
                    >
                        <InputNumber placeholder="Enter available product quantity" className="w-full" />
                    </Form.Item>

                    <Form.Item
                        label="Product Image"
                        name="productImage"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Enter product image link..." />
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

export default AddProductButton;