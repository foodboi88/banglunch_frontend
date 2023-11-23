import { Pagination } from 'antd'
import React from 'react'

interface MyProps {
    total?: number;
    onChange?: (page: number) => void;
    currentPage?: number;
    pageSize?: number;
}

const CPagination = (props: MyProps) => {
    return (
        <Pagination
            pageSize={props.pageSize ? props.pageSize : 12}
            current={props.currentPage}
            onChange={props.onChange}
            total={props.total}
        />
    )
}

export default CPagination
