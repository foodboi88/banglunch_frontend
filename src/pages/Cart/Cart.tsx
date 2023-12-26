import React, { useEffect, useState } from "react";

import {
    DeleteOutlined
} from "@ant-design/icons";
import {
    Button,
    Select,
    Table,
    notification
} from "antd";
import { useNavigate } from "react-router-dom";
import { ICreateOrder, IOrderDetail, IUpdateFoodInCart } from "../../common/order.interface";
import { IDetailSketch, ISketchInCart } from "../../common/sketch.interface";
import { addSketchToCartRequest, purchaseRequest } from "../../redux/controller";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import "./styles.cart.scss";

interface DataType {
    key: React.Key;
    sketch: IDetailSketch;
}


const paymentMethodList = [
    {
        label: "Thanh toán bằng Internet Banking / Ví điện tử VNPAY",
        value: "VNPAYQR",
    },
    {
        label: "Thanh toán bằng thẻ ATM - Nội địa",
        value: "VNBANK",
    },
    {
        label: "Thanh toán bằng thẻ quốc tế Visa, MasterCard, JCB",
        value: "INTCARD",
    },
];
const { Option } = Select;

const Cart = () => {
    const navigate = useNavigate();
    const { lstSketchsInCart, sketchsQuantityInCart,deliveryDetail } =
        useSelectorRoot((state) => state.sketch);
    const { userName, userMail, userPhone, accesstokenExpired } = useSelectorRoot((state) => state.login);

    const dispatch = useDispatchRoot();

    const [tmpData, setTmpData] = useState<any[]>(lstSketchsInCart);
    const [totalMoney, setTotalMoney] = useState(0);


    const infoUser = [
        {
            key: "1",
            label: "Họ và tên",
            value: `${userName}`,
        },
        {
            key: "2",
            label: "Email",
            value: `${userMail}`,
        },
        {
            key: "3",
            label: "Số điện thoại",
            value: `${userPhone}`,
        },
    ];

    const columns = [
        {
            title: `Tất cả (${sketchsQuantityInCart} món ăn)`,
            key: "title",
            render: (record: IOrderDetail) => (
                <div onClick={()=>routerToDetailFood(record.foodId)} className="sketch-cart-info">
                    <div className="sketch-cart-info-img">
                        {/* <img src={sketch && sketch.images[0].filePath} alt="" /> */}
                        <img style={{ width: "145px" }} src={record.foods?.galleries[0]?.filePath || ''} alt="" />
                    </div>
                    <div className="sketch-cart-content">
                        <div className="sketch-cart-content-title">
                            {/* {sketch && sketch.info.title} */}
                            {record.foods?.title && record.foods?.title}
                        </div>

                    </div>
                </div>
            ),
        },
        {
            key: "5",
            title: (
''
            ),
            render: (record: any) => {
                return (
                    <>
                        <div className="sketch-cart-action">
                            <div
                                className={
                                    record.price === 0
                                        ? "sketch-cart-action-new-price free"
                                        : "sketch-cart-action-new-price"
                                }
                            >
                                {record.foods.price.toLocaleString().replace(/,/g, '.') + 'đ'} x {record.quantity}
                            </div>
                            <div
                                className="sketch-cart-action-delete"
                                onClick={() => {
                                    onDeleteSketchInCart(record);
                                }}
                            >
                                <DeleteOutlined />
                                Xóa
                            </div>
                        </div>  
                    </>
                );
            },
        },
    ];

    useEffect(()=>{
        if(lstSketchsInCart){
            setTmpData(lstSketchsInCart)
        }
    },[lstSketchsInCart])

    useEffect(() => { // Set lại tổng tiền khi list món ăn thay đổi
        const totalMoney = tmpData.reduce((total: any, item: any) => total + item.price*item.quantity, 0)
        setTotalMoney(totalMoney);
    }, [tmpData,deliveryDetail])

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
    };
    const onDeleteSketchInCart = (record: ISketchInCart) => {
        if (accesstokenExpired === false) {
            console.log(record);
            const bodyrequest: IUpdateFoodInCart = {
                foodId: record?.foodId || '',
                sellerId: record?.foods.sellerId || '',
                quantity: 0
            };
            console.log(bodyrequest)
            dispatch(addSketchToCartRequest(bodyrequest));
        } else {
            notification.open({
                message: "Phiên đăng nhập của bạn đã hết",
                description: "Vui lòng đăng nhập lại để xóa món ăn giỏ!",

                onClick: () => {
                    console.log("Vui lòng đăng nhập để xóa món ăn giỏ!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        }
    };

    const paymentHandle = () => {
        const bodyrequest: ICreateOrder = {
            deliveryCost: deliveryDetail?.total_fee || 0,
            expectedDeliveryTime: new Date(deliveryDetail?.expected_delivery_time || '')
        };
        dispatch(purchaseRequest(bodyrequest));
        navigate(`/buyer/purchased-food`);
    };

    const routerToDetailFood = (foodId: string) => {
        navigate(`/detail-food/${foodId}`);
    }

    return (
        <div className="main-cart">
            <div className="title">Giỏ hàng</div>
            <div className="content-cart">
                <div className="left-content-cart">
                    <Table
                        className="table-source"
                        columns={columns}
                        dataSource={tmpData}
                        pagination={false}
                    />
                </div>
                <div className="right-content-cart">
                    <div className="right-content-cart-info-user">
                        <div className="title">
                            <div className="title-text">
                                Thông tin khách hàng
                            </div>
                        </div>
                        {infoUser &&
                            infoUser.map((item, index) => (
                                <div key={index} className="info-user">
                                    <div className="label-info-user">
                                        {item.label}
                                    </div>
                                    <div className="value-info-user">
                                        {item.value.toLocaleString().replace(/,/g, '.')}
                                    </div>
                                </div>
                            ))}
                        
                    </div>

                    <div className="right-content-cart-info-cart">
                        <div className="total-price">
                            <div className="total-price-title">Tổng tiền</div>
                            <div className="total-price-value">
                                {totalMoney.toLocaleString().replace(/,/g, '.') + ' VND'}
                            </div>
                        </div>
                    </div>

                    <Button className="to-payment" disabled={sketchsQuantityInCart === 0 ? true : false} onClick={paymentHandle}>
                        Đặt món
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
