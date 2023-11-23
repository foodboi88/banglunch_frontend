import React from 'react'
import './style.totalboxuser.scss'
interface ITotalBoxUserProps {
    title: string,
    number: number,
    icon: string
}


const TotalBoxUser = (props: ITotalBoxUserProps) => {
    return (
        <div className="total-box-user">
            <div className='total-box-user-content'>
                <div className="number">{props.number.toLocaleString()}</div>
                <div className="title">{props.title}</div>
            </div>
            <div className="total-box-user-icon">
                <img src={props.icon} alt="" />
            </div>
        </div>
    )
}

export default TotalBoxUser