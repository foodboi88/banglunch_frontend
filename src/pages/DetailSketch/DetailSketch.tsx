import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Rate, Row, notification } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate, useParams } from "react-router";
import CAuthorIntroduction from "../../components/AuthorIntroduction/CAuthorIntroduction";
import CProductCard from "../../components/ProductCard/CProductCard";
import "./styles.detailsketch.scss";

import { IImagesSketch, IInFoSketch } from "../../common/sketch.interface";
import { IArchitecture, IStyle, ITool } from "../../common/tool.interface";
import IconDetail1 from "../../images/detail/icon-detail-1.png";
import IconDetail2 from "../../images/detail/icon-detail-2.png";
import IconDetail3 from "../../images/detail/icon-detail-3.png";
import IconDetail4 from "../../images/detail/icon-detail-4.png";
import IconDetail5 from "../../images/detail/icon-detail-5.png";
import IconDetail6 from "../../images/detail/icon-detail-6.png";
import DrawHomeImage1 from "../../images/homepage/home_img_1.png";
import DrawHomeImage2 from "../../images/homepage/home_img_2.png";
import DrawHomeImage3 from "../../images/homepage/home_img_3.png";
import DrawHomeImage4 from "../../images/homepage/home_img_4.png";
import {
    addSketchToCartRequest,
    getAllSketchInCartRequest,
    getDetailSketchPageContentRequest,
    getProductFilesByIdRequest,
    getRatesBySketchIdRequest,
} from "../../redux/controller";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import Utils from "../../common/utils";
import CComment from "../../components/Comment/CComment";

