/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import {
    DownOutlined,
    SearchOutlined,
    ShoppingCartOutlined
} from "@ant-design/icons";
import {
    Avatar,
    Badge,
    Button,
    Drawer,
    Dropdown,
    Input,
    MenuProps
} from "antd";
import { useEffect, useState } from "react";
import "./styles.header.scss";
// import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
// import CRegisterModal from './CRegisterModal';
import { MenuOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { ICurrentSearchValue } from "../../common/sketch.interface";
import Utils from "../../common/utils";
import { ROLE } from "../../enum/role.enum";
import Logo from "../../images/header/logo.png";
import UserIcon from "../../images/user_icon.png";
import Login from "../../pages/login/Login";
import Register from "../../pages/login/Register";
import {
    advancedSearchingRequest,
    getAllSketchInCartRequest,
    getSketchQuantityInCartRequest,
    resetCurrentSearchValueRequest,
} from "../../redux/controller";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";

interface MyProps {
    // setIsLogout: React.Dispatch<React.SetStateAction<boolean>>
}

// Phần header của trang web
export const CHeader = (props: MyProps) => {
    const [visible, setVisible] = useState(false); // Biến thể hiện nút thu gọn menu có đang mở hay không
    const [current, setCurrent] = useState<string>("1"); // Biến thể hiện giá trị cho nút hiện tại
    const { accesstokenExpỉred, userName } = useSelectorRoot((state) => state.login);
    const { sketchsQuantityInCart } = useSelectorRoot((state) => state.sketch);


    const navigate = useNavigate();
    const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false); // Biến kiểm tra đang mở modal login hay chưa
    const [isOpenRegisterModal, setIsOpenRegisterModal] = useState<boolean>(false); // Biến kiểm tra đang mở modal registration hay chưa
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const { currentSearchValue } = useSelectorRoot((state) => state.sketch);
    const dispatch = useDispatchRoot();
    const { userRole } = useSelectorRoot((state) => state.login); // Biến kiểm tra xem user có phải là admin hay không
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);
    const [isShowLogin, setIsShowLogin] = useState<boolean>(false); // Biến kiểm tra xem user có phải là admin hay không
    const [isShowSearch, setIsShowSearch] = useState<boolean>(false); // Biến kiểm tra xem user có phải là admin hay không
    const [isShowNavibar, setIsShowNavibar] = useState<boolean>(false); // Biến kiểm tra xem user có phải là admin hay không
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);
        if (window.innerWidth > 1000) {
            setIsShowLogin(false);
            setIsShowSearch(false);
            setIsShowNavibar(false);
        }
        if (window.innerWidth <= 1000) {
            setIsShowLogin(true);
            setIsShowSearch(true);
            setIsShowNavibar(false);
        }
        if (window.innerWidth <= 700) {
            setIsShowLogin(true);
            setIsShowSearch(true);
            setIsShowNavibar(true);
        }

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });

    useEffect(() => {
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [navigate]);

    useEffect(() => {
        if (window.location.pathname === "/test") setCurrent("2");
        if (window.location.pathname === "/news") setCurrent("3");
        if (window.location.pathname === "/about_us") setCurrent("4");
        if (window.location.pathname === "/") setCurrent("1");
    }, []);

    useEffect(() => {
        let checkLogin = localStorage.getItem("token")
            ? localStorage.getItem("token")
            : "";
        if (checkLogin) {
            setIsLogin(true);
        }
    }, []);

    useEffect(() => {
        console.log(isLogin);
        if (accesstokenExpỉred === false) {
            dispatch(getSketchQuantityInCartRequest());
        }

    }, [accesstokenExpỉred])

    // Kiểm tra xem đường dẫn đang là gì để set thuộc tính đã click cho header

    // Hiển thị ra nút thu gọn menu
    const showDrawer = () => {
        setVisible(true);
    };

    // Đóng nút thu gọn menu
    const onClose = () => {
        setVisible(false);
    };
    const onClickLogout = () => {
        Utils.removeItemLocalStorage("token");
        Utils.removeItemLocalStorage("userMail");
        Utils.removeItemLocalStorage("userName");
        Utils.removeItemLocalStorage("userPhone");
        Utils.removeItemLocalStorage("role");

        Utils.removeItemLocalStorage("refresh_token");
        setIsLogin(!isLogin);
        navigate("/")
        window.location.reload();
    };
    const items: MenuProps["items"] = [
        {
            key: "4",
            label: (
                <Link to="/" onClick={onClickLogout}>
                    Đăng xuất
                </Link>
            ),
        },
    ];

    const handleClickLogin = () => {
        // navigate('/login');
    };

    // Hàm chuyển đổi trạng thái đóng mở modal login
    const toggleLoginModal = () => {
        setIsOpenLoginModal(!isOpenLoginModal);
        setIsOpenRegisterModal(!isOpenRegisterModal);
    };
    // Hàm chuyển đổi trạng thái đóng mở modal registration
    const toggleRegisterModal = () => {
        setIsOpenLoginModal(!isOpenLoginModal);
        setIsOpenRegisterModal(!isOpenRegisterModal);
    };

    const handleCancelModal = () => {
        setIsOpenLoginModal(false);
        setIsOpenRegisterModal(false);
    }
    const handleSearching = (event: any) => {
        console.log(event);
        const bodyrequest: ICurrentSearchValue = {
            name: event.target.value,
            architecture: currentSearchValue.architecture,
            tool: currentSearchValue.tool,
            style: currentSearchValue.style,
        };
        if (window.location.pathname === '/') { // Nếu đang ở trang chủ thì reset biến lưu thông tin tìm kiếm

            dispatch(resetCurrentSearchValueRequest(bodyrequest))
        } else {
            dispatch(advancedSearchingRequest(bodyrequest));
        }
        navigate("/searching");
        onClose();
    };

    const checkIsLogin = (val: boolean) => {
        setIsLogin(val);
    };
    const handleClickCart = () => {
        dispatch(getAllSketchInCartRequest());
        if (userRole === 'seller') {

            navigate("/seller/cart");
        } else if (userRole === 'user') {
            navigate("/buyer/cart");

        }
        else {
            navigate("/");

        }
    };

    // Hàm xử lý khi click vào avatar
    const onClickAvatar = () => {
        userRole === ROLE.BUYER ? navigate('/buyer') : navigate('/seller')
    }

    return (
        <div className="header">
            <div className="main-header">
                <div className="header-left">
                    <div className="header-logo">
                        <Link to={"/"} className="logo-text">
                            <img src={Logo} />
                            <div className="text-logo">Vro Group</div>
                        </Link>
                    </div>

                </div>

                <div className="header-action-type">
                    <div className="header-action-item active">
                        Trang chủ
                    </div>
                    <div className="header-action-item">
                        Về chúng tôi
                    </div>
                    <div className="header-action-item">
                        Sứ mệnh
                    </div>
                    <div className="header-action-item">
                        Sự kết nối
                    </div>
                    <div className="header-action-item">
                        Liên hệ
                    </div>
                </div>

                <div className="header-right">
                    <div className={`header-content-input ${isLogin && "login"}`}>
                        <Input
                            className="search-input"
                            placeholder="Tìm kiếm bản vẽ"
                            onPressEnter={handleSearching}
                        />
                    </div>
                    <div className="user-infor">
                        {accesstokenExpỉred === true ? (
                            <>
                                <motion.div
                                    className="header-button login"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ marginRight: "10px" }}
                                >
                                    <Button
                                        onClick={() => setIsOpenLoginModal(true)}>
                                        Đăng nhập
                                    </Button>
                                </motion.div>
                                <motion.div
                                    className="header-button login"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        onClick={() => setIsOpenRegisterModal(true)}
                                    >
                                        Đăng ký
                                    </Button>

                                </motion.div>
                            </>
                        ) : (
                            <>
                                <div className="icon-group">
                                    <Badge
                                        count={sketchsQuantityInCart}
                                        size="default"
                                    >
                                        <ShoppingCartOutlined
                                            onClick={handleClickCart}
                                        />
                                    </Badge>
                                </div>
                                <div className="user-info-content" onClick={() => onClickAvatar()}>
                                    <Avatar className="avatar" src={UserIcon} />
                                    <div className="name-and-balance">
                                        <div className="name">{userName}</div>
                                    </div>
                                    <Dropdown
                                        className="drop-down"
                                        menu={{ items }}
                                        placement="bottomLeft"
                                        arrow
                                    >
                                        <DownOutlined />
                                    </Dropdown>
                                </div>
                            </>
                        )}
                        <Login
                            checkIsLogin={checkIsLogin}
                            isOpenModal={isOpenLoginModal}
                            toggleLoginModal={toggleLoginModal}
                            toggleRegisterModal={toggleRegisterModal}
                            handleCancelModal={handleCancelModal}
                        />
                        <Register
                            isOpenModal={isOpenRegisterModal}
                            toggleLoginModal={toggleLoginModal}
                            toggleRegisterModal={toggleRegisterModal}
                            handleCancelModal={handleCancelModal}
                        />
                    </div>
                    <>
                        <Button
                            className={`menubtn + ${isLogin ? "login" : ""}`}
                            shape="circle"
                            icon={<MenuOutlined />}
                            onClick={showDrawer}
                        ></Button>
                        <Drawer
                            title={
                                <div className="header-logo">
                                    <Link to={"/"} className="logo-text">
                                        Vro Group
                                    </Link>
                                </div>
                            }
                            placement="right"
                            onClose={onClose}
                            visible={visible}
                        >
                            <div
                                style={{ display: "flex", flexDirection: "column" }}
                            >
                                {(!isLogin && isShowLogin) && (
                                    <Button className="drawer-button"
                                        onClick={() => {
                                            setIsOpenRegisterModal(true)
                                            onClose()
                                        }}
                                    >
                                        Đăng ký
                                    </Button>
                                )}
                                {isShowSearch &&
                                    <div className={`header-content-input draw `}>
                                        <Input
                                            className="search-input"
                                            placeholder="Tìm kiếm bản vẽ"
                                            onPressEnter={handleSearching}
                                        />
                                    </div>
                                }
                                {
                                    isShowNavibar &&
                                    <div className="header-action-type">
                                        <div className="header-action-item">
                                            Trang chủ
                                        </div>
                                        <div className="header-action-item">
                                            Về chúng tôi
                                        </div>
                                        <div className="header-action-item">
                                            Sứ mệnh
                                        </div>
                                        <div className="header-action-item">
                                            Sự kết nối
                                        </div>
                                        <div className="header-action-item">
                                            Liên hệ
                                        </div>
                                    </div>
                                }
                            </div>
                        </Drawer>
                    </>
                </div>

                {/* } */}
            </div >

        </div >
    );
};