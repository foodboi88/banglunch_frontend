import { Button, Form, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { AiOutlineEdit } from 'react-icons/ai'
import UserIcon from '../../../images/user-image.png'
const ProfileResume = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(values);
    };

    return (
        <div className='profile-content'>
            <div className='profile-content-left'>
                <img className='profile-content-avatar' src={UserIcon} alt='' />
                <Button className='profile-content-button'>
                    <AiOutlineEdit />
                    Đổi ảnh đại điện
                </Button>
            </div>
            <div className='profile-content-right'>
                <Form
                    layout={'vertical'}
                    form={form}
                    onFinish={onFinish}

                >
                    <Form.Item
                        label="Tên shop"
                        name="shopName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên shop' }]}
                    >
                        <Input placeholder='Nhập tên shop' />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="Email"
                        rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                    >
                        <Input placeholder='Nhập email' />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                    >
                        <Input placeholder='Nhập số điện thoại' />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                    >
                        <Input placeholder='Nhập địa chỉ' />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                    >
                        <TextArea placeholder='Nhập mô tả' />
                    </Form.Item>
                    <Form.Item>
                        <Button className='button-submit' type="primary" htmlType="submit">Lưu thông tin</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ProfileResume