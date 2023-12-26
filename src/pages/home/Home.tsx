/* eslint-disable jsx-a11y/iframe-has-title */
import { Button, Col, Row } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CProductCard from "../../components/ProductCard/CProductCard";
import HomepageFooter from '../../images/homepage/A-Gastronomic-Journey-Through-Hvars-Finest-Restaurants.webp';
import CEO from '../../images/homepage/CEO.png';
import IntroImage from "../../images/homepage/intropic.jpg";
import {
    getAllArchitecturesRequest,
    getHomeListSketchRequest
} from "../../redux/controller";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import Login from "../login/Login";
import Register from "../login/Register";
import "./styles.home.scss";


// Phần trang chủ của trang web
const Home = () => {
    const { mostViewedSketchList } = useSelectorRoot(
        (state) => state.sketch
    ); // Lst cac ban ve

    const dispatch = useDispatchRoot();

    const navigate = useNavigate();
    const [spanCol, setSpanCol] = useState<number>(6);
    const [numberOfCardShow, setNumberOfCardShow] = useState<number>(10);
    const [numberOfCardNext, setNumberOfCardNext] = useState<number>(10);
    const [currentIndexMostViewedSketch, setCurrentIndexMostViewedSketch] = useState(0);
    const [currentIndexLatestSketch, setCurrentIndexLatestSketch] = useState(0);
    const [currentIndexArchitect, setCurrentIndexArchitect] = useState(0);
    const [currentIndexCompany, setCurrentIndexCompany] = useState(0);
    const [currentIndexFilteredSketch, setCurrentIndexFilteredSketch] = useState(0);
    const [currentIndexStyle, setCurrentIndexStyle] = useState(0);
    const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false); // Biến kiểm tra đang mở modal login hay chưa
    const [isOpenRegisterModal, setIsOpenRegisterModal] = useState<boolean>(false); // Biến kiểm tra đang mở modal registration hay chưa
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [currentIndexFreeSketch, setCurrentIndexFreeSketch] = useState(0);
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [navigate]);


    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);
        if (window.innerWidth > 1000) {
            setSpanCol(6);
            setNumberOfCardShow(4);
        }
        if (window.innerWidth <= 1000) {
            setSpanCol(8);
            setNumberOfCardShow(3);
            setNumberOfCardNext(5);
        }
        if (window.innerWidth <= 800) {
            setSpanCol(12);
            setNumberOfCardShow(2);
            setNumberOfCardNext(6);
        }
        if (window.innerWidth <= 600) {
            setSpanCol(24);
            setNumberOfCardShow(100);
            setNumberOfCardNext(7);
        }
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });

    useEffect(() => {
        dispatch(getHomeListSketchRequest());
        dispatch(getAllArchitecturesRequest());
    }, []);

    const handlePagination = (direction: string, type: string) => {
        if (direction === 'prev') {
            switch (type) {
                case 'mostView':
                    setCurrentIndexMostViewedSketch(currentIndexMostViewedSketch - 1);

                    break;
                case 'free':
                    setCurrentIndexFreeSketch(currentIndexFreeSketch - 1);

                    break;
                case 'latest':
                    setCurrentIndexLatestSketch(currentIndexLatestSketch - 1);
                    break;
                case 'filtered':
                    setCurrentIndexFilteredSketch(currentIndexFilteredSketch - 1);
                    break;
                case 'style':
                    setCurrentIndexStyle(currentIndexStyle - 1);
                    break;
                case 'architect':
                    setCurrentIndexArchitect(currentIndexArchitect - 1);
                    break;
                case 'company':
                    setCurrentIndexCompany(currentIndexCompany - 1);
                    break;
                default:
                    break;
            }
        } else {
            switch (type) {
                case 'mostView':
                    setCurrentIndexMostViewedSketch(currentIndexMostViewedSketch + 1);

                    break;
                case 'free':
                    setCurrentIndexFreeSketch(currentIndexFreeSketch + 1);

                    break;
                case 'latest':
                    setCurrentIndexLatestSketch(currentIndexLatestSketch + 1);

                    break;
                case 'filtered':
                    setCurrentIndexFilteredSketch(currentIndexFilteredSketch + 1);
                    break;
                case 'style':
                    setCurrentIndexStyle(currentIndexStyle + 1);
                    break;
                case 'architect':
                    setCurrentIndexArchitect(currentIndexArchitect + 1);
                    break;
                case 'company':
                    setCurrentIndexCompany(currentIndexCompany + 1);
                    break;
                default:
                    break;
            }
        }
    }

    const handleClickCard = (sketchId: string) => {
        navigate(`/detail-food/${sketchId}`);

    };

    const checkIsLogin = (val: boolean) => {
        setIsLogin(val);
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
    return (
        <motion.div
            className="main-home"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
        >


            <div className='header-homepage'>
                <div className="left-header">
                    <div className="slogan">
                        BangLunch,<br />
                        Thiên đường ẩm thực.
                    </div>
                    <div className="sub-slogan">Tiết kiệm thời gian, cam kết phù hợp khẩu vị bất cứ ai. 
                    </div>
                    <div className="button-group">
                        {!isLogin &&
                            <Button className="login-button" onClick={() => setIsOpenRegisterModal(true)}>Đăng ký ngay</Button>
                        }
                        <Login
                            checkIsLogin={checkIsLogin}
                            isOpenModal={isOpenLoginModal}
                            toggleLoginModal={toggleLoginModal}
                            toggleRegisterModal={toggleRegisterModal}
                            handleCancelModal={handleCancelModal}
                        />
                        <Register
                            isOpenModal={isOpenRegisterModal}
                            setIsOpenRegisterModal={setIsOpenRegisterModal}
                            toggleLoginModal={toggleLoginModal}
                            toggleRegisterModal={toggleRegisterModal}
                            handleCancelModal={handleCancelModal}
                        />
                    </div>
                </div>
                <div className="right-header">
                    <img src={IntroImage} />
                </div>
            </div>


            {/* món ăn bán chạy */}
            <div className="tool-of-web">
                <div className="title">
                    <div>MÓN ĂN MỚI</div>
                </div>
                <div className={"lst-tool " + ((mostViewedSketchList && mostViewedSketchList.length < numberOfCardShow) && 'less-card')}>
                    <Row gutter={[16, 16]}>
                        {mostViewedSketchList
                            .map((card) => (
                                <Col
                                    onClick={() => {
                                        handleClickCard(card._id);
                                    }}
                                    span={spanCol}
                                    key={card._id}
                                >
                                    <CProductCard
                                        imageUrl={ card.galleries.length > 0 ? card.galleries[0].filePath : ''}
                                        title={card.title}
                                        views={card.views}
                                        price={card.price}
                                        category={card.category}
                                    />
                                </Col>
                            ))}
                    </Row>

                </div>
            </div>


            <div className='homepage-footer'>
                <div className="left-footer">
                    <div className="slogan">
                        <div>Lời chào từ BangLunch <strong>”</strong></div>
                    </div>
                    <div className="wellcome">
                        Công ty BangLunch xin gửi lời chào trân trọng đến Quý khách hàng. 

BangLunch là một trong những doanh nghiệp kinh doanh online với quy mô lớn và uy tín tại Việt Nam với kinh nghiệm 20 năm, nhân sự trên 400 người. 

Trải qua hơn 20 năm kinh nghiệm hoạt động, công ty đã không ngừng khẳng định vị thế thương hiệu trên thị trường và niềm tin đối với khách hàng. Hiện nay dịch vụ kinh doanh đồ ăn online của công ty đã được sử dụng tại hơn 30 quốc gia và vùng lãnh thổ, cùng với hệ thống máy chủ phân phối rộng khắp trong cả nước. 

                    </div>
                    <div className="info">
                        <img src={CEO} />
                        <div className="more">
                            <div className="name-more">Austin Do</div>
                            <div className="content-more">Chủ tịch hội đồng quản trị BangLunch</div>
                        </div>
                    </div>
                </div>
                <div className="right-footer">
                    <img src={HomepageFooter} />
                </div>
            </div>

        </motion.div>
    );
};

export default Home;
