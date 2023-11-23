import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";

import "./login.scss";
import { Rule } from "antd/lib/form";
import { motion } from "framer-motion";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import { registerRequest } from "../../redux/controller";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
interface MyProps {
    isOpenModal: boolean;
    toggleRegisterModal: () => void;
    toggleLoginModal: () => void;
    handleCancelModal: () => void;
}
const regexPhoneNumber = /^0(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/;
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const regexPass =
    /^.{6,}$/;

const Register = (props: MyProps) => {
    const [userNameReq, setUserNameReq] = useState<string>("");
    const [userNumberPhoneReq, setUserNumberPhoneReq] = useState<string>("");
    const [userEmailReq, setUserEmailReq] = useState<string>("");
    const [userPassReq, setUserPassReq] = useState<string>("");
    const [userConfirmPassReq, setUserConfirmPassReq] = useState<string>("");
    const [checkReqBtn, setCheckReqBtn] = useState<boolean>(false);
    const dispatch = useDispatchRoot();
    const [checked, setChecked] = useState<boolean>(false);
    const { registerSuccess } = useSelectorRoot((state) => state.login);

    useEffect(() => {
        userNameReq &&
            regexPhoneNumber.test(userNumberPhoneReq) &&
            regexEmail.test(userEmailReq) &&
            userPassReq.length >= 6 &&
            userConfirmPassReq === userPassReq &&
            checked
            ? setCheckReqBtn(true)
            : setCheckReqBtn(false);
    }, [
        userNameReq,
        userNumberPhoneReq,
        userEmailReq,
        userPassReq,
        userConfirmPassReq,
        checked,
    ]);

    const handleInputNameReqChange = (event: { target: { value: any } }) => {
        setUserNameReq(event.target.value);
    };
    const handleInputPhoneNumberReqChange = (event: {
        target: { value: any };
    }) => {
        setUserNumberPhoneReq(event.target.value);
    };
    const handleInputEmailReqChange = (event: { target: { value: any } }) => {
        setUserEmailReq(event.target.value);
    };
    const handleInputPassReqChange = (event: { target: { value: any } }) => {
        setUserPassReq(event.target.value);
    };
    const handleInputConfirmPassReqChange = (event: {
        target: { value: any };
    }) => {
        setUserConfirmPassReq(event.target.value);
    };

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
        const bodyrequest = {
            email: account.emailReg,
            password: account.passwordReq,
            confirmPassword: account.confirmPasswordReq,
            name: account.nameReg,
            phone: account.phoneNumberReg,
            address: "string",
            dob: "2023-04-11T04:18:58.326Z",
            gender: true,
            additionalProp1: {}
        };
        dispatch(registerRequest(bodyrequest));
    };

    const handleChangeCheckBox = (event: CheckboxChangeEvent) => {
        console.log(`checked = ${event.target.checked}`);
        setChecked(event.target.checked);
    }

    useEffect(() => {
        if (registerSuccess) {
            props.toggleLoginModal()
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
                                onChange={handleInputNameReqChange}
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
                                onChange={handleInputPhoneNumberReqChange}
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
                                onChange={handleInputEmailReqChange}
                            />
                        </Form.Item>
                        <div className="check-label">
                            Mỗi email chỉ được đăng ký 1 tài khoản.
                        </div>
                    </div>
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
                                onChange={handleInputPassReqChange}
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
                                onChange={handleInputConfirmPassReqChange}
                            />
                        </Form.Item>
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
                            {checkReqBtn ? (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button active"
                                >
                                    Đăng ký
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    Đăng ký
                                </Button>
                            )}
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
