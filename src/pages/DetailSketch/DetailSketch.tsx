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

import { IDetailFood, IFoodCategory, IImagesSketch } from "../../common/sketch.interface";
import { IStyle, ITool } from "../../common/tool.interface";
import Utils from "../../common/utils";
import CComment from "../../components/Comment/CComment";
import IconDetail1 from "../../images/detail/icon-detail-1.png";
import IconDetail6 from "../../images/detail/icon-detail-6.png";
import {
    addSketchToCartRequest,
    getDetailSketchPageContentRequest,
    getRatesBySketchIdRequest
} from "../../redux/controller";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";

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
    const { tokenLogin, accesstokenExpired } = useSelectorRoot((state) => state.login);

    const dispatch = useDispatchRoot();
    const { foodId } = useParams(); // Lấy ra id của sketch từ url

    const [spanCol, setSpanCol] = useState<number>(6);
    const [numberOfCardShow, setNumberOfCardShow] = useState<number>(4);
    const [numberOfCardNext, setNumberOfCardNext] = useState<number>(4);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [designStyles, setDesignStyles] = useState<IStyle[]>([]);
    const [designTools, setDesignTools] = useState<ITool[]>([]);
    const [images, setImages] = useState<IImagesSketch[]>([]);
    const [info, setInfo] = useState<IDetailFood>();
    const [typeOfArchitectures, setTypeOfArchitectures] = useState<
        IFoodCategory[]
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
        if (foodId) {
            const userId = Utils.getValueLocalStorage("user_id");
            dispatch(getDetailSketchPageContentRequest({
                foodId,
                userId
            }));
            dispatch(getRatesBySketchIdRequest(foodId));
            
            // if(tokenLogin) {
            //     dispatch(getProductFilesByIdRequest(foodId));
            // }

        }
    }, [foodId]);

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
            setImages(detailSketch.galleries);
            setInfo(detailSketch);
            setTypeOfArchitectures(detailSketch.food_categories);
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
        if (accesstokenExpired === false) {

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
        navigate(`/author-page/${detailSketch?.seller._id}`);
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
        navigate(`/detail-food/${sketchId}`);
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
                                     {ratesLst && ratesLst.averageRate ? (
                                        <Rate
                                            defaultValue={ratesLst.averageRate}
                                            disabled
                                            count={5}
                                        />
                                    ) : 
                                    (
                                        <Rate
                                            defaultValue={0}
                                            disabled
                                            count={5}
                                        />
                                    ) 
                                    } 
                                </div>
                                <div className="property">
                                    <div className="content">
                                        <img src={IconDetail1} alt="" />
                                        <div className="text">
                                            Ngày đăng:{" "}
                                            {new Date(
                                                info.createdAt
                                            ).toLocaleDateString("en-GB")}
                                        </div>
                                    </div>
                                    <div className="content">
                                        <img src={IconDetail6} alt="" />
                                        <div className="text">
                                            Loại đồ ăn:{" "}
                                            {typeOfArchitectures.map(
                                                (type, index) =>
                                                    index ===
                                                        typeOfArchitectures.length -
                                                        1 ? (
                                                        <span key={index}>
                                                            {" "}
                                                            {type.categories.name}
                                                        </span>
                                                    ) : (
                                                        <span key={index}>
                                                            {" "}
                                                            {type.categories.name},
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
                                                    handleAddToCart(info._id)
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
            {detailSketch?.seller && (
                <div onClick={handleRoutingToAuthorPage}>
                    <CAuthorIntroduction
                        createdAt={detailSketch?.seller?.createdAt}
                        address={detailSketch?.seller.address}
                        name={detailSketch?.seller.name}
                        phone={detailSketch?.seller.phone}
                        totalProduct={detailSketch?.seller.totalProduct}
                        totalRating={detailSketch?.seller.totalRating}
                    />
                </div>
            )}
            <div className="comment">
                <CComment />
            </div>
            <div className="similar-sketch">
                <div className="title">
                    <div>CÓ THỂ BẠN SẼ THÍCH</div>
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
                                        category={card.category || ''}

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