const DetailSketch = () => {
    const navigate = useNavigate();
    const {
        detailSketch,
        commentList,
        ratesLst,
        productsFile,
        authorIntroduction,
        lstSketchsInCart,
        checkPayment,
        checkInCart,
        latestSketchsList,
    } = useSelectorRoot((state) => state.sketch); // Lấy ra dữ liệu detail sketch và danh sách comment từ redux
    const { tokenLogin, accesstokenExpỉred } = useSelectorRoot((state) => state.login);

    const dispatch = useDispatchRoot();
    const { sketchId } = useParams(); // Lấy ra id của sketch từ url

    const [spanCol, setSpanCol] = useState<number>(6);
    const [numberOfCardShow, setNumberOfCardShow] = useState<number>(4);
    const [numberOfCardNext, setNumberOfCardNext] = useState<number>(4);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [designStyles, setDesignStyles] = useState<IStyle[]>([]);
    const [designTools, setDesignTools] = useState<ITool[]>([]);
    const [images, setImages] = useState<IImagesSketch[]>([]);
    const [info, setInfo] = useState<IInFoSketch>();
    const [typeOfArchitectures, setTypeOfArchitectures] = useState<
        IArchitecture[]
    >([]);
    const [isShowAddToCart, setIsShowAddToCart] = useState<boolean>(true);
    const [isShowDownload, setIsShowDownload] = useState<boolean>(false);
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    const [currentIndexLatestSketch, setCurrentIndexLatestSketch] = useState(0);

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
        if (sketchId) {
            dispatch(getDetailSketchPageContentRequest(sketchId));
            dispatch(getRatesBySketchIdRequest(sketchId));
            
            if(tokenLogin) {
                dispatch(getProductFilesByIdRequest(sketchId));
            }

        }
    }, [sketchId]);

    // useEffect(() => {
    //     if (sketchId) {
    //         console.log(sketchId);
    //         dispatch(getProductFilesByIdRequest(sketchId));
    //     }
    // }, [sketchId]);

    // useEffect(() => {
    //     if (lstSketchsInCart && lstSketchsInCart.length > 0) {
    //         const checkSketchInCart = lstSketchsInCart.find(sketch => sketch.id === sketchId);
    //         // console.log(checkSketchInCart);
    //         checkSketchInCart && setIsShowAddToCart(false);
    //     }
    // }, [lstSketchsInCart]);

    useEffect(() => {
        console.log(productsFile);
        if (productsFile) {
            setIsShowAddToCart(false)
            setIsShowDownload(true);
        }
        else {
            setIsShowAddToCart(true)
            setIsShowDownload(false);
        }
    }, [productsFile]);

    // Kiểm tra xem có chi tiết bản vẽ hay không
    useEffect(() => {
        if (detailSketch) {
            setDesignStyles(detailSketch.designStyles);
            setDesignTools(detailSketch.designTools);
            setImages(detailSketch.images);
            setInfo(detailSketch.info);
            setTypeOfArchitectures(detailSketch.typeOfArchitectures);
            // console.log(detailSketch);
        }
    }, [detailSketch]);

    useEffect(() => {
        if (commentList) {
            // console.log("comment list: " + commentList);
        }
    }, [commentList]);

    useEffect(() => {
        // console.log(isShowAddToCart);
    }, [isShowAddToCart])

    const handleNextCard = () => {
        setCurrentIndex(currentIndex + 1);
    };

    const handlePrevCard = () => {
        setCurrentIndex(currentIndex - 1);
    };

    const handleAddToCart = (sketchId: string) => {
        if (accesstokenExpỉred === false) {

            const req = {
                productId: sketchId,
                additionalProp1: {},
            };
            dispatch(addSketchToCartRequest(req));
        } else {
            notification.open({
                message: "Bạn chưa đăng nhập",
                description: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ!",

                onClick: () => {
                    console.log("Vui lòng đăng nhập để thêm sản phẩm vào giỏ!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        }
    };
    const handleRoutingToAuthorPage = () => {
        navigate(`/author-page/${detailSketch?.info.userId}`);
    };

    // Handle pagination latest sketch
    const handleNextCardLatestSketch = () => {
        setCurrentIndexLatestSketch(currentIndexLatestSketch + 1);
    };
    const handlePrevCardLatestSketch = () => {
        setCurrentIndexLatestSketch(currentIndexLatestSketch - 1);
    };

    const handleClickCard = (sketchId: string) => {
        console.log("sketchId", sketchId);
        navigate(`/detail-sketch/${sketchId}`);
        // setTimeout(() => {
        //     window.location.reload();
        // }, 500);

    };

    return (
        <div className="main-detail">
            <div className="breadcrumb">
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => navigate("/")}>
                        Trang chủ
                    </Breadcrumb.Item>

                    <Breadcrumb.Item className="current-link">
                        Danh sách bản vẽ nổi bật
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="detail-sketch">
                <div className="image-carousel">
                    <Carousel>
                        {images &&
                            images.slice(0, 4).map((image, index) => (
                                <div key={index}>
                                    <img alt="" src={image.filePath} />
                                </div>
                            ))}
                    </Carousel>
                </div>
                <div className="content">
                    {info &&
                        designStyles &&
                        designTools &&
                        typeOfArchitectures && (
                            <>
                                <div className="title">{info.title}</div>
                                {info.price === 0 ? (
                                    <div
                                        className="price"
                                        style={{ color: "green" }}
                                    >
                                        Miễn phí
                                    </div>
                                ) : (
                                    <div className="price">
                                        {Utils.formatMoney(info.price)} VNĐ
                                    </div>
                                )}
                                <div className="rate">
                                    {detailSketch && detailSketch.star ? (
                                        <Rate
                                            defaultValue={detailSketch.star}
                                            disabled
                                            count={5}
                                        />
                                    ) : (
                                        <Rate
                                            defaultValue={0}
                                            disabled
                                            count={5}
                                        />
                                    )}
                                </div>
                                <div className="property">
                                    <div className="content">
                                        <img src={IconDetail1} alt="" />
                                        <div className="text">
                                            Ngày đăng:{" "}
                                            {new Date(
                                                info.updatedAt
                                            ).toLocaleDateString("en-GB")}
                                        </div>
                                    </div>
                                    <div className="content">
                                        <img src={IconDetail2} alt="" />
                                        <div className="text">
                                            Phong cách:
                                            {designStyles.map((style, index) =>
                                                index ===
                                                    designStyles.length - 1 ? (
                                                    <span key={index}>
                                                        {" "}
                                                        {style.name}
                                                    </span>
                                                ) : (
                                                    <span key={index}>
                                                        {" "}
                                                        {style.name},
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div className="content">
                                        <img src={IconDetail3} alt="" />
                                        <div className="text">
                                            Công cụ:
                                            {designTools.map((tool, index) =>
                                                index ===
                                                    designTools.length - 1 ? (
                                                    <span key={index}>
                                                        {" "}
                                                        {tool.name}
                                                    </span>
                                                ) : (
                                                    <span key={index}>
                                                        {" "}
                                                        {tool.name},
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div className="content">
                                        <img src={IconDetail4} alt="" />
                                        <div className="text">
                                            {/* Dung lượng file: {info.fileSize} MB */}
                                            Dung lượng file:
                                        </div>
                                    </div>
                                    <div className="content">
                                        <img src={IconDetail5} alt="" />
                                        <div className="text">
                                            {/* Kích thước: {info.width} x {info.height} cm */}
                                            Kích thước:
                                        </div>
                                    </div>
                                    <div className="content">
                                        <img src={IconDetail6} alt="" />
                                        <div className="text">
                                            Hạng mục:{" "}
                                            {typeOfArchitectures.map(
                                                (type, index) =>
                                                    index ===
                                                        typeOfArchitectures.length -
                                                        1 ? (
                                                        <span key={index}>
                                                            {" "}
                                                            {type.name}
                                                        </span>
                                                    ) : (
                                                        <span key={index}>
                                                            {" "}
                                                            {type.name},
                                                        </span>
                                                    )
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="description">
                                    <div className="des-title">Mô tả</div>
                                    <div className="des-text">
                                        {info.content}
                                    </div>
                                </div>
                                <div className="action">
                                    {isShowAddToCart &&
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Button
                                                className="add-to-card"
                                                onClick={() =>
                                                    handleAddToCart(info.id)
                                                }
                                            >
                                                Thêm vào giỏ hàng
                                            </Button>
                                        </motion.div>
                                    }
                                    {isShowDownload &&
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Button className="download-now">
                                                {productsFile ? (
                                                    <a href={productsFile} download>
                                                        Tải xuống ngay
                                                    </a>
                                                ) : (
                                                    <a>Tải xuống ngay</a>
                                                )}
                                            </Button>
                                        </motion.div>
                                    }
                                </div>
                            </>
                        )}
                </div>
            </div>
            {authorIntroduction && (
                <div onClick={handleRoutingToAuthorPage}>
                    <CAuthorIntroduction
                        createdAt={authorIntroduction?.createdAt}
                        address={authorIntroduction.address}
                        name={authorIntroduction.name}
                        phone={authorIntroduction.phone}
                        totalProduct={authorIntroduction.totalProduct}
                        totalRating={authorIntroduction.totalRating}
                    />
                </div>
            )}
            <div className="comment">
                <CComment />
            </div>
            <div className="similar-sketch">
                <div className="title">
                    <div>Bản vẽ tương tự</div>
                    <div className="sub-title">{"Xem thêm"}</div>
                </div>
                <div className="lst-tool">
                    <Col>
                        <Button
                            icon={<ArrowLeftOutlined />}
                            className="btn-icon"
                            onClick={handlePrevCardLatestSketch}
                            disabled={currentIndexLatestSketch === 0 && true}
                        />
                    </Col>
                    <Row gutter={[16, 16]}>
                        {latestSketchsList
                            .slice(
                                currentIndexLatestSketch,
                                currentIndexLatestSketch + numberOfCardShow
                            )
                            .map((card) => (
                                <Col
                                    onClick={() => {
                                        handleClickCard(card.id);
                                    }}
                                    span={spanCol}
                                    key={card.id}
                                >
                                    <CProductCard
                                        imageUrl={card.images[0]}
                                        title={card.title}
                                        view={card.views}
                                        price={card.price}
                                        idTool={card.designTools[0] || ''}

                                    // type={card.type}
                                    />
                                </Col>
                            ))}
                    </Row>
                    <Col>
                        <Button
                            icon={<ArrowRightOutlined />}
                            className="btn-icon"
                            onClick={handleNextCardLatestSketch}
                            disabled={
                                currentIndexLatestSketch >= latestSketchsList.length - numberOfCardShow && true
                            }
                        />
                    </Col>
                </div>
            </div>
        </div>
    );
};

export default DetailSketch;
