import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, Switch } from "antd";
import { useEffect, useState } from "react";

import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { Rule } from "antd/lib/form";
import { motion } from "framer-motion";
import { REGISTER_MODE } from "../../constants/role.constants";
import { registerRequest, registerSellerRequest } from "../../redux/controller";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import "./login.scss";
interface MyProps {
    isOpenModal: boolean;
    toggleRegisterModal: () => void;
    toggleLoginModal: () => void;
    handleCancelModal: () => void;
    setIsOpenRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const regexPhoneNumber = /^0(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/;
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const regexPass =
    /^.{6,}$/;

const Register = (props: MyProps) => {
    const [registerMode, setRegisterMode] = useState<boolean>(false)
    const dispatch = useDispatchRoot();
    const [checked, setChecked] = useState<boolean>(false);
    const { registerSuccess } = useSelectorRoot((state) => state.login);

    const phoneValidator = (
        rule: Rule,
        value: string,
        callback: (message?: string) => void
    ) => {
        if (!value) {
            callback("Vui lòng nhập số điện thoại");
        } else if (!regexPhoneNumber.test(value)) {
            callback("Số điện thoại không hợp lệ");
        } else {
            callback();
        }
    };

    const emailValidator = (
        rule: Rule,
        value: string,
        callback: (message?: string) => void
    ) => {
        if (!value) {
            callback("Vui lòng nhập email");
        } else if (!regexEmail.test(value)) {
            callback("Email không hợp lệ");
        } else {
            callback();
        }
    };

    const passwordValidator = (
        rule: Rule,
        value: string,
        callback: (message?: string) => void
    ) => {
        if (!value) {
            callback("Vui lòng nhập mật khẩu.");
        } else if (value.length < 6) {
            callback("Mật khẩu phải lớn hơn 6 ký tự.");
        } else {
            callback();
        }
    };

    const onFinish = async (account: any): Promise<any> => {
        console.log(account);
        if (registerMode === REGISTER_MODE.BUYER) {
            const bodyrequest = {
                email: account.emailReg,
                password: account.passwordReq,
                confirmPassword: account.confirmPasswordReq,
                name: account.nameReg,
                phone: account.phoneNumberReg,
                address: account.address,
                dob: "2023-04-11T04:18:58.326Z",
                gender: true,
                additionalProp1: {}
            };
            console.log(bodyrequest)
            dispatch(registerRequest(bodyrequest));
        } else {
            const bodyrequest = {
                email: account.emailReg,
                password: account.passwordReq,
                confirmPassword: account.confirmPasswordReq,
                name: account.nameReg,
                phone: account.phoneNumberReg,
                address: account.address,
                dob: "2023-04-11T04:18:58.326Z",
                gender: true,
                identityId: account.identityId,
                personalTaxCode: account.personalTaxCode,
                fromDetailAddress: account.fromDetailAddress,
                additionalProp1: {}
            };
                        console.log(bodyrequest)
            dispatch(registerSellerRequest(bodyrequest));

        }
    };

    const handleChangeCheckBox = (event: CheckboxChangeEvent) => {
        console.log(`checked = ${event.target.checked}`);
        setChecked(event.target.checked);
    }

    useEffect(() => {
        if (registerSuccess) {
            props.setIsOpenRegisterModal(false)
        }
    }, [registerSuccess]);

    return (
        <>
            <Modal
                title="Đăng ký"
                open={props.isOpenModal}
                onOk={props.handleCancelModal}
                onCancel={props.handleCancelModal}
                footer={false}
                className="modal-login"
            >
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={(item) => onFinish(item)}
                    layout="vertical"
                >
                    <Switch checkedChildren="Đăng ký làm chủ quán" unCheckedChildren="Đăng ký làm người mua" onClick={(event)=>setRegisterMode(event)} defaultChecked={registerMode} />
                    <div className="row-item">
                        <Form.Item
                            label="Họ và tên"
                            name="nameReg"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập họ tên",
                                },
                            ]}
                        >
                            <Input
                                className="form-input"
                                placeholder="Nhập họ tên"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phoneNumberReg"
                            rules={[
                                {
                                    validator: phoneValidator,
                                    message: "Số điện thoại không hợp lệ",
                                },
                            ]}
                        >
                            <Input
                                className="form-input"
                                placeholder="Nhập số điện thoại"
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            label="Email/sdt"
                            name="emailReg"
                            rules={[
                                {
                                    validator: emailValidator,
                                    message: "Email không hợp lệ",
                                },
                            ]}
                        >
                            <Input
                                className="form-input"
                                placeholder="Nhập email/sđt"
                            />
                        </Form.Item>
                        <div className="check-label">
                            Mỗi email chỉ được đăng ký 1 tài khoản.
                        </div>
                    </div>

