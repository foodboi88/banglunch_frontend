import { Button, DatePicker, Table } from 'antd';
import './ctable.styles.scss'

import React, { useEffect } from 'react'
import { ColumnsType } from 'antd/lib/table';
import Input from 'antd/lib/input/Input';
const { RangePicker } = DatePicker;

interface CTableProps {
    tableMainTitle?: string;
    allowTextSearch?: boolean;
    allowDateRangeSearch?: boolean;
    titleOfColumnList?: ColumnsType<any>;
    data?: any[];
    allowActionDetail?: boolean;
    allowActionBlock?: boolean;
    totalRecord: number;
    onChangeInput?: (event: any) => void;
    onChangeRangePicker?: (event: any) => void;
    onSearch?: () => void;
    onChangePagination: (event: any) => void;
    visiblePagination?: boolean;

}

const CTable = (props: CTableProps) => {
    useEffect(() => {
        console.log(Math.ceil(props?.totalRecord))

        console.log(Math.ceil(props?.totalRecord / 10))
    }, [])
    return (
        <div className='table-main'>
            <div className='title-and-search'>
                <div className='title'>{props.tableMainTitle}</div>
                {/* <div className='total'>Tổng số bản ghi: {props.totalRecord}</div> */}
                <div className='search-area'>
                    {
                        props.allowTextSearch &&
                        <Input
                            onChange={
                                (event) => {
                                    if (props.onChangeInput) props.onChangeInput(event)
                                }
                            }
                            placeholder='Nhập từ khóa tìm kiếm'
                        />
                    }
                    {
                        props.allowDateRangeSearch &&
                        <RangePicker
                            onChange={(event) => {
                                if (props.onChangeRangePicker) props.onChangeRangePicker(event)
                            }}
                            placeholder={['Từ ngày', 'Đến ngày']}
                        />
                    }
                    {
                        (props.allowDateRangeSearch ||
                            props.allowTextSearch) &&
                        <Button
                            onClick={() => {
                                if (props.onSearch) props.onSearch()
                            }}
                        >Tìm kiếm</Button>
                    }
                </div>
            </div>
            <div className='table'>

                <Table
                    columns={props.titleOfColumnList}
                    dataSource={props.data}
                    pagination={
                        {
                            total: props.totalRecord,
                            onChange: (event) => {
                                props.onChangePagination(event)

                            }
                        }
                    }
                />
            </div>
        </div>
    )
}

export default CTable