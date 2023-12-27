import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IFoodOfShop } from "../../common/sketch.interface";
import CFilter from "../../components/Filter/CFilter";
import CProductCard from "../../components/ProductCard/CProductCard";
import { useSelectorRoot } from "../../redux/store";
import "./styles.advancedsearching.scss";

const AdvancedSeaching = () => {
    const navigate = useNavigate();
    const [spanCol, setSpanCol] = useState<number>(6);
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);
    const [isShowButtonFilter, setIsShowButtonFilter] =
        useState<boolean>(false);

    const {
        filteredSketchs,
    } = useSelectorRoot((state) => state.sketch);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12);
    const [newfilteredSketchs, setNewFilteredSketchs] = useState<IFoodOfShop[]>();

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
        if (window.innerWidth > 900) {
            setSpanCol(6);
            setIsShowButtonFilter(false);
        }
        if (window.innerWidth <= 900) {
            setSpanCol(8);
            setIsShowButtonFilter(true);
        }
        if (window.innerWidth <= 600) {
            setSpanCol(12);
        }
        if (window.innerWidth <= 400) {
            setSpanCol(24);
        }
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [window.innerWidth]);

    const goToDetailPageHandle = (id: string) => {
        navigate(`/detail-food/${id}`);
    };

    const onChangePage = (page: number) => {
        setCurrentPage(page);
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        if (!filteredSketchs) return;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentItems = filteredSketchs?.slice(startIndex, endIndex);
        setNewFilteredSketchs(currentItems);
    }, [currentPage, filteredSketchs]);

    return (
        <div className="main">
            <CFilter />
            <div className="filtered-items">
                <div className="author-introduction">
                </div>
                <div className="sketch-list">
                    <Row className="detail-list" gutter={[16, 24]}>
                        {newfilteredSketchs &&
                            newfilteredSketchs.map((card) => (
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
                                        category={card.category}
                                    />
                                </Col>
                            ))}
                    </Row>
                </div>
                {/* <CPagination
                    total={filteredSketchs?.length}
                    currentPage={currentPage}
                    onChange={onChangePage}
                /> */}
            </div>
        </div>
    );
};

export default AdvancedSeaching;
