import React, { useEffect, useState } from "react";

import {
    DeleteOutlined,
    EditOutlined
} from "@ant-design/icons";
import {
    Button,
    Select,
    Table,
    notification
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { ICreateShippingOrder, IShippedFood } from "../../common/delivery.interface";
import { ICreateOrder, IOrderDetail, IUpdateFoodInCart } from "../../common/order.interface";
import { IDetailSketch, ISketchInCart } from "../../common/sketch.interface";
import { addSketchToCartRequest, createShippingOrderRequest, purchaseRequest } from "../../redux/controller";
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
    const { lstSketchsInCart, sketchsQuantityInCart, vnpayLink, deliveryCost,deliveryDetail } =
        useSelectorRoot((state) => state.sketch);
    const { tokenLogin, userName, userMail, userPhone, accesstokenExpired } = useSelectorRoot((state) => state.login);

    const dispatch = useDispatchRoot();

    const [voucherCode, setVoucherCode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [receivedProvince, setReceivedProvince] = useState("");
    const [receivedDistrict, setReceivedDistrict] = useState("");
    const [receivedWard, setReceivedWard] = useState("");

    const [tmpData, setTmpData] = useState<any[]>([]);
    const [totalMoney, setTotalMoney] = useState(0);
    const [amount, setAmount] = useState(0);


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

    let infoCart = [
        {
            key: "1",
            label: "Tạm tính",
            value: totalMoney + '    VND',
        },
        {
            key: "2",
            label: "Giá vận chuyển",
            value: (deliveryDetail?.total_fee || 0) + '    VND',
        },{
            key: "3",
            label: "Thời gian nhận dự kiến",
            value: new Date(deliveryDetail?.expected_delivery_time || ''),
        },
    ];

    const columns = [
        Table.SELECTION_COLUMN,
        {
            title: `Tất cả (${sketchsQuantityInCart} sản phẩm)`,
            key: "title",
            render: (record: IOrderDetail) => (
                <div className="sketch-cart-info">
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
                <div className="sketch-cart-action-title">
                    <DeleteOutlined /> Xóa tất cả
                </div>
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

    useEffect(() => { 
        if (lstSketchsInCart) {
            setTmpData(lstSketchsInCart);
            const listFoods: IShippedFood[] = lstSketchsInCart.map(item => ({
                name: item.foods.title,
                quantity: item.quantity,
                height: item.foods.height,
                weight: item.foods.weight,
                length: item.foods.length,
                width: item.foods.width
            }))
            const bodyrequest: ICreateShippingOrder =
            {
                fromWardCode: "20314",
                toWardCode: "510101",
                toDistrictId: 1566,
                items: listFoods
            }
            console.log(bodyrequest)
            dispatch(createShippingOrderRequest(bodyrequest))
        }
        
    }, [lstSketchsInCart]);


    useEffect(() => { // Set lại tổng tiền khi list sản phẩm thay đổi
        const totalMoney = tmpData.reduce((total: any, item: any) => total + item.price*item.quantity, 0)
        setTotalMoney(totalMoney);
        const amount = totalMoney + deliveryDetail?.total_fee;
        setAmount(amount);
    }, [tmpData,deliveryDetail])

    useEffect(() => {
        if (lstSketchsInCart.length > 0 && vnpayLink) {
            window.location.replace(`${vnpayLink}`);
        }
    }, [vnpayLink]);

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
                description: "Vui lòng đăng nhập lại để xóa sản phẩm giỏ!",

                onClick: () => {
                    console.log("Vui lòng đăng nhập để xóa sản phẩm giỏ!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        }
    };

    const paymentHandle = () => {
        if (!receivedWard || !receivedDistrict || !receivedProvince) {
            notification.open({
                message: "Vui lòng chọn vị trí nhận hàng",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        } else {
            const bodyrequest: ICreateOrder = {
                deliveryCost: deliveryDetail?.total_fee || 0,
                expectedDeliveryTime: new Date(deliveryDetail?.expected_delivery_time || '')
            };
            dispatch(purchaseRequest(bodyrequest));
        }
    };

    return (
        <div className="main-cart">
            <div className="title">Giỏ hàng</div>
            <div className="content-cart">
                <div className="left-content-cart">
                    <Table
                        className="table-source"
                        columns={columns}
                        rowSelection={{ ...rowSelection }}
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
                            <div className="title-edit">
                                <EditOutlined />
                                Chỉnh sửa
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
                        <div className="info-user">
                            <div className="label-info-user">
                                Tỉnh/Thành phố
                            </div>
                            <div className="value-info-user">
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[
                                    {
                                        value: '1',
                                        label: 'Not Identified',
                                    },
                                    {
                                        value: '2',
                                        label: 'Closed',
                                    },
                                    {
                                        value: '3',
                                        label: 'Communicated',
                                    },
                                    {
                                        value: '4',
                                        label: 'Identified',
                                    },
                                    {
                                        value: '5',
                                        label: 'Resolved',
                                    },
                                    {
                                        value: '6',
                                        label: 'Cancelled',
                                    },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="info-user">
                            <div className="label-info-user">
                                Quận/Huyện
                            </div>
                            <div className="value-info-user">
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[
                                    {
                                        value: '1',
                                        label: 'Not Identified',
                                    },
                                    {
                                        value: '2',
                                        label: 'Closed',
                                    },
                                    {
                                        value: '3',
                                        label: 'Communicated',
                                    },
                                    {
                                        value: '4',
                                        label: 'Identified',
                                    },
                                    {
                                        value: '5',
                                        label: 'Resolved',
                                    },
                                    {
                                        value: '6',
                                        label: 'Cancelled',
                                    },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="info-user">
                            <div className="label-info-user">
                                Xã/Phường
                            </div>
                            <div className="value-info-user">
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[
                                    {
                                        value: '1',
                                        label: 'Not Identified',
                                    },
                                    {
                                        value: '2',
                                        label: 'Closed',
                                    },
                                    {
                                        value: '3',
                                        label: 'Communicated',
                                    },
                                    {
                                        value: '4',
                                        label: 'Identified',
                                    },
                                    {
                                        value: '5',
                                        label: 'Resolved',
                                    },
                                    {
                                        value: '6',
                                        label: 'Cancelled',
                                    },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="info-user">
                            <div className="label-info-user">
                                Địa chỉ cụ thể
                            </div>
                            <div className="value-info-user">
                                <TextArea/>
                            </div>
                        </div>
                    </div>

                    <div className="right-content-cart-info-cart">
                        <div className="title">
                            <div className="title-text">
                                Thông tin thanh toán
                            </div>
                            <div className="title-edit">
                                {/* <EditOutlined />
                                Chỉnh sửa */}
                            </div>
                        </div>
                        {infoCart &&
                            infoCart.map((item, index) => (
                                <div className="info-cart">
                                    <div className="label-info-user">
                                        {item.label}
                                    </div>
                                    <div className="value-info-user">
                                        {item.value.toLocaleString().replace(/,/g, '.') }
                                    </div>
                                </div>
                            ))}

                        <div className="total-price">
                            <div className="total-price-title">Tổng tiền</div>
                            <div className="total-price-value">
                                {amount.toLocaleString().replace(/,/g, '.') + ' VND'}
                            </div>
                        </div>
                    </div>

                    <Button className="to-payment" onClick={paymentHandle}>
                        Đặt món
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
