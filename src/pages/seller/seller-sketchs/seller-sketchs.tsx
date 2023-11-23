import React, { useEffect, useState } from 'react'
import { useDispatchRoot, useSelectorRoot } from '../../../redux/store';
import { createWithdrawRequest, deleteSketchRequest, getSketchByArchitectRequest, getSketchStatisticRequest } from '../../../redux/controller';
import { Space, Modal, Input, Button } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import { IGetWithdrawRequest } from '../../../common/user.interface';
import Utils from '../../../common/utils';
import CTable from '../../../components/CTable/CTable';
import { QUERY_PARAM } from '../../../constants/get-api.constants';
import { IFilteredSketch, ISketch, IUploadSketchRequest } from '../../../common/sketch.interface';
import TotalBox from '../../../components/TotalBox/TotalBox';
import SketchCancel from '../../../images/seller-product/document-cancel.png'
import Sketch from '../../../images/seller-product/document-text.png'

import './seller-sketchs.styles.scss'
import CModalEditSketch from '../../../components/ModalEditSketch/CModalEditSketch';

const SellerSketchs = () => {
    const {
        sketchsOfArchitect,
        totalSketchRecords,
        sketchStatistic,
    } = useSelectorRoot((state) => state.sketch);

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

            getSketchByArchitectRequest(currentSearchValue)
        )
        dispatch(

            getSketchStatisticRequest()
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
            title: 'Phong cách',
            dataIndex: 'designStyle',
            key: 'designStyle',
            render: (_, record) => (
                <span>{record.designStyle.name}</span>
            )
        },
        {
            title: 'Kiến trúc',
            dataIndex: 'typeOfArchitecture',
            key: 'typeOfArchitecture',

            render: (_, record) => (
                <span>{record.typeOfArchitecture.name}</span>
            )
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (_, record) => (
                <img src={record.image} style={{ width: "150px" }} />
            )
        },
        //   {
        //     title: 'updatedAt',
        //     dataIndex: 'updatedAt',
        //     key: 'updatedAt',
        // },


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
    //       title: "Tổng số bản vẽ toàn sàn",
    //       number: sketchStatistic?.totalSketch ? sketchStatistic?.totalSketch : 0,
    //       icon: UserIcon,
    //   },

    //   {
    //       title: "Tổng số bản vẽ mới",
    //       number: sketchStatistic?.totalNewSketch ? sketchStatistic?.totalNewSketch : 0,
    //       icon: UserMinus,
    //   },
    // ]

    const dispatch = useDispatchRoot()

    const handleOpenDelete = (record: any) => {
        setOpenModalDelete(true);
        setIdSketch(record.id)
    }

    const handleOpenEdit = (record: any) => {
        setOpenModalEdit(true);
        console.log(record)
        const selectedSketch: IUploadSketchRequest =  {
            title: record.title,
            price: record.price,
            content: record.content,
            productDesignTools: record.designTools[0].id,
            productTypeOfArchitecture: record.typeOfArchitecture.id,
            id: record.id
        };
        setEditSketch(selectedSketch);
    }

    const handleDelete = () => {

        const bodyrequest = {

            productId: idSketch,
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
        console.log('hehee')
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
        dispatch(getSketchByArchitectRequest(finalBody))
    }

    const onChangePagination = (event: any) => {
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
        setCurrentSearchValue(currentSearchValue);
        dispatch(getSketchByArchitectRequest(currentSearchValue))
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
                        <span>Bạn có chắc chắn muốn xóa bản vẽ này không?</span>
                    </Modal>
                </div>
            }
            <div className='statistic-area'>
                <TotalBox
                    key={1}
                    title={'Tổng số sản phẩm'}
                    number={sketchStatistic?.totalProduct ? sketchStatistic?.totalProduct : 0}
                    icon={Sketch}
                />
                <TotalBox
                    key={1}
                    title={'Số sản phẩm bị ẩn'}
                    number={sketchStatistic?.totalHiddenProduct ? sketchStatistic?.totalHiddenProduct : 0}
                    icon={SketchCancel}
                />
            </div>
            <div className='table-area'>
                <CTable
                    tableMainTitle='Danh sách bản vẽ của bạn'
                    allowDateRangeSearch={true}
                    allowTextSearch={true}
                    onChangeInput={onChangeInput}
                    onChangeRangePicker={onChangeRangePicker}
                    onSearch={onSearch}
                    data={sketchsOfArchitect}
                    titleOfColumnList={columns}
                    totalRecord={totalSketchRecords}
                    onChangePagination={onChangePagination}
                />
            </div>
        </motion.div>
    )
}

export default SellerSketchs