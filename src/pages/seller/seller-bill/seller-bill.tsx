import { Divider, Space, Tooltip } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatchRoot, useSelectorRoot } from '../../../redux/store';
import { QUERY_PARAM } from '../../../constants/get-api.constants';
import { IGetSketchRequest } from '../../../common/sketch.interface';
import { getBillListRequests, getDetailBillRequests } from '../../../redux/controller';
import { IGetUsersRequest } from '../../../common/user.interface';
import Utils from '../../../common/utils';
import CTable from '../../../components/CTable/CTable';
import './style.sellerbill.scss'
const moment = require('moment');

const SellerBill = () => {
    const {
        totalBillRecord,
        billList,
        detailBill
    } = useSelectorRoot((state) => state.sketch);
    const [openModal, setOpenModal] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dataBillLst, setDataBillLst] = useState<any[]>([]);
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



    const columns: ColumnType<any>[] = [
        {
            title: 'Số thứ tự',
            render: (_, __, rowIndex) => (
                <span className='span-table'>{rowIndex + 1}</span>
            )
        },
        {
            title: 'Mã đơn hàng',
            key: 'orderId',
            render: (_, record) => (
                <div style={{ fontSize: 12, fontStyle: 'italic' }}>
                    {record.orderId}
                </div>
            )
        },
        {
            title: 'Tài khoản mua',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Thời gian',
            key: 'createdAt',
            render: (_, record) => (
                <div>
                    {new Date(record.createdAt).toLocaleDateString('en-GB')}
                </div>
            )
        },
        {
            title: 'Số lượng sản phẩm',
            key: 'totalProduct',
            render: (_, record) => (
                <div style={{ textAlign: 'center' }}>
                    {record.totalProduct}
                </div>
            )
        },
        {
            title: 'Giá (VNĐ)',
            key: 'totalPrice',
            render: (_, record) => (
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    {Utils.formatMoney(record.totalPrice) + ' VND'}
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

    //   useEffect(()=>{
    //     setOpenModal(true)
    //   },[detailBill])

    const dispatch = useDispatchRoot()

    const handleDetail = (record: any) => {
        console.log('record', record);

        const bodyrequest = {
            id: record.id,
            //   currentSearchValue: currentSearchValue
        }
        dispatch(getDetailBillRequests(bodyrequest));
        setOpenModal(true)
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



    useEffect(() => {
        console.log('detailBill', detailBill);

    }, [detailBill])

    return (
        <motion.div className='sketch-main'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            {
                (detailBill && openModal) &&
                <Modal
                    open={openModal}
                    onOk={() => setOpenModal(false)}
                    okText={'Xác nhận'}
                    cancelText={'Đóng'}
                    closable={true}
                    onCancel={() => setOpenModal(false)}
                    title={'Chi tiết đơn hàng'}
                >
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Tổng tiền:</div>
                            <div>{Utils.formatMoney(detailBill.totalPrice) + ' VND'}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Tạo lúc: </div>
                            <div>{detailBill.createdAt}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Mã đơn hàng:</div>
                            <div>{detailBill.orderId}</div>
                        </div>
                        {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Hình thức thanh toán:</div>
                            <div>{detailBill.paymentMethods}</div>
                        </div> */}
                        <Divider>Thông tin người mua</Divider>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Email:</div>
                                <div>{detailBill.user_buy.email}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Tên:</div>
                                <div>{detailBill.user_buy.name}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Địa chỉ:</div>
                                <div>{detailBill.user_buy.address}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Số điện thoại:</div>
                                <div>{detailBill.user_buy.phone}</div>
                            </div>
                        </div>
                        <Divider>Danh sách sản phẩm</Divider>
                        <div style={{ padding: '10px' }}>
                            {detailBill.products.map((item: any, index: number) => {
                                return (
                                    <div style={{ marginBottom: '30px' }}>
                                        <div><b>Sản phẩm {index + 1}:</b>

                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Tiêu đề:</div>
                                                <div>{item.title}</div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Giá:</div>
                                                <div>{Utils.formatMoney(item.price) + ' VND'}</div></div>
                                            <div>
                                                <img style={{ width: "200px" }} src={item.image} />
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