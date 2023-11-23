import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { loginRequest } from "../../redux/controller/login.slice";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import "./login.scss";
import { Rule } from "antd/lib/form";
import { motion } from "framer-motion";
interface MyProps {
    isOpenModal: boolean;
    toggleLoginModal: () => void;
    toggleRegisterModal: () => void;
    checkIsLogin: (val: boolean) => void;
    handleCancelModal: () => void;
}
const regexPhoneNumber = /^0(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/;
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const regexPass =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+]).{6,}$/;
const Login = (props: MyProps) => {
    const [userEmailLogin, setUserEmailLogin] = useState<string>("");
    const [userPassLogin, setUserPassLogin] = useState<string>("");
    const [checkLoginBtn, setCheckLoginBtn] = useState<boolean>(true);
    const { accesstokenExpỉred, tokenLogin } = useSelectorRoot((state) => state.login);


    const dispatch = useDispatchRoot();

    useEffect(() => {
        console.log("tokenLogin", tokenLogin);

        if (!accesstokenExpỉred) {
            props.handleCancelModal();
            props.checkIsLogin(true);
        }
    }, [accesstokenExpỉred])

    const handleInputEmailLoginChange = (event: { target: { value: any } }) => {
        setUserEmailLogin(event.target.value);
    };

    const handleInputPassLoginChange = (event: { target: { value: any } }) => {
        setUserPassLogin(event.target.value);
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
        }
        else {
            callback();
        }
    };

    const onFinish = async (account: any): Promise<any> => { };

    const handleClickSubmit = () => {
        const bodyrequest = {
            email: userEmailLogin,
            password: userPassLogin,
            remember: true,
        };
        dispatch(loginRequest(bodyrequest));



    };


    return (
        <>
            <Modal
                title="Đăng nhập"
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
                    <div>
                        <Form.Item
                            label="Email/sdt"
                            name="emailLogin"
                            rules={[
                                {
                                    required: true,
                                    message: "Email/sdt không hợp lệ",
                                },
                            ]}
                        >
                            <Input
                                className="form-input"
                                placeholder="Nhập email/sđt"
                                onChange={handleInputEmailLoginChange}
                            />
                        </Form.Item>
                        <div className="check-label">
                            Mỗi email chỉ được đăng ký 1 tài khoản.
                        </div>
                    </div>
                    <div>
                        <Form.Item
                            label="Mật khẩu"
                            name="passwordLogin"
                            rules={[
                                {
                                    validator: passwordValidator,
                                    message:
                                        "Mật khẩu vừa nhập của bạn không chính xác. Hãy thử lại hoặc chọn “Quên mật khẩu” để đặt lại mật khẩu mới!",
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
                                onChange={handleInputPassLoginChange}
                            />
                        </Form.Item>
                        {/* <div className="check-label">
                            Mật khẩu phải lớn hơn 6 ký tự, có chữ hoa, chữ
                            thường, số và ký tự đặc biệt.
                        </div> */}
                    </div>
                    <Form.Item
                        className="remember-forgot-password"
                        name="remember"
                        valuePropName="checked"
                    >
                        <label className="label-login">
                            <Checkbox className="checkbox-login" />
                            <motion.div
                                style={{ cursor: "pointer" }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                whileFocus={{ scale: 1.1 }}
                            >
                                Nhớ mật khẩu
                            </motion.div>
                        </label>
                        <motion.div
                            className="forgot-password"
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 0.95 }}
                            whileFocus={{ scale: 1.3 }}
                        >
                            Quên mật khẩu
                        </motion.div>
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
                            {checkLoginBtn ? (

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button active"
                                    onClick={() => handleClickSubmit()}
                                >
                                    Đăng nhập
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    Đăng nhập
                                </Button>
                            )}
                        </motion.div>
                        <div className="change-to-register">
                            Bạn chưa có tài khoản ?
                            <motion.strong
                                className="register"
                                whileHover={{ scale: 1.3 }}
                                whileTap={{ scale: 0.95 }}
                                whileFocus={{ scale: 1.3 }}
                                onClick={props.toggleRegisterModal}
                            >
                                Đăng ký
                            </motion.strong>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Login;
