import { Button, Divider, Space } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { OrderStatus } from '../../../common/order.constant';
import { IOrderDetail, IOrders } from '../../../common/order.interface';
import { IGetSketchRequest } from '../../../common/sketch.interface';
import { IGetUsersRequest } from '../../../common/user.interface';
import Utils from '../../../common/utils';
import CTable from '../../../components/CTable/CTable';
import { QUERY_PARAM } from '../../../constants/get-api.constants';
import { OrderStatusEnums } from '../../../enum/order.enum';
import { approveOrderRequest, getBillListRequests } from '../../../redux/controller';
import { useDispatchRoot, useSelectorRoot } from '../../../redux/store';
import './style.sellerbill.scss';
const moment = require('moment');

const SellerBill = () => {
    const {
        totalBillRecord,
        billList,
        detailBill
    } = useSelectorRoot((state) => state.sketch);
    const dispatch = useDispatchRoot()
    const [openModal, setOpenModal] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dataBillLst, setDataBillLst] = useState<any[]>([]);
    const [detailOrder, setDetailOrder] = useState<IOrders>();
    const [currentSearchValue, setCurrentSearchValue] = useState<IGetSketchRequest>(
        {
            size: QUERY_PARAM.size,
            offset: 0
        }
    )

    useEffect(() => {
        dispatch(
            getBillListRequests(currentSearchValue)
        )
    }, [])



    const columns: ColumnType<IOrders>[] = [
        {
            title: 'Số thứ tự',
            render: (_, __, rowIndex) => (
                <span className='span-table'>{rowIndex + 1}</span>
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
            title: 'Thời gian giao dự kiến',
            key: 'product',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    {record?.expectedDeliveryTime ? new Date(record?.expectedDeliveryTime || '').toUTCString() : ''}
                </div>
            )
        },
        {
            title: 'Giá vận chuyển',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'end' }}>
                    {Utils.formatMoney(record?.deliveryCost) + ' VND'}
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
                <Space size="middle">
                    <a onClick={(event) => handleDetail(record)}>Chi tiết</a>
                </Space>
            ),
        },
    ];

    const handleDetail = (record: any) => {
        console.log('record', record);
        setDetailOrder(record);
        setOpenModal(true);
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
        console.log('hehee')
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
        dispatch(getBillListRequests(finalBody))
    }

    const onChangePagination = (event: any) => {
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
        setCurrentSearchValue(currentSearchValue);
        dispatch(getBillListRequests(currentSearchValue))

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
                            <Button disabled={detailOrder.orderStatus !== OrderStatusEnums.WaitingApproved} onClick={() => handleApprove(detailOrder._id, OrderStatusEnums.Reject)} type='default'>
                                Từ chối
                            </Button>
                            <Button disabled={detailOrder.orderStatus !== OrderStatusEnums.WaitingApproved} onClick={() => handleApprove(detailOrder._id, OrderStatusEnums.Shipping)} type='primary'>
                                Duyệt
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
                            <div>Tổng tiền ship:</div>
                            <div>{Utils.formatMoney(detailOrder.deliveryCost) + ' VND'}</div>
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
                        <Divider>Thông tin người mua</Divider>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Email:</div>
                                <div>{detailOrder.user?.email}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Tên:</div>
                                <div>{detailOrder.user?.name}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Địa chỉ:</div>
                                <div>{detailOrder.user?.address}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Số điện thoại:</div>
                                <div>{detailOrder.user?.phone}</div>
                            </div>
                        </div>
                        <Divider>Danh sách sản phẩm</Divider>
                        <div style={{ padding: '10px' }}>
                            {detailOrder.order_details.map((item: IOrderDetail, index: number) => {
                                return (
                                    <div style={{ marginBottom: '30px' }}>
                                        <div><b>Sản phẩm {index + 1}:</b>

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
            <div className='table-area'>
                <CTable
                    tableMainTitle='Danh sách đơn hàng'
                    allowDateRangeSearch={true}
                    allowTextSearch={true}
                    onChangeInput={onChangeInput}
                    onChangeRangePicker={onChangeRangePicker}
                    onSearch={onSearch}
                    data={billList}
                    titleOfColumnList={columns}
                    totalRecord={totalBillRecord}
                    onChangePagination={onChangePagination}
                />
            </div>
        </motion.div>
    )
}

export default SellerBill