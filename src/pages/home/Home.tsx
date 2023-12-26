/* eslint-disable jsx-a11y/iframe-has-title */
import {
    ArrowLeftOutlined,
    ArrowRightOutlined
} from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.home.scss";



import { ICurrentSearchValue, IFilteredSketch, IReqGetLatestSketchs } from "../../common/sketch.interface";
import CProductCard from "../../components/ProductCard/CProductCard";
import HomepageFooter from '../../images/homepage/A-Gastronomic-Journey-Through-Hvars-Finest-Restaurants.webp';
import CEO from '../../images/homepage/CEO.png';
import Company1 from '../../images/homepage/company.png';
import ExcellentArchitect1 from "../../images/homepage/excellentArchitect1.png";
import ExcellentArchitect2 from "../../images/homepage/excellentArchitect2.png";
import ExcellentArchitect3 from "../../images/homepage/excellentArchitect3.png";
import ExcellentArchitect4 from "../../images/homepage/excellentArchitect4.png";
import IntroImage from "../../images/homepage/intropic.jpg";
import StyleList1 from "../../images/homepage/styleList1.png";
import StyleList2 from "../../images/homepage/styleList2.png";
import StyleList3 from "../../images/homepage/styleList3.png";
import {
    advancedSearchingRequest,
    getAllArchitecturesRequest,
    getHomeListSketchRequest
} from "../../redux/controller";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import Login from "../login/Login";
import Register from "../login/Register";
import "./styles.home.scss";
interface CardData {
    id: number;
    title: string;
    type: string;
    price: number;
    view: number;
    imageUrl: string;
}

// Phần trang chủ của trang web
const Home = () => {
    const { latestSketchsList, mostViewedSketchList, freeSketchList, cloneArchitecturelist, filteredSketchs, cloneStyleList, currentSearchValue } = useSelectorRoot(
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

    const [cloneFilteredSketchs, setCloneFilteredSketchs] = useState<IFilteredSketch[]>([]);



    const [currentIndexFreeSketch, setCurrentIndexFreeSketch] = useState(0);
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    // useEffect(()=> {
    //     let lastSketch = 
    //         {
    //             _id: 'last',
    //             title: '',
    //             price: -1,
    //             views: 56,
    //             category: '',
    //             image: SeeMore,
    //         }
    //     ;
    //     setCloneFilteredSketchs([...filteredSketchs,lastSketch])
    // },[filteredSketchs])

    const excellentArchitect = [
        {
            imageUrl: ExcellentArchitect1,
        },
        {
            imageUrl: ExcellentArchitect2,
        },
        {
            imageUrl: ExcellentArchitect3,
        },
        {
            imageUrl: ExcellentArchitect4,
        },
    ]

    const styleList = [
        {
            imageUrl: StyleList1,
            name: 'Phong cách hiện đại',
            id: '64231026edf9dd11e488c250'
        },
        {
            imageUrl: StyleList2,
            name: 'Phong cách cổ điển',
            id: '64231026edf9dd11e488c251'
        },
        {
            imageUrl: StyleList3,
            name: 'Phong cách hiện đại',
            id: '64231026edf9dd11e488c252'
        },
        {
            imageUrl: StyleList1,
            name: 'Phong cách hiện đại',
            id: '64231026edf9dd11e488c253'
        },
        {
            imageUrl: StyleList2,
            name: 'Phong cách cổ điển',
            id: '64231026edf9dd11e488c254'
        },
        {
            imageUrl: StyleList3,
            name: 'Phong cách hiện đại',
            id: '64231026edf9dd11e488c255'
        }
    ]

    const companyList = [
        {
            imageUrl: Company1,

        },
        {
            imageUrl: Company1,

        },
        {
            imageUrl: Company1,

        },
        {
            imageUrl: Company1,

        },
    ]

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
        const bodyrequest: IReqGetLatestSketchs = {
            size: 50,
            offset: 0,
        };
        dispatch(getHomeListSketchRequest());
        dispatch(getAllArchitecturesRequest());
        handleSearch('64231026edf9dd11e488c250');
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

    const handleClickCategory = () => {

    }

    const handleClickCard = (sketchId: string) => {
        console.log("sketchId", sketchId);
        if(sketchId === 'last'){
            const bodyrequest: ICurrentSearchValue = {
                name: '',
                architecture: currentSearchValue.architecture,
                tool: currentSearchValue.tool,
                style: currentSearchValue.style,
            };
            dispatch(advancedSearchingRequest(bodyrequest));
            navigate("/searching");
        }else{
            navigate(`/detail-food/${sketchId}`);
        }

    };

    const onClickCategory = (architectureId: string) => {
        const bodyrequest: ICurrentSearchValue = {
            name: '',
            architecture: architectureId,
            tool: '',
            style: '',
        };
        dispatch(advancedSearchingRequest(bodyrequest))
        navigate("/searching");
    }

    const handleSearch = (param: string) => {
        console.log(param);
        const bodyrequest = {
            size: 7,
            architecture: param,
            name: '', // Lay ra gia tri text luu trong redux
        };
        console.log(bodyrequest);

        dispatch(advancedSearchingRequest(bodyrequest));
    };

    useEffect(() => {
        console.log("currentSearchValue", currentSearchValue);

    }, [currentSearchValue]);

    const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false); // Biến kiểm tra đang mở modal login hay chưa
    const [isOpenRegisterModal, setIsOpenRegisterModal] = useState<boolean>(false); // Biến kiểm tra đang mở modal registration hay chưa
    const [isLogin, setIsLogin] = useState<boolean>(false);

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
                    <div className="sub-title">
                        <Col>
                            <Button
                                icon={<ArrowLeftOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('prev', 'mostView')}
                                disabled={currentIndexMostViewedSketch === 0 && true}
                            />
                        </Col>
                        <Col>
                            <Button
                                icon={<ArrowRightOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('next', 'mostView')}
                                disabled={
                                    currentIndexMostViewedSketch >= mostViewedSketchList.length - numberOfCardShow && true
                                }
                            />
                        </Col>
                    </div>
                </div>
                <div className={"lst-tool " + ((mostViewedSketchList && mostViewedSketchList.length < numberOfCardShow) && 'less-card')}>
                    <Row gutter={[16, 16]}>
                        {mostViewedSketchList
                            .slice(
                                currentIndexMostViewedSketch,
                                currentIndexMostViewedSketch + numberOfCardShow
                            )
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
