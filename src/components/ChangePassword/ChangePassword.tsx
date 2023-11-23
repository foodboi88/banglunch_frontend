import React from 'react'
import './style.changepassword.scss'
import { Button, Form, Input } from 'antd'
import { motion } from 'framer-motion';
import { useDispatchRoot } from '../../redux/store';
import { changePasswordRequest } from '../../redux/controller';
const ChangePassword = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatchRoot();
    const onFinish = (values: any) => {
        console.log('Success:', values);
        const req = {
            ...values,
            additionalProp1: {}
        }
        console.log('req', req);

        dispatch(changePasswordRequest(req));
    };

    return (
        <div className='change-pawword-main'>
            <h3 className='change-password-title'>Đổi mật khẩu</h3>
            <Form
                className='change-password-form'
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Mật khẩu cũ"
                    name="oldPassword"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
                >
                    <Input className='change-password-input' placeholder='Nhập mật khẩu cũ' />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                >
                    <Input className='change-password-input' placeholder='Nhập mật khẩu mới' />
                </Form.Item>
                <Form.Item
                    label="Nhập lại mật khẩu mới"
                    name="confirmPassword"
                    rules={[
                        { required: true, message: 'Vui lòng nhập lại mật khẩu mới!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("newPassword") ===
                                    value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "Mật khẩu xác nhận không đúng!"
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input className='change-password-input' placeholder='Nhập lại mật khẩu mới' />
                </Form.Item>
                <motion.div className='change-passowrd-btn-item'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                >
                    <Button className='change-password-btn' type="primary" htmlType="submit">Đổi mật khẩu</Button>
                </motion.div>
            </Form>
        </div >
    )
}

export default ChangePassword
