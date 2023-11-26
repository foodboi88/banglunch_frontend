/* eslint-disable jsx-a11y/iframe-has-title */
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    RightOutlined
} from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.home.scss";

import Style1 from '../../images/homepage/Roma-1.1.jpg';
import SeeMore from '../../images/homepage/discovermore2.png';


import { Carousel } from 'antd';
import { ICurrentSearchValue, IFilteredSketch, IReqGetLatestSketchs } from "../../common/sketch.interface";
import CArchitectCard from "../../components/CArchitectCard/CArchitectCard";
import CStyleCard from "../../components/CStyleCard/CStyleCard";
import CDeclare from "../../components/Declare/CDeclare";
import CProductCard from "../../components/ProductCard/CProductCard";
import CEO from '../../images/homepage/CEO.png';
import Company1 from '../../images/homepage/company.png';
import Declare1 from '../../images/homepage/declare2.jpg';
import ExcellentArchitect1 from "../../images/homepage/excellentArchitect1.png";
import ExcellentArchitect2 from "../../images/homepage/excellentArchitect2.png";
import ExcellentArchitect3 from "../../images/homepage/excellentArchitect3.png";
import ExcellentArchitect4 from "../../images/homepage/excellentArchitect4.png";
import HomepageFooter from '../../images/homepage/homepage-footer.png';
import IntroImage from "../../images/homepage/introImage.png";
import StyleList1 from "../../images/homepage/styleList1.png";
import StyleList2 from "../../images/homepage/styleList2.png";
import StyleList3 from "../../images/homepage/styleList3.png";
import {
    advancedSearchingRequest,
    getAllArchitecturesRequest,
    getAllStylesRequest,
    getAllToolsRequest,
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

    useEffect(()=> {
        let lastSketch = 
            {
                _id: 'last',
                title: '',
                price: -1,
                views: 56,
                category: '',
                image: SeeMore,
            }
        ;
        setCloneFilteredSketchs([...filteredSketchs,lastSketch])
    },[filteredSketchs])

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
        dispatch(getAllToolsRequest(bodyrequest));
        dispatch(getAllArchitecturesRequest(bodyrequest));
        dispatch(getAllStylesRequest(bodyrequest));
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
            navigate(`/detail-sketch/${sketchId}`);
        }
        // setTimeout(() => {
        //     window.location.reload();
        // }, 500);

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
                        Ngôi nhà của tôi,<br />
                        Phong cách của tôi.
                    </div>
                    <div className="sub-slogan">Kho bản vẽ với đa dạng chủng loại, là sản phẩm tâm huyết từ các Công ty xây dựng và Kiến trúc sư trên khắp Việt Nam.
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


            {/* Filter bản vẽ đầu trang */}
            <div className="tool-of-web">
                <div className="title">
                    <div className="category-list">
                        {
                            cloneArchitecturelist &&
                            cloneArchitecturelist.map(item => (
                                <Button
                                    className={'category-item ' + (currentSearchValue.architecture === item.id ? 'active' : '')}
                                    onClick={() => {
                                        handleSearch(item.id)
                                    }}
                                >
                                    {item.name}
                                </Button>
                            ))
                        }
                    </div>
                    <div className="sub-title">
                        {
                            cloneFilteredSketchs &&
                            <>
                                <Col>
                                    <Button
                                        icon={<ArrowLeftOutlined />}
                                        className="btn-icon"
                                        onClick={() => handlePagination('prev', 'filtered')}
                                        disabled={currentIndexFilteredSketch === 0 && true}
                                    />
                                </Col>
                                <Col>
                                    <Button
                                        icon={<ArrowRightOutlined />}
                                        className="btn-icon"
                                        onClick={() => handlePagination('next', 'filtered')}
                                        disabled={
                                            currentIndexFilteredSketch >= cloneFilteredSketchs.length - numberOfCardShow && true
                                        }
                                    />
                                </Col>
                            </>
                        }
                    </div>
                </div>
                <div className={"lst-tool " + ((filteredSketchs && filteredSketchs.length < numberOfCardShow) && 'less-card')}>
                    <Row gutter={[16, 16]}>
                        {cloneFilteredSketchs && cloneFilteredSketchs
                            .slice(
                                currentIndexFilteredSketch,
                                currentIndexFilteredSketch + numberOfCardShow
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
                                        imageUrl={card.image}
                                        title={card.title}
                                        views={card.views}
                                        price={card.price}
                                        category={card.category}
                                    // type={card.type}
                                    />
                                </Col>
                            ))
                        }
                    </Row>

                </div>
            </div>

            {/* Danh sách phong cách */}
            <div className="tool-of-web">
                <div className="title">
                    <div>PHONG CÁCH</div>
                    <div className="sub-title">
                        <Col>
                            <Button
                                icon={<ArrowLeftOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('prev', 'style')}
                                disabled={currentIndexStyle === 0 && true}
                            />
                        </Col>
                        <Col>
                            <Button
                                icon={<ArrowRightOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('next', 'style')}
                                disabled={
                                    currentIndexStyle >= cloneStyleList.length - numberOfCardShow && true
                                    // currentIndexStyle >= styleList.length - numberOfCardShow && true
                                }
                            />
                        </Col>
                    </div>
                </div>
                <div className={"lst-tool " + ((cloneStyleList && cloneStyleList.length < numberOfCardShow) && 'less-lst')}>
                    <Row gutter={[16, 16]}>
                        {cloneStyleList
                            .slice(
                                currentIndexStyle,
                                currentIndexStyle + numberOfCardShow
                            )
                            .map((card) => (
                                <Col
                                    span={spanCol}
                                    key={card.name}
                                >
                                    <CStyleCard
                                        imageUrl={card.imageUrl}
                                        name={card.name}
                                        id={card.id}
                                    />
                                </Col>
                            ))}
                    </Row>
                </div>

            </div>

            <CDeclare
                content="Chỉnh sửa thiết kế theo yêu cầu"
                imageUrl={Declare1}
            />

            {/* Top kiến trúc sư */}
            <div className="tool-of-web">
                <div className="title">
                    <div>KIẾN TRÚC SƯ</div>
                    <div className="sub-title">
                        <Col>
                            <Button
                                icon={<ArrowLeftOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('prev', 'architect')}
                                disabled={currentIndexArchitect === 0 && true}
                            />
                        </Col>
                        <Col>
                            <Button
                                icon={<ArrowRightOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('next', 'architect')}
                                disabled={
                                    currentIndexArchitect >= excellentArchitect.length - numberOfCardShow && true
                                }
                            />
                        </Col>
                    </div>
                </div>
                <div className="lst-tool architect-card">
                    <Row gutter={[16, 16]}>
                        {excellentArchitect
                            .slice(
                                currentIndexArchitect,
                                currentIndexArchitect + numberOfCardShow
                            )
                            .map((card, index) => (
                                <Col
                                    // onClick={() => {
                                    //     handleClickCard(card.id);
                                    // }}
                                    span={spanCol}
                                    key={index}
                                >
                                    <CArchitectCard
                                        imageUrl={card.imageUrl}
                                        name={''}
                                        type="excellentArchitect"
                                        index={index + 1}
                                    />
                                </Col>
                            ))}
                    </Row>

                </div>
            </div>

            {/* Công ty bán bản vẽ */}
            <div className="tool-of-web">
                <div className="title">
                    <div>CÔNG TY X Y DỰNG – KIẾN TRÚC
                    </div>
                    <div className="sub-title">
                        <Col>
                            <Button
                                icon={<ArrowLeftOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('prev', 'company')}
                                disabled={currentIndexCompany === 0 && true}
                            />
                        </Col>
                        <Col>
                            <Button
                                icon={<ArrowRightOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('next', 'company')}
                                disabled={
                                    currentIndexCompany >= companyList.length - numberOfCardShow && true
                                }
                            />
                        </Col>
                    </div>
                </div>
                <div className="lst-tool architect-card">

                    <Row gutter={[16, 16]}>
                        {companyList
                            .slice(
                                currentIndexCompany,
                                currentIndexCompany + numberOfCardShow
                            )
                            .map((card) => (
                                <Col
                                    // onClick={() => {
                                    //     handleClickCard(card.id);
                                    // }}
                                    span={spanCol}
                                >
                                    <CStyleCard
                                        imageUrl={card.imageUrl}
                                        name={''}
                                        id={''}
                                    />
                                    {/* <img */}
                                    {/* src={card.imageUrl} */}
                                    {/* /> */}
                                </Col>
                            ))}
                    </Row>

                </div>
            </div>

            <CDeclare
                content="Bản vẽ miễn phí cho bạn"
                imageUrl={Declare1}

            />

            {/* Bản vẽ bán chạy */}
            <div className="tool-of-web">
                <div className="title">
                    <div>BẢN VẼ BÁN CHẠY</div>
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
                                        imageUrl={card.image}
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

            {/* Bản vẽ miễn phí */}
            <div className="tool-of-web">
                <div className="title">
                    <div>BẢN VẼ MIỄN PHÍ</div>
                    <div className="sub-title">
                        <Col>
                            <Button
                                icon={<ArrowLeftOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('prev', 'free')}
                                disabled={currentIndexFreeSketch === 0 && true}
                            />
                        </Col>

                        <Col>
                            <Button
                                icon={<ArrowRightOutlined />}
                                className="btn-icon"
                                onClick={() => handlePagination('next', 'free')}
                                disabled={
                                    currentIndexFreeSketch >= freeSketchList.length - numberOfCardShow && true
                                }
                            />
                        </Col>
                    </div>
                </div>
                {freeSketchList.length > 0 &&
                    <div className={"lst-tool " + ((freeSketchList && freeSketchList.length < numberOfCardShow) && 'less-card')}>

                        <Row gutter={[16, 16]}>
                            {freeSketchList
                                .slice(
                                    currentIndexFreeSketch,
                                    currentIndexFreeSketch + numberOfCardShow
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
                                            imageUrl={card.image}
                                            title={card.title}
                                            views={card.views}
                                            price={card.price}
                                            category={card.category}
                                        />
                                    </Col>
                                ))}
                        </Row>
                    </div>
                }
            </div>
            <div className='homepage-footer'>
                <div className="left-footer">
                    <div className="slogan">
                        <div>Lời chào từ VRO <strong>”</strong></div>
                    </div>
                    <div className="wellcome">Kính gửi Quý khách hàng – những người luôn muốn đem lại những gì tốt đẹp nhất cho ngôi nhà thân yêu; Gửi các bạn Kiến trúc sư, đối tác Công ty Xây dựng đầy tâm huyết.<br />Với sứ mệnh kết nối để tạo nên những công trình tuyệt vời, VRO đã tạo nên một không gian mở giới thiệu những thiết kế và công ty Xây dựng, KTS tới khách hàng. Hãy cùng nhau xây dựng nên cộng đồng để tôn vinh cái đẹp, sự tối ưu cho những công trình thân yêu.
                    </div>
                    <div className="info">
                        <img src={CEO} />
                        <div className="more">
                            <div className="name-more">Hoàng Đức Thắng</div>
                            <div className="content-more">Chủ tịch Công ty VRO</div>
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
