import { MessageOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, InputNumber, notification } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate, useParams } from "react-router";
import CAuthorIntroduction from "../../components/AuthorIntroduction/CAuthorIntroduction";
import "./styles.detailsketch.scss";

import { IGallery } from "../../common/gallery.interface";
import { IUpdateFoodInCart } from "../../common/order.interface";
import { IDetailFood, IFoodCategory } from "../../common/sketch.interface";
import Utils from "../../common/utils";
import CComment from "../../components/Comment/CComment";
import { ROLE } from "../../enum/role.enum";
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
        ratesLst,
        lstSketchsInCart,
        mostViewedSketchList
    } = useSelectorRoot((state) => state.sketch); // Lấy ra dữ liệu detail sketch và danh sách comment từ redux
    const { userRole, accesstokenExpired } = useSelectorRoot((state) => state.login);

    const dispatch = useDispatchRoot();
    const { foodId } = useParams(); // Lấy ra id của sketch từ url

    const [spanCol, setSpanCol] = useState<number>(6);
    const [numberOfCardShow, setNumberOfCardShow] = useState<number>(4);
    const [numberOfCardNext, setNumberOfCardNext] = useState<number>(4);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState<IGallery[]>([]);
    const [info, setInfo] = useState<IDetailFood>();
    const [numberOfFoodInCart, setNumberOfFoodInCart] = useState(0);
    const [typeOfArchitectures, setTypeOfArchitectures] = useState<
        IFoodCategory[]
    >([]);
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
            dispatch(getDetailSketchPageContentRequest({foodId}));
            dispatch(getRatesBySketchIdRequest(foodId));
        }
    }, [foodId]);

    // Kiểm tra xem có chi tiết món ăn hay không
    useEffect(() => {
        if (detailSketch) {
            setImages(detailSketch.galleries);
            setInfo(detailSketch);
            setTypeOfArchitectures(detailSketch.food_categories);
        }
    }, [detailSketch]);

    useEffect(()=>{
        if(lstSketchsInCart.length>0){
            lstSketchsInCart.forEach(item => {
                if(item.foodId===foodId) setNumberOfFoodInCart(item.quantity)
            })
        }
    },[lstSketchsInCart])

    const handleNextCard = () => {
        setCurrentIndex(currentIndex + 1);
    };

    const handlePrevCard = () => {
        setCurrentIndex(currentIndex - 1);
    };

    const onChangeFoodInCart = (event: any) => {
        if (accesstokenExpired === false) {

            const bodyrequest: IUpdateFoodInCart = {
                foodId: detailSketch?._id || '',
                sellerId: detailSketch?.sellerId || '',
                quantity: event
            };
            console.log(bodyrequest)
            dispatch(addSketchToCartRequest(bodyrequest));
        } else {
            notification.open({
                message: "Bạn chưa đăng nhập",
                description: "Vui lòng đăng nhập để thêm món ăn vào giỏ!",

                onClick: () => {
                    console.log("Vui lòng đăng nhập để thêm món ăn vào giỏ!");
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
    };

    return (
        <div className="main-detail">
            <div className="breadcrumb">
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => navigate("/")}>
                        Trang chủ
                    </Breadcrumb.Item>

                    <Breadcrumb.Item className="current-link">
                        Danh sách món ăn nổi bật
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
                                <div className="property">
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
                                {
                                    userRole === ROLE.BUYER // nếu là buyer thì mới cho hiện nút
                                     && <div className="action">
                                    {
                                        lstSketchsInCart.find(orderedFood => orderedFood.foodId === detailSketch?._id) && !accesstokenExpired ? //Nếu món ăn đã có trong giỏ thì hiển thị selectbox chỉnh sửa số lượng
                                        <div className="adjust-number">
                                            <InputNumber min={0} max={10} value={numberOfFoodInCart} defaultValue={numberOfFoodInCart} onChange={(event) => setNumberOfFoodInCart(event || 0)} />
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    className="add-to-card"
                                                    onClick={() =>
                                                        onChangeFoodInCart(numberOfFoodInCart)
                                                    }
                                                >
                                                    Sửa số lượng
                                                </Button>
                                            </motion.div>
                                        </div>
                                        :
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Button
                                                className="add-to-card"
                                                onClick={() =>
                                                    onChangeFoodInCart(1)
                                                }
                                            >
                                                Thêm vào giỏ hàng
                                            </Button>
                                        </motion.div>
                                    }
                                    </div>
                                }
                            </>
                        )}
                </div>
            </div>
            {detailSketch?.seller && (
                <div onClick={handleRoutingToAuthorPage}>
                    <CAuthorIntroduction
                        createdAt={detailSketch?.seller?.createdAt}
                        address={detailSketch?.seller.info.fromDetailAddress}
                        name={detailSketch?.seller.name}
                        phone={detailSketch?.seller.phone}
                        totalProduct={detailSketch?.seller.totalProduct}
                        totalRating={detailSketch?.seller.totalRating}
                    />
                </div>
            )}
            <div className="similar-sketch">
                <div className="title">
                    <span>Tóm tắt toàn bộ bình luận</span> <MessageOutlined />
                </div>
                <div style={{color:'white'}}>
                    {detailSketch?.summarizedComments || 'Chưa có dữ liệu'}
                </div>
            </div>
            <div className="comment">
                <CComment />
            </div>
            {/* <div className="similar-sketch">
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
                        {mostViewedSketchList
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
                                        imageUrl={ card.galleries.length > 0 ? card.galleries[0].filePath : ''}
                                        title={card.title}
                                        views={card.views}
                                        price={card.price}
                                        category={card.category || ''}
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
                                currentIndexLatestSketch >= mostViewedSketchList.length - numberOfCardShow && true
                            }
                        />
                    </Col>
                </div>
            </div> */}
        </div>
    );
};

export default DetailSketch;
