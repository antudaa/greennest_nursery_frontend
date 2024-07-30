import { Button, Form, Modal, Input, Select, InputNumber } from "antd";
import { TProduct, TProductEdit } from "../../../types/Product.interface";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useGetCategoryQuery, useUpdateProductMutation } from "../../../redux/api/baseApi";
import { TCategory } from "../../../types/Category.interface";

const { Option } = Select;

interface TProductEditButtonProps {
    record: TProduct;
}

const EditProductButton: React.FC<TProductEditButtonProps> = ({ record }) => {
    const [open, setOpen] = useState(false);
    const [initialValues, setInitialValues] = useState<TProductEdit>({
        title: record.title,
        category: record.category,
        description: record.description,
        price: record.price,
        rating: record.rating,
        quantity: record.quantity,
        outOfStock: record.outOfStock,
        productImage: record.productImage,
    });
    const [updateProduct] = useUpdateProductMutation();
    const { data: CategoryData } = useGetCategoryQuery({});
    const Categories = CategoryData?.data?.data;

    useEffect(() => {
        setInitialValues({
            title: record.title,
            category: record.category,
            description: record.description,
            price: record.price,
            rating: record.rating,
            quantity: record.quantity,
            outOfStock: record.outOfStock,
            productImage: record.productImage,
        });
    }, [record]);

    const handleEdit = () => {
        setOpen(true);
    };

    const onFinish = async (values: TProductEdit) => {
        const changedData: Partial<TProductEdit> = {};

        (Object.keys(values) as Array<keyof TProductEdit>).forEach((key) => {
            if (values[key] !== initialValues[key]) {
                changedData[key] = values[key] as any;
            }
        });

        if (Object.keys(changedData).length === 0) {
            toast.error('No changes detected.');
            return;
        }

        try {
            const res = await updateProduct({ productId: record._id as string, productBody: changedData }).unwrap();
            if (res.success) {
                toast.success(res.message);
                setOpen(false);
            }
        } catch (error: any) {
            toast.error(error.data.message);
        }
    };

    return (
        <div>
            <Button type="link" onClick={handleEdit} style={{ backgroundColor: '#3b82f6', color: 'white' }}>Edit</Button>

            <Modal
                title={<p>Edit Product Info</p>}
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}
                centered
            >
                <Form
                    name={`editCategory-${record._id}`}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={initialValues}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Product Name"
                        name="title"
                        rules={[{ required: false }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: false }]}
                    >
                        <Select>
                            {Categories?.map((category: TCategory) =>
                                <Option key={category._id} value={category._id}>{category.categoryName}</Option>
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: false }]}
                    >
                        <Input.TextArea showCount maxLength={1000} />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: false }]}
                    >
                        <InputNumber className="w-full" />
                    </Form.Item>

                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: false }]}
                    >
                        <InputNumber className="w-full" />
                    </Form.Item>

                    <Form.Item
                        label="Available Quantity"
                        name="quantity"
                        rules={[{ required: false }]}
                    >
                        <InputNumber className="w-full" />
                    </Form.Item>

                    <Form.Item
                        label="Out Of Stock"
                        name="outOfStock"
                        rules={[{ required: false }]}
                    >
                        <Select>
                            <Option value={true}>True</Option>
                            <Option value={false}>False</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Product Image"
                        name="productImage"
                        rules={[{ required: false }]}
                    >
                        <Input />
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

export default EditProductButton;
