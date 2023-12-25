import { Button, Divider, Form, Modal, Rate, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderStatus } from '../../../common/order.constant';
import { IOrderDetail, IOrders } from '../../../common/order.interface';
import { IGetSketchRequest } from '../../../common/sketch.interface';
import { IGetUsersRequest } from '../../../common/user.interface';
import Utils from '../../../common/utils';
import CTable from '../../../components/CTable/CTable';
import { QUERY_PARAM } from '../../../constants/get-api.constants';
import { OrderStatusEnums } from '../../../enum/order.enum';
import { addCommentRequest, approveOrderRequest, getPurchasedSketchsRequest } from '../../../redux/controller';
import { useDispatchRoot, useSelectorRoot } from '../../../redux/store';

const PurchasedSketchs = () => {
    const {
        totalPurchasedSketch,
        listPurchasedSketch,
        purchaseResponse
    } = useSelectorRoot((state) => state.sketch);
    const [openModal, setOpenModal] = useState(false);
    const [openCommentModal, setOpenCommentModal] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [detailOrder, setDetailOrder] = useState<IOrders>();
    const [currentSearchValue, setCurrentSearchValue] = useState<IGetSketchRequest>({ size: QUERY_PARAM.size, offset: 0 })

    const navigate = useNavigate();
    const dispatch = useDispatchRoot();

    useEffect(() => {
        dispatch(getPurchasedSketchsRequest())
    }, [])

    useEffect(() => {
        if (purchaseResponse) {
            dispatch(getPurchasedSketchsRequest())
        }
    },[purchaseResponse])

    const columns: ColumnType<IOrders>[] = [
        {
            title: 'Số thứ tự',
            render: (_, __, rowIndex) => (
                <span className='span-table'>{rowIndex + 1}</span>
            )
        },
        {
            title: 'Tên shop',
            key: 'product',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    {record?.seller?.name || ''}
                </div>
            )
        },
        {
            title: 'Thời gian đặt',
            key: 'product',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    {new Date(record?.createdAt || '').toUTCString()}
                </div>
            )
        },
        {
            title: 'Trạng thái',
            key: 'product',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    {OrderStatus[record?.orderStatus as keyof typeof OrderStatus]}
                </div>
            )
        },
        {
            title: 'Giá tổng',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'end' }}>
                    {Utils.caculateTotalPrice(record.order_details,record.deliveryCost)} VND
                </div>
            )
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <div style={{gap: '15px', display: 'flex'}}>
                    <div>
                        <a onClick={(event) => handleDetail(record)}>Chi tiết</a>
                    </div >
                    {
                        record.orderStatus === OrderStatusEnums.Shipping &&
                        <Space size="middle">
                            <a onClick={(event) => handleApprove(record._id, OrderStatusEnums.Received)}>Đã nhận đơn</a>
                        </Space>
                    }
                    {
                        record.orderStatus === OrderStatusEnums.Received &&
                        <Space size="middle">
                            <a onClick={(event) => handleOpenAddCommentModal(record)}>Đánh giá</a>
                        </Space>
                    }
                </div>
            ),
        },

    ];

    //   useEffect(()=>{
    //     setOpenModal(true)
    //   },[detailBill])


    const handleDetail = (record: any) => {
        console.log('record', record);
        setDetailOrder(record);
        setOpenModal(true);
    }

    const handleOpenAddCommentModal = (record: any) => {
        console.log('record', record);
        setDetailOrder(record);
        setOpenCommentModal(true);
    }

    const handleAddComment = (record: any) => {
        console.log(record)
        const bodyrequest = {
            foodId: record.item.foodId,
            rate: record.rate ? record.rate : (record.item.comments.length > 0 ? record.item.comments[0].rate : 0),
            description: record.description ? record.description : (record.item.comments.length > 0 ? record.item.comments[0].description : ""),
            orderDetailId: record.item._id,
            additionalProp1: {}
        }
        console.log(bodyrequest);
        dispatch(addCommentRequest(bodyrequest))
    }

    const handleApprove = (orderId: string, type: number) => {
        console.log('record', orderId);

        const bodyrequest = {
            orderId: orderId,
            status: type
            //   currentSearchValue: currentSearchValue
        }
        console.log(bodyrequest)
        dispatch(approveOrderRequest(bodyrequest));
    }

    const onChangeInput = (event: any) => {
        setTextSearch(event.target.value);
    }

    const onChangeRangePicker = (event: any) => {
        if (event) {
            setBeginDate(event[0].format('YYYY-MM-DD'))
            setEndDate(event[1].format('YYYY-MM-DD'))
        }
    }

    const onSearch = () => {
        const body: IGetUsersRequest = {
            size: QUERY_PARAM.size,
            offset: 0,
            search: textSearch,
            startTime: beginDate,
            endTime: endDate,
            status: '',
            sortBy: '',
            sortOrder: '',
        };
        const finalBody = Utils.getRidOfUnusedProperties(body)
        setCurrentSearchValue(finalBody);
        dispatch(getPurchasedSketchsRequest(finalBody))
    }

    const onChangePagination = (event: any) => {
        currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
        setCurrentSearchValue(currentSearchValue);
        dispatch(getPurchasedSketchsRequest())
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    return (
        <motion.div className='sketch-main'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            {
                (detailOrder && openModal) &&
                <Modal
                    open={openModal}
                    okText={'Xác nhận'}
                    cancelText={'Đóng'}
                    closable={true}
                    onCancel={()=>setOpenModal(false)}
                    title={'Chi tiết đơn hàng'}
                    footer={
                        <div>
                            <Button onClick={() => setOpenModal(false)} type='default'>
                                Đóng
                            </Button>
                        </div>
                    }
                >
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Tổng tiền món:</div>
                            <div>{Utils.caculateTotalPrice(detailOrder.order_details) + ' VND'}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Tạo lúc: </div>
                            <div>{(new Date(detailOrder.createdAt)).toUTCString()}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Mã đơn hàng:</div>
                            <div>{detailOrder._id}</div>
                        </div>
                        {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Hình thức thanh toán:</div>
                            <div>{detailOrder.paymentMethods}</div>
                        </div> */}

                        <Divider>Danh sách món ăn</Divider>
                        <div style={{ padding: '10px' }}>
                            {detailOrder.order_details.map((item: IOrderDetail, index: number) => {
                                return (
                                    <div style={{ marginBottom: '30px' }}>
                                        <div><b>món ăn {index + 1}:</b>

                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Tiêu đề:</div>
                                                <div>{item.foods.title}</div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Số lượng:</div>
                                                <div>{item.quantity}</div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Giá:</div>
                                                <div>{Utils.formatMoney(item.foods.price) + ' VND'}</div></div>
                                            <div>
                                                <img style={{ width: "200px" }} src={item.foods?.galleries ? item.foods?.galleries[0]?.filePath : ''} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </Modal>
            }

            {
                (detailOrder && openCommentModal) &&
                <Modal
                    open={openCommentModal}
                    okText={'Xác nhận'}
                    cancelText={'Đóng'}
                    closable={true}
                    onCancel={()=>setOpenCommentModal(false)}
                    title={'Danh sách comment trong đơn'}
                    footer={
                        <div>
                            <Button onClick={() => setOpenCommentModal(false)} type='default'>
                                Đóng
                            </Button>
                        </div>
                    }
                >
                    <div>
                        <div style={{ padding: '10px' }}>
                            {detailOrder.order_details.map((item: IOrderDetail, index: number) => {
                                return (
                                    <div style={{ marginBottom: '30px' }}>
                                        {index !== 0 && <Divider>---------------------------------------------------</Divider>}
                                        <div><b style={{fontSize: '20px'}}>Sản phẩm {index + 1}:</b>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Tiêu đề:</div>
                                                <div>{item.foods.title}</div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Số lượng:</div>
                                                <div>{item.quantity}</div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Giá:</div>
                                                <div>{Utils.formatMoney(item.foods.price) + ' VND'}</div></div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                                <div>Ảnh:</div>
                                                <div>
                                                    <img style={{ width: "200px" }} src={item.foods?.galleries ? item.foods?.galleries[0]?.filePath : ''} />
                                                </div>
                                            </div>
                                            <Form
                                                layout='horizontal'
                                                onFinish={(event) => handleAddComment({...event,item})}
                                            >
                                                <Form.Item
                                                    name="description"
                                                    label={<span>Bình luận</span>}
                                                >
                                                    <TextArea
                                                        className="search-input"
                                                        placeholder="Nhập tiêu đề"
                                                        defaultValue={item.comments.length >0 ? item.comments[0]?.description : ''}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name="rate"
                                                    label={<span>Số sao</span>}
                                                >
                                                    <Rate
                                                        defaultValue={item.comments.length >0 ? item.comments[0]?.rate : 0}
                                                        count={10}
                                                    />
                                                </Form.Item>
                                                <Form.Item className="form-submit">
                                                    <motion.div
                                                        style={{
                                                            cursor: "pointer",
                                                            width: "100%",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        whileFocus={{ scale: 1.05 }}
                                                    >
                                                            <Button
                                                                type="primary"
                                                                htmlType="submit"
                                                                className="login-form-button active"
                                                            >
                                                                Bình luận
                                                            </Button>

                                                    </motion.div>
                                                </Form.Item>
                                                {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                                    <Button style={{width: '100%'}} onClick={()=>handleAddComment(item)}>Bình luận</Button>
                                                </div> */}
                                            </Form>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </Modal>
            }
            <div className='table-area'>
                <CTable
                    tableMainTitle='Lịch sử mua hàng'
                    allowDateRangeSearch={true}
                    allowTextSearch={true}
                    onChangeInput={onChangeInput}
                    onChangeRangePicker={onChangeRangePicker}
                    onSearch={onSearch}
                    data={listPurchasedSketch}
                    titleOfColumnList={columns}
                    totalRecord={totalPurchasedSketch}
                    onChangePagination={onChangePagination}
                />
            </div>
        </motion.div>
    )
}

export default PurchasedSketchs