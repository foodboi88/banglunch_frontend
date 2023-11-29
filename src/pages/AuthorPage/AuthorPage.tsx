import { WalletOutlined } from "@ant-design/icons";
import { Col, Menu, MenuProps, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IFoodOfShop } from "../../common/sketch.interface";
import CArrangeBar from "../../components/ArrangeBar/CArrangeBar";
import CAuthorIntroduction from "../../components/AuthorIntroduction/CAuthorIntroduction";
import CFilter from "../../components/Filter/CFilter";
import CPagination from "../../components/Pagination/CPagination";
import CProductCard from "../../components/ProductCard/CProductCard";
import {
    getSketchListByAuthorIdRequest
} from "../../redux/controller";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import "./styles.authorpage.scss";

const items: MenuProps["items"] = [
    {
        label: "Tất cả món ăn",
        key: "1",
        icon: <WalletOutlined />,
    },
    {
        label: "Món ăn nhiều lượt mua",
        key: "3",
        icon: <WalletOutlined />,
    },
    {
        label: "Món ăn được đánh giá cao",
        key: "4",
        icon: <WalletOutlined />,
    },
];

const AuthorPage = () => {
    const navigate = useNavigate();

    const [current, setCurrent] = useState("mail");
    const [spanCol, setSpanCol] = useState<number>(6);

    const { authorIntroduction, shopDetail } = useSelectorRoot(
        (state) => state.sketch
    ); // Lấy ra dữ liệu detail sketch và danh sách comment từ redux
    const dispatch = useDispatchRoot();
    const { authorId } = useParams();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12);
    const [newfilteredFoods, setNewFilteredFoods] = useState<IFoodOfShop[]>();
    useEffect(() => {
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [navigate]);

    useEffect(() => {
        if (authorId) {
            dispatch(getSketchListByAuthorIdRequest(authorId));
        }
    }, []);

    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };

    const goToDetailPageHandle = (id: string) => {
        navigate(`/detail-food/${id}`);
    };

    const onChangePage = (page: number) => {
        setCurrentPage(page);
    }


    useEffect(() => {
        if (shopDetail?.foods?.length === 0) return;
        console.log("filteredSketchs", shopDetail?.foods);

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentItems = shopDetail?.foods?.slice(startIndex, endIndex);
        setNewFilteredFoods(currentItems);
    }, [currentPage, shopDetail]);
    return (
        <div className="main-author-page">
            <CFilter
                authorId={authorId}
            />
            <div className="page-content">
                {shopDetail?.info && (
                    <CAuthorIntroduction
                        createdAt={shopDetail?.info?.createdAt || ''}
                        address={shopDetail?.info?.address}
                        name={shopDetail?.info?.name}
                        phone={shopDetail?.info?.phone}
                        totalProduct={shopDetail?.info?.totalProduct}
                        totalRating={shopDetail?.info?.totalRating}
                    />
                )}
                <div className="horizontal-navbar">
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={items}
                    />
                </div>
                <CArrangeBar />
                <div className="sketch-list">
                    <Row className="detail-list" gutter={[16, 24]}>
                        {newfilteredFoods &&
                            newfilteredFoods.map((card) => (
                                <Col
                                    onClick={() => {
                                        goToDetailPageHandle(card._id);
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

                                    // type={card.}
                                    />
                                </Col>
                            ))}
                    </Row>
                </div>
                <CPagination
                    pageSize={pageSize}
                    total={newfilteredFoods?.length}
                    currentPage={currentPage}
                    onChange={onChangePage}
                />
            </div>
        </div>
    );
};

export default AuthorPage;
