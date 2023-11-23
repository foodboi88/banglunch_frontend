import React, { useEffect, useState } from "react";

import "./styles.cart.scss";
import { IDetailSketch, ISketchInCart } from "../../common/sketch.interface";
import IconDetail1 from "../../images/detail/icon-detail-1.png";
import IconDetail2 from "../../images/detail/icon-detail-2.png";
import IconDetail3 from "../../images/detail/icon-detail-3.png";
import IconDetail4 from "../../images/detail/icon-detail-4.png";
import IconDetail5 from "../../images/detail/icon-detail-5.png";
import IconDetail6 from "../../images/detail/icon-detail-6.png";
import CartImage1 from "../../images/cart/cart-image-1.png";
import CartImage2 from "../../images/cart/cart-image-2.png";
import CartImage3 from "../../images/cart/cart-image-3.png";
import {
    Button,
    Col,
    Input,
    Modal,
    Radio,
    Row,
    Select,
    Space,
    Table,
    notification,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    CaretDownOutlined,
} from "@ant-design/icons";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import SketchsApi from "../../api/sketchs/sketchs.api";
import { deleteSketchInCartRequest, purchaseWithVNPayRequest } from "../../redux/controller";
import { IPaymentRequest } from "../../common/payment.interface";

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
    const { lstSketchsInCart, sketchsQuantityInCart, vnpayLink } =
        useSelectorRoot((state) => state.sketch);
    const { tokenLogin, userName, userMail, userPhone } = useSelectorRoot((state) => state.login);

    const dispatch = useDispatchRoot();

    const [voucherCode, setVoucherCode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [tmpData, setTmpData] = useState<any>([]);
    const [totalMoney, setTotalMoney] = useState(0);


    const infoUser = [
        {
            key: "1",
            label: "Họ và tên",
            // value: "Do Trung Hieu",

            value: `${userName}`,
        },
        {
            key: "2",
            label: "Email",
            value: `${userMail}`,
            // value: "test@gmail.com",
        },
        {
            key: "3",
            label: "Số điện thoại",
            value: `${userPhone}`,
            // value: "0965267JQK",
        },
    ];

    let infoCart = [
        {
            key: "1",
            label: "Tạm tính",
            value: totalMoney,
        },
        {
            key: "2",
            label: "Thuế VAT (chưa áp dụng)",
            value: totalMoney * 0.08,
        },
    ];

    const columns = [
        Table.SELECTION_COLUMN,
        {
            title: `Tất cả (${sketchsQuantityInCart} sản phẩm)`,
            key: "title",
            render: (record: any) => (
                <div className="sketch-cart-info">
                    <div className="sketch-cart-info-img">
                        {/* <img src={sketch && sketch.images[0].filePath} alt="" /> */}
                        <img style={{ width: "145px" }} src={record.image} alt="" />
                    </div>
                    <div className="sketch-cart-content">
                        <div className="sketch-cart-content-title">
                            {/* {sketch && sketch.info.title} */}
                            {record.title && record.title}
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
                                    record.price === "MIỄN PHÍ"
                                        ? "sketch-cart-action-new-price free"
                                        : "sketch-cart-action-new-price"
                                }
                            >
                                {record.price.toLocaleString().replace(/,/g, '.') + 'đ'}
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

    useEffect(() => { // Set list sản phẩm khi dữ liệu trong db thay đổi
        if (lstSketchsInCart) {
            console.log(lstSketchsInCart);
            setTmpData(lstSketchsInCart);
            // const totalMoney = tmpData.reduce((total: any,item: ISketchInCart) => total + item.price, 0)
            // setTotalMoney(totalMoney);
            // handleSetLstCart(lstSketchsInCart);
        }
    }, [lstSketchsInCart]);


    useEffect(() => { // Set lại tổng tiền khi list sản phẩm thay đổi
        const totalMoney = tmpData.reduce((total: any, item: ISketchInCart) => total + item.price, 0)
        setTotalMoney(totalMoney);
    }, [tmpData])

    useEffect(() => {
        if (lstSketchsInCart.length > 0 && vnpayLink) {
            window.location.replace(`${vnpayLink}`);
        }
    }, [vnpayLink]);

    useEffect(() => {
        // window.location.reload();
    }, []);

    // const handleSetLstCart = async (lstSketchCart: ISketchInCart[]) => {
    //     let tmp: IDetailSketch[] = []
    //     for (let index = 0; index < lstSketchCart.length; index++) {
    //         const element = lstSketchCart[index];
    //         await SketchsApi.getValSketchById(element.id).then((res: any) => {
    //             if (res.data.data) {
    //                 tmp.push(res.data.data);
    //             }
    //         })
    //     }
    //     if (tmp && tmp.length > 0) {
    //         console.log(tmp);
    //         setTmpData(tmp);
    //         return;
    //     }
    // }
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
    };
    const onDeleteSketchInCart = (record: any) => {
        console.log(record)
        Modal.confirm({
            title: "Bạn có muốn xóa sản phẩm này trong giỏ hàng?",
            okText: "Có",
            okType: "danger",
            onOk: () => {
                // setTmpData((pre: any) => {
                //     return pre.filter(
                //         (item: { key: any }) => item.key !== record.id
                //     );
                // });
                dispatch(deleteSketchInCartRequest(record.id))
            },
        });
    };

    const handleChangePaymentMethod = (e: any) => {
        setPaymentMethod(e.target.value);
    };

    const caculateTax = () => {
        return totalMoney * 0.08
    }

    const paymentHandle = () => {
        if (!paymentMethod) {
            notification.open({
                message: "Vui lòng chọn phương thức thanh toán",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        } else {
            const bodyrequest: IPaymentRequest = {
                bankCodeIn: paymentMethod,
                voucher: voucherCode,
                additionalProp1: {},
            };
            dispatch(purchaseWithVNPayRequest(bodyrequest));
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
                    </div>

                    <div className="right-content-cart-info-cart">
                        <div className="title">
                            <div className="title-text">
                                Thông tin thanh toán
                            </div>
                            <div className="title-edit">
                                <EditOutlined />
                                Chỉnh sửa
                            </div>
                        </div>
                        {infoCart &&
                            infoCart.map((item, index) => (
                                <div className="info-cart">
                                    <div className="label-info-user">
                                        {item.label}
                                    </div>
                                    <div className="value-info-user">
                                        {item.value.toLocaleString().replace(/,/g, '.') + ' VND'}
                                    </div>
                                </div>
                            ))}
                        <div className="discount">
                            <Select
                                className="select-discount"
                                suffixIcon={<CaretDownOutlined />}
                                placeholder="Chọn mã giảm giá"
                            >
                                <Option value="1">
                                    Giảm 10% thành viên mới
                                </Option>
                                <Option value="2">
                                    Mã giảm 5% tối đa 50.000VNĐ
                                </Option>
                                <Option value="3">
                                    Mã giảm 3% tối đa 50.000VNĐ
                                </Option>
                            </Select>

                            <Button type="primary">Áp dụng</Button>
                        </div>
                        <Radio.Group onChange={handleChangePaymentMethod}>
                            <Space direction="vertical">
                                {paymentMethodList.map((item) => (
                                    <Radio value={item.value}>
                                        {item.label}
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>

                        <div className="total-price">
                            <div className="total-price-title">Tổng tiền</div>
                            <div className="total-price-value">
                                {totalMoney.toLocaleString().replace(/,/g, '.') + ' VND'}
                            </div>
                        </div>
                    </div>

                    <Button className="to-payment" onClick={paymentHandle}>
                        Đi tới thanh toán
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