                    <Form.Item
                        label="Địa chỉ cá nhân"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập Địa chỉ cá nhân",
                            },
                        ]}
                    >
                        <Input
                            className="form-input"
                            placeholder="Nhập số Địa chỉ cá nhân"
                        />
                    </Form.Item>
                    <div>
                        <Form.Item
                            label="Mật khẩu"
                            name="passwordReq"
                            rules={[
                                {
                                    validator: passwordValidator,
                                    message:
                                        "Mật khẩu chưa đủ mạnh. Vui lòng nhập lại.",
                                },
                            ]}
                        >
                            <Input.Password
                                className="form-input"
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                }
                                type="password"
                                placeholder="Nhập mật khẩu"
                            />
                        </Form.Item>
                        <div className="check-label">
                            Mật khẩu phải lớn hơn 6 ký tự.
                        </div>
                    </div>
                    <div>
                        <Form.Item
                            // className='form-input'
                            label="Xác nhận mật khẩu"
                            name="confirmPasswordReq"
                            dependencies={["passwordReq"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue("passwordReq") ===
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
                            <Input.Password
                                className="form-input"
                                id="basic_ConfirmPasswordRegiter"
                                placeholder="Nhập lại mật khẩu"
                            />
                        </Form.Item>
                        {
                            registerMode === REGISTER_MODE.SELLER && 
                            <>
                                <Form.Item
                                    label="Căn cước công dân"
                                    name="identityId"
                                    rules={[
                                        {
                                            required: registerMode === REGISTER_MODE.SELLER ? true : false,
                                            message: "Vui lòng nhập số Căn cước công dân",
                                        },
                                    ]}
                                >
                                    <Input
                                        className="form-input"
                                        placeholder="Nhập số căn cước công dân"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Mã số thuế cá nhân"
                                    name="personalTaxCode"
                                    rules={[
                                        {
                                            required: registerMode === REGISTER_MODE.SELLER ? true : false,
                                            message: "Vui lòng nhập Mã số thuế cá nhân",
                                        },
                                    ]}
                                >
                                    <Input
                                        className="form-input"
                                        placeholder="Nhập Mã số thuế cá nhân"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Địa chỉ quán"
                                    name="fromDetailAddress"
                                    rules={[
                                        {
                                            required: registerMode === REGISTER_MODE.SELLER ? true : false,
                                            message: "Vui lòng nhập Địa chỉ quán",
                                        },
                                    ]}
                                >
                                    <Input
                                        className="form-input"
                                        placeholder="Nhập Địa chỉ quán"
                                    />
                                </Form.Item>
                            </>
                        }
                    </div>

                    <Form.Item
                        className="remember-forgot-password"
                        name="remember"
                        valuePropName="checked"
                    >
                        <label className="label-login">
                            <Checkbox className="checkbox-login" onChange={handleChangeCheckBox} />
                            <div>
                                Tôi đồng ý với <strong>Điều khoản</strong>và
                                <strong>Chính sách bảo mật.</strong>
                            </div>
                        </label>
                    </Form.Item>

                    <Form.Item className="form-submit">
                        <motion.div
                            style={{
                                cursor: "pointer",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            whileFocus={{ scale: 1.05 }}
                        >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button active"
                                    disabled={!checked}
                                >
                                    Đăng ký
                                </Button>

                        </motion.div>
                        <div className="change-to-register">
                            Bạn đã có tài khoản ?
                            <motion.strong
                                className="register"
                                whileHover={{ scale: 1.3 }}
                                whileTap={{ scale: 0.95 }}
                                whileFocus={{ scale: 1.3 }}
                                onClick={props.toggleLoginModal}
                            >
                                Đăng nhập
                            </motion.strong>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Register;
