import { Fab } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { AutoComplete, Button, Drawer, Form, Input, message, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
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

        if (!name || !email || !mobile || !paymentMethod || !address) {
            form.setFields([
                {
                    name: 'name',
                    errors: !name && ['Please input your name'],
                },
                {
                    name: 'email',
                    errors: !email && ['Please input your email'],
                },
                {
                    name: 'mobile',
                    errors: !mobile && ['Please input your mobile number'],
                },
                {
                    name: 'paymentMethod',
                    errors: !paymentMethod && ['Please select a payment method'],
                },
                {
                    name: 'address',
                    errors: !address && ['Please input your address'],
                },
            ]);
            return;
        }

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
            const res = await axios.post('/orders', data);

            if (res) {
                setIsLoading(false);
                setOpen(false);
                message.success('Order recorded successfully');
                form.resetFields(['name', 'email', 'mobile', 'paymentMethod', 'address']);
            }
        } catch (err) {
            // form.resetFields(['name', 'email', 'mobile', 'paymentMethod', 'address']);
            setIsLoading(false);

            form.setFields([
                {
                    name: 'name',
                    errors: err.response.data?.errors?.name?.msg && [
                        err.response.data?.errors?.name?.msg,
                    ],
                },
                {
                    name: 'email',
                    errors: err.response.data?.errors?.email?.msg && [
                        err.response.data?.errors?.email?.msg,
                    ],
                },
                {
                    name: 'mobile',
                    errors: err.response.data?.errors?.mobile?.msg && [
                        err.response.data?.errors?.mobile?.msg,
                    ],
                },
                {
                    name: 'paymentMethod',
                    errors: err.response.data?.errors?.paymentMethod?.msg && [
                        err.response.data?.errors?.paymentMethod?.msg,
                    ],
                },
                {
                    name: 'address',
                    errors: err.response.data?.errors?.address?.msg && [
                        err.response.data?.errors?.address?.msg,
                    ],
                },
            ]);
        }
    };

    useEffect(
        () => form.resetFields(['name', 'email', 'mobile', 'paymentMethod', 'address']),
        [form, open]
    );

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
                                message: 'Please input your name',
                            },
                        ]}
                    >
                        <Input placeholder="Please input your name" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid email',
                            },
                            {
                                required: true,
                                message: 'Please input your email',
                            },
                        ]}
                    >
                        <AutoComplete
                            options={emailOptions}
                            onChange={onEmailChange}
                            placeholder="Please input your email"
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
                                message: 'Please input your mobile number',
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
                                message: 'Please select a payment method',
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
