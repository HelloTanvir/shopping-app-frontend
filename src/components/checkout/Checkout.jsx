/* eslint-disable no-underscore-dangle */
import { Fab } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { AutoComplete, Button, Drawer, Form, Input, message, Select } from 'antd';
import React, { useContext, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import axios from '../../utils/axios';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const Checkout = () => {
    const [form] = Form.useForm();

    const [open, setOpen] = useState(false);
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const [errors, setErrors] = useState({
        name: { msg: '' },
        email: { msg: '' },
        mobile: { msg: '' },
        paymentMethod: { msg: '' },
        address: { msg: '' },
    });

    const { allProducts, setIsLoading } = useContext(ProductContext);

    const onEmailChange = (value) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(
                ['@gmail.com', '@yahoo.com', '@outlook.com'].map((mail) => `${value}${mail}`)
            );
        }
    };

    const emailOptions = autoCompleteResult.map((email) => ({
        label: email,
        value: email,
    }));

    const handleSubmit = async () => {
        const { name, email, mobile, paymentMethod, address } = form.getFieldsValue(true);

        if (!name || !email || !mobile || !paymentMethod || !address) return;

        setIsLoading(true);

        const cartProducts = allProducts
            .filter((prod) => prod.inCart)
            .map((prod) => ({
                id: prod._id,
                quantity: prod.amount,
            }));

        const data = {
            name,
            email,
            mobile: `+880${mobile}`,
            paymentMethod,
            address,
            cartProducts,
        };

        try {
            const res = await axios.post('/order', data);

            if (res) {
                form.resetFields(['name', 'email', 'mobile', 'paymentMethod', 'address']);
                setOpen(false);
                setIsLoading(false);
                message.success('Order recorded successfully');
            }
        } catch (err) {
            form.resetFields(['name', 'email', 'mobile', 'paymentMethod', 'address']);
            setIsLoading(false);

            setErrors((prev) => ({
                ...prev,
                ...err.response.data.errors,
            }));
        }
    };

    return (
        <>
            <Fab
                variant="extended"
                size="small"
                color="default"
                aria-label="add"
                style={{ width: '100%' }}
                onClick={() => setOpen(true)}
            >
                <ShoppingCart />
                CHECKOUT
            </Fab>

            <Drawer
                title="Checkout"
                width={520}
                onClose={() => setOpen(false)}
                visible={open}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={() => setOpen(false)} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} type="primary">
                            Submit
                        </Button>
                    </div>
                }
            >
                <Form
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...formItemLayout}
                    form={form}
                    name="checkout"
                    hideRequiredMark
                    scrollToFirstError
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please input your Name!',
                            },
                            {
                                validator: (_, value) => {
                                    if (!value || !errors.name.msg) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error(errors.name.msg));
                                },
                            },
                        ]}
                    >
                        <Input placeholder="Please input your name" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                            {
                                validator: (_, value) => {
                                    if (!value || !errors.email.msg) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error(errors.email.msg));
                                },
                            },
                        ]}
                    >
                        <AutoComplete
                            options={emailOptions}
                            onChange={onEmailChange}
                            placeholder="Please input your E-mail"
                        >
                            <Input />
                        </AutoComplete>
                    </Form.Item>

                    <Form.Item
                        name="mobile"
                        label="Mobile Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your mobile number!',
                            },
                            {
                                validator: (_, value) => {
                                    if (!value || !errors.mobile.msg) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error(errors.mobile.msg));
                                },
                            },
                        ]}
                    >
                        <Input
                            addonBefore="+880"
                            placeholder="Please input your mobile number"
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="paymentMethod"
                        label="Payment Method"
                        rules={[
                            {
                                required: true,
                                message: 'Please select a payment method!',
                            },
                            {
                                validator: (_, value) => {
                                    if (!value || !errors.paymentMethod.msg) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error(errors.paymentMethod.msg));
                                },
                            },
                        ]}
                    >
                        <Select placeholder="Select a payment method">
                            <Option value="bkash">Bkash</Option>
                            <Option value="nogod">Nogod</Option>
                            <Option value="rocket">Rocket</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address',
                            },
                            {
                                validator: (_, value) => {
                                    if (!value || !errors.address.msg) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error(errors.address.msg));
                                },
                            },
                        ]}
                    >
                        <Input.TextArea rows={4} placeholder="Please input your address" />
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default Checkout;
