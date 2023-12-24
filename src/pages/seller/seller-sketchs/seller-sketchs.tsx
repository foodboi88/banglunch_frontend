import { Button, Modal, Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IGetWithdrawRequest } from '../../../common/user.interface';
import Utils from '../../../common/utils';
import CTable from '../../../components/CTable/CTable';
import { QUERY_PARAM } from '../../../constants/get-api.constants';
import { deleteSketchRequest, getSketchListByAuthorIdRequest } from '../../../redux/controller';
import { useDispatchRoot, useSelectorRoot } from '../../../redux/store';

import { IFood } from '../../../common/food.interface';
import CModalEditSketch from '../../../components/ModalEditSketch/CModalEditSketch';
import './seller-sketchs.styles.scss';
import { useNavigate } from 'react-router-dom';

const SellerSketchs = () => {
    const navigate = useNavigate();
    const {
        totalSketchRecords,
        shopDetail
    } = useSelectorRoot((state) => state.sketch);

    const {
        userId
    } = useSelectorRoot((state) => state.login);

    const [textSearch, setTextSearch] = useState('');
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [idSketch, setIdSketch] = useState('');
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [editSketch, setEditSketch] = useState<any>()

    const [currentSearchValue, setCurrentSearchValue] = useState<IGetWithdrawRequest>(
        {
            size: QUERY_PARAM.size,
            offset: 0
        }
    )

    useEffect(() => {
        dispatch(
            getSketchListByAuthorIdRequest(userId)
        )
    }, [])



    const columns: ColumnType<IFood>[] = [
        {
            title: 'Số thứ tự',
            render: (_, __, rowIndex) => (
                <span className='span-table'>{rowIndex + 1}</span>
            )
        },
        {
            title: 'Tên',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => (
                <span style={{ whiteSpace: 'nowrap', display: 'flex', justifyContent: 'end' }}>{Utils.formatMoney(record.price) + ' VND'}</span>
            )
        },
        {
            title: 'Tạo lúc',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, record) => (
                <span>{new Date(record.createdAt).toLocaleDateString('en-GB')}</span>
            )
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (_, record) => (
                <img src={record.galleries[0] ? record.galleries[0]?.filePath : ''} style={{ width: "150px" }} />
            )
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={(event) => handleOpenEdit(record)}>Sửa</a>
                    <a onClick={(event) => handleOpenDelete(record)}>Xóa</a>
                </Space>
            ),
        },
    ];

    // let statisticalUser = [
    //   {
    //       title: "Tổng số món ăn toàn sàn",
    //       number: sketchStatistic?.totalSketch ? sketchStatistic?.totalSketch : 0,
    //       icon: UserIcon,
    //   },

    //   {
    //       title: "Tổng số món ăn mới",
    //       number: sketchStatistic?.totalNewSketch ? sketchStatistic?.totalNewSketch : 0,
    //       icon: UserMinus,
    //   },
    // ]

    const dispatch = useDispatchRoot()

    const handleOpenDelete = (record: any) => {
        setOpenModalDelete(true);
        setIdSketch(record._id)
    }

    const handleOpenEdit = (record: IFood) => {
        setOpenModalEdit(true);
        console.log(record)
        const selectedSketch: any =  {
            title: record.title,
            price: record.price,
            content: record.content,
            id: record._id,
            category: record.food_categories[0] ? record.food_categories[0]?.categoryId : ''
        };
        setEditSketch(selectedSketch);
    }

    const handleDelete = () => {

        const bodyrequest = {

            foodId: idSketch,
            currentSearchValue: currentSearchValue
        }
        dispatch(deleteSketchRequest(bodyrequest));
        setOpenModalDelete(false);
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
        const body: IGetWithdrawRequest = {
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
        // dispatch(getSketchByArchitectRequest(finalBody))
    }

    const onChangePagination = (event: any) => {
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
        setCurrentSearchValue(currentSearchValue);
        // dispatch(getSketchByArchitectRequest(currentSearchValue))
    }

    const routerToUpload = () => {
        navigate(`/seller/upload`);

    }

    return (
        <motion.div className='sketch-main'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>

            {
                openModalEdit && editSketch &&
                <CModalEditSketch
                    open={openModalEdit}
                    data={editSketch}
                    setOpenModalEdit = {setOpenModalEdit}
                />

            }
            {
                openModalDelete &&
                <div className='approve-request-modal'>
                    <Modal
                        open={openModalDelete}
                        onOk={handleDelete}
                        okText={'Xác nhận'}
                        cancelText={'Hủy'}
                        closable={true}
                        onCancel={() => setOpenModalDelete(false)}
                        
                    >
                        <span>Bạn có chắc chắn muốn xóa đồ ăn này không?</span>
                    </Modal>
                </div>
            }
            <div className='table-area'>
                <div className='button'>
                    <div></div>
                    <Button onClick={routerToUpload}>Upload đồ ăn</Button>
                </div>
                <CTable
                    tableMainTitle='Danh sách đồ ăn của quán'
                    // allowDateRangeSearch={true}
                    // allowTextSearch={true}
                    onChangeInput={onChangeInput}
                    onChangeRangePicker={onChangeRangePicker}
                    onSearch={onSearch}
                    data={shopDetail?.foods}
                    titleOfColumnList={columns}
                    totalRecord={totalSketchRecords}
                    onChangePagination={onChangePagination}
                />
            </div>
        </motion.div>
    )
}

export default SellerSketchs