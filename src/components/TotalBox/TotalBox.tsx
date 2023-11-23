import React from 'react'
import './style.totalbox.scss'
import { motion } from 'framer-motion';


interface Props {
    title: string
    number: number | string
    icon: any
}

const TotalBox = (props: Props) => {
    return (
        <motion.div className='total-box'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <div className='total-box-icon' >
                <img src={props.icon} alt="" />
            </div >
            <div className='total-box-content'>
                <div className="total-box-title">
                    {props.title}
                </div>
                <div className="total-box-number">
                    {props.number.toLocaleString()}
                </div>
            </div>

        </motion.div >
    )
}

export default TotalBox