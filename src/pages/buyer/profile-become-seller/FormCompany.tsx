import { Button, DatePicker, Form, Input, Select } from 'antd';
import { IReqFormArchitect } from '../../../common/profile.interface';
import { getBusinessByTaxCodeRequest, getLstBankRequest, sellerRegisterRequest } from '../../../redux/controller';
import { useDispatchRoot, useSelectorRoot } from '../../../redux/store';
import { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined, FlagOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Rule } from 'antd/lib/form';
import moment from 'moment';

interface Props {
    setPage(e: any): void;
}

const FormCompany = (props: Props) => {

    const dispatch = useDispatchRoot();
    const [formCompany] = Form.useForm();
    const { businessProfile, lstBank } = useSelectorRoot((state) => state.sketch);
    const [bankName, setBankName] = useState<string>('');
    const [accountNumber, setAccountNumber] = useState<string>('');
    const onFinish = (values: any) => {
        console.log(values);
        // format date to 2021-01-01T00:00:00.000Z
        const date = new Date(values.dateOfIssue._d);

        const res: IReqFormArchitect = {
            sellerType: "COMPANY",
            identityCardNumber: values.businessRegistration,
            identityCardDate: date.toISOString(),
            identityCardPlace: values.placeOfIssue,
            vatCode: values.taxCode,
            bankAccountNumber: values.accountNumber,
            bankAccountName: values.accountName,
            bankName: values.bank,
            bankBranch: values.branch,
            additionalProp1: {}
        }
        dispatch(sellerRegisterRequest(res));
    };
    const handleChangeTaxCode = (e: any) => {
        console.log(e.target.value);
        dispatch(getBusinessByTaxCodeRequest(e.target.value))
    }

    useEffect(() => {
        if (businessProfile) {
            formCompany.setFieldsValue({
                address: businessProfile.address,
            });
        }
    }, [businessProfile])
    useEffect(() => {
        dispatch(getLstBankRequest());
    }, [])

    useEffect(() => {
        console.log(lstBank);
    }, [lstBank])
    const handleChangeBank = (e: any) => {
        console.log(e);
        setBankName(e);
        // dispatch(getBusinessByTaxCodeRequest(e.target.value))

    }

    const handleChangeAccountNumber = (e: any) => {
        console.log(e.target.value);
        setAccountNumber(e.target.value);
        // dispatch(getBusinessByTaxCodeRequest(e.target.value))
    }

    const validateVietnameseID = (id: string) => {
        if (id.length !== 12) {
            return false;
        }

        return true;
    }

    const validateVietnamesePhoneNumber = (phoneNumber: string) => {
        // Loại bỏ các ký tự không phải số
        phoneNumber = phoneNumber.replace(/\D/g, '');

        // Kiểm tra độ dài của số điện thoại
        if (phoneNumber.length !== 10 && phoneNumber.length !== 11) {
            return false;
        }

        // Kiểm tra tiền tố của số điện thoại
        var prefixes = ['03', '05', '07', '08', '09', '01'];
        var prefix = phoneNumber.slice(0, 2);

        if (!prefixes.includes(prefix)) {
            return false;
        }

        // Kiểm tra số điện thoại chỉ chứa chữ số
        if (isNaN(parseInt(phoneNumber))) {
            return false;
        }

        return true;
    }

    const validateEmail = (email: string) => {
        // Biểu thức chính quy để kiểm tra định dạng email
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    }

    const CCCDValidator = (
        rule: Rule,
        value: string,
        callback: (message?: string) => void
    ) => {
        if (!validateVietnameseID(value)) {
            callback("Vui lòng nhập mật khẩu.");
        }

        else {
            callback();
        }
    };

    const phoneNumberValidator = (
        rule: Rule,
        value: string,
        callback: (message?: string) => void
    ) => {
        if (!validateVietnamesePhoneNumber(value)) {
            callback("Vui lòng nhập mật khẩu.");
        }

        else {
            callback();
        }
    }

    const emailValidator = (
        rule: Rule,
        value: string,
        callback: (message?: string) => void
    ) => {
        if (!validateEmail(value)) {
            callback("Vui lòng nhập mật khẩu.");
        }

        else {
            callback();
        }
    }

    // Define the disabledDate function
    const disabledDate = (current: any) => {
        // Disable dates that are after the current date
        return current && current > moment().endOf('day');
    };
    return (
        <div className='profile-content form-individuals'>
            <div className='profile-content-title'>Điền thông tin của bạn vào ô dưới đây!</div>
            <div className="profile-content-sub-title">Admin sẽ duyệt thông tin của bạn và phản hồi lại trong vòng 15p nếu thông tin của bạn hợp lệ.</div>
            <Form
                layout={'vertical'}
                form={formCompany}
                onFinish={onFinish}
                className='form-individuals-content'
            >
                <Form.Item
                    label="Tên doanh nghiệp"
                    name="companyName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên doanh nghiệp' }]}
                >
                    <Input placeholder='Nhập tên doanh nghiệp' />
                </Form.Item>

                <Form.Item
                    label="Đăng ký kinh doanh"
                    name="businessRegistration"
                    rules={[{ required: true, message: 'Vui lòng nhập đăng ký kinh doanh' }]}
                >
                    <Input placeholder='Nhập đăng ký kinh doanh' />
                </Form.Item>
                <div className='flex-col' >
                    <Form.Item
                        label="Ngày cấp"
                        name="dateOfIssue"
                        rules={[{ required: true, message: 'Vui lòng nhập ngày cấp' }]}
                    >
                        <DatePicker placeholder='Nhập ngày cấp' format={'DD/MM/YYYY'} disabledDate={disabledDate}
                            onChange={(e: any) => {
                                console.log(e);
                            }}
                            inputReadOnly={true}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Nơi cấp"
                        name="placeOfIssue"
                        rules={[{ required: true, message: 'Vui lòng nhập nơi cấp' }]}
                    >
                        <Input placeholder='Nhập nơi cấp' />
                    </Form.Item>
                </div>
                <Form.Item
                    label="Mã số thuế cá nhân"
                    name="taxCode"
                    rules={[{ required: true, message: 'Vui lòng nhập mã số thuế' }]}
                >
                    <Input placeholder='Nhập mã số thuế' onChange={handleChangeTaxCode} />
                </Form.Item>
                <Form.Item
                    label="Người đại diện"
                    name="representative"
                    rules={[{ required: true, message: 'Vui lòng nhập người đại diện' }]}
                >
                    <Input placeholder='Nhập người đại diện' />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                >
                    <Input placeholder='Nhập địa chỉ' />
                </Form.Item>
                <div className="flex-col">

                    <Form.Item
                        label="Email"
                        name="Email"
                        rules={[
                            {
                                validator: emailValidator,
                                message: 'Email không hợp lệ'
                            }
                        ]}                    >
                        <Input placeholder='Nhập email' />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[
                            {
                                validator: phoneNumberValidator,
                                message: 'Số điện thoại không hợp lệ'
                            }
                        ]}                    >
                        <Input placeholder='Nhập số điện thoại' />
                    </Form.Item>
                </div>
                <div className="flex-col">

                    <Form.Item
                        label="Ngân hàng"
                        name="bank"
                        rules={[{ required: true, message: 'Vui lòng nhập ngân hàng' }]}
                    >
                        <Select
                            showSearch
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Nhập ngân hàng"
                            onChange={handleChangeBank}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            } suffixIcon={<CaretDownOutlined />}
                            options={lstBank.map((item, index) => ({ label: item.name, value: item.name }))}

                        />
                    </Form.Item>
                    <Form.Item
                        label="Chi nhánh"
                        name="branch"
                        rules={[{ required: true, message: 'Vui lòng nhập chi nhánh' }]}
                    >
                        <Input placeholder='Nhập chi nhánh' />
                    </Form.Item>
                </div>
                <div className="flex-col">

                    <Form.Item
                        label="Số tài khoản"
                        name="accountNumber"
                        rules={[{ required: true, message: 'Vui lòng nhập số tài khoản' }]}
                    >
                        <Input placeholder='Nhập số tài khoản' />
                    </Form.Item>
                    <Form.Item
                        label="Tên tài khoản"
                        name="accountName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản' }]}
                    >
                        <Input placeholder='Nhập tên tài khoản' />
                    </Form.Item>
                </div>


                <Form.Item >
                    <div className='button-groud'>
                        <Button className='button-back' onClick={() => {
                            document.body.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });
                            props.setPage(1)
                        }}>Quay lại</Button>
                        <Button className='button-submit' type="primary" htmlType="submit">Gửi thông tin</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormCompany