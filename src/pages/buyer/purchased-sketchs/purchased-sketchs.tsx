import { Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderStatus } from '../../../common/order.constant';
import { IOrders } from '../../../common/order.interface';
import { IGetSketchRequest } from '../../../common/sketch.interface';
import { IGetUsersRequest } from '../../../common/user.interface';
import Utils from '../../../common/utils';
import CTable from '../../../components/CTable/CTable';
import { QUERY_PARAM } from '../../../constants/get-api.constants';
import { OrderStatusEnums } from '../../../enum/order.enum';
import { getPurchasedSketchsRequest } from '../../../redux/controller';
import { useDispatchRoot, useSelectorRoot } from '../../../redux/store';

const PurchasedSketchs = () => {
    const {
        totalPurchasedSketch,
        listPurchasedSketch,
        purchaseResponse
    } = useSelectorRoot((state) => state.sketch);
    const [openModal, setOpenModal] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dataBillLst, setDataBillLst] = useState<any[]>([]);
    const [currentSearchValue, setCurrentSearchValue] = useState<IGetSketchRequest>({ size: QUERY_PARAM.size, offset: 0 })

    const navigate = useNavigate();
    const dispatch = useDispatchRoot();

    const firstGetData = useCallback(() => {
    }, [])


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
                <div>
                    <Space size="middle">
                        <a onClick={(event) => handleDetail(record)}>Chi tiết</a>
                    </Space>
                    {
                        record.orderStatus === OrderStatusEnums.Shipping &&
                        <Space size="middle">
                            <a onClick={(event) => handleAddComment(record)}>Đánh giá</a>
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
        navigate(`/detail-sketch/${record?.product?.id}`)
    }

    const handleAddComment = (record: any) => {
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

            <div className='table-area'>
                <CTable
                    tableMainTitle='Danh sách sản phẩm đã mua'
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