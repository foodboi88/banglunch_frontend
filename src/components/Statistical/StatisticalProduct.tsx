import React, { useEffect } from 'react'
import './style.statisticalproduct.scss'
import CTable from '../CTable/CTable'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import { getHotProductRequest } from '../../redux/controller'
import { IHotProducts } from '../../common/user.interface'
import { ColumnType } from 'antd/lib/table'
import { Tooltip } from 'antd'
import Utils from '../../common/utils'
const StatisticalProduct = () => {

    const columns: ColumnType<any>[] = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'title',
            key: 'title',
            render: (_, record) => (
                <div className='title-table'>
                    <img src={record.image} alt="" width={50} />
                    <Tooltip title={record.title}>
                        <span className='span-title-table' >{record.title}</span>
                    </Tooltip>
                </div>
            )
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => (
                <span style={{ display: 'flex', justifyContent: 'end' }}>{Utils.formatMoney(record.price) + ' VND'}</span>
            )
        },
        {
            title: 'Đã bán',
            dataIndex: 'quantityPurchased',
            key: 'quantityPurchased',
            render: (_, record) => (
                <span >{record.quantityPurchased}</span>
            )
        },
        {
            title: 'Doanh thu',
            dataIndex: 'revenue',
            key: 'revenue',
            render: (_, record) => (
                <span style={{ display: 'flex', justifyContent: 'end' }}>{Utils.formatMoney(record.price) + ' VND'}</span>
            )
        }

    ];
    const [numberProduct, setNumberProduct] = React.useState<number>(6)
    const [dataHotProducts, setDataHotProducts] = React.useState<any>([])
    const { hotProducts } = useSelectorRoot((state) => state.sketch); // lấy ra state từ store
    const dispatch = useDispatchRoot() // dispatch action       

    useEffect(() => {
        const req = {
            size: 6,
            offset: 0,
        }
        dispatch(getHotProductRequest(req));
    }, [])

    const onChangeInput = (event: any) => {
        console.log(event.target.value)
    }

    const onChangeRangePicker = (event: any) => {
        console.log(event)
    }

    const onSearch = () => {
        console.log('hehee')
    }

    const onChangePagination = (event: any) => {
        console.log(event)
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div className='main-static-product'>
            <div className="static-product-title">
                Top {hotProducts.length} sản phẩm bán chạy
            </div>
            <div className="static-product-content">
                <CTable
                    tableMainTitle=''
                    allowDateRangeSearch={false}
                    allowTextSearch={false}
                    onChangeInput={onChangeInput}
                    onChangeRangePicker={onChangeRangePicker}
                    onSearch={onSearch}
                    data={hotProducts}
                    titleOfColumnList={columns}
                    totalRecord={hotProducts.length}
                    onChangePagination={onChangePagination}
                />
            </div>
        </div>
    )
}

export default StatisticalProduct
