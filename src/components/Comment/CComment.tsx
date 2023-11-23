import { DownOutlined } from '@ant-design/icons'
import { Button, Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import Avatar from '../../images/detail/avatar.png'
import Avatar2 from '../../images/detail/avata-comment-2.png'
import Avatar3 from '../../images/detail/avata-comment-3.png'

import './styles.comment.scss'
import { motion } from 'framer-motion'
import { useSelectorRoot } from '../../redux/store'
import { ppid } from 'process'

const commentList = [
    {
        user: {
            name: "Bùi Thị Hương",
            avatar: Avatar,
        },
        comment: {
            content: "Lorem ipsum dolor sit amet consectetur. Ut scelerisque imperdiet fermentum amet nisl turpis ultricies lectus gravida. Id quam in egestas at eu et convallis. Dui velit pretium feugiat vel in tellus tempus platea. Vel turpis sapien pulvinar orci. Venenatis faucibus non aenean tellus amet tellus leo.",
            time: "3 phút trước",
            rate: 3
        }
    },
    {
        user: {
            name: "Nguyễn Hồ Tân",
            avatar: Avatar2,
        },
        comment: {
            content: "Lorem ipsum dolor sit amet consectetur. Ut scelerisque imperdiet fermentum amet nisl turpis ultricies lectus gravida. Id quam in egestas at eu et convallis. Dui velit pretium feugiat vel in tellus tempus platea. Vel turpis sapien pulvinar orci. Venenatis faucibus non aenean tellus amet tellus leo. Maecenas volutpat nisl pellentesque dis ultrices aliquet neque.",
            time: "1 ngày trước",
            rate: 2
        }
    },
    {
        user: {
            name: "Đỗ Đình Nam",
            avatar: Avatar3,
        },
        comment: {
            content: "Lorem ipsum dolor sit amet consectetur. Ut scelerisque imperdiet fermentum amet nisl turpis ultricies lectus gravida. Id quam in egestas at eu et convallis. Dui velit pretium feugiat vel in tellus tempus platea. Vel turpis sapien pulvinar orci. Venenatis faucibus non aenean tellus amet tellus leo. ",
            time: "02/12/2022",
            rate: 1
        }
    },
]

const CComment = () => {
    const [activeButton, setActiveButton] = useState<number>(0);
    const { ratesLst } = useSelectorRoot((state) => state.sketch); // Lấy ra dữ liệu detail sketch và danh sách comment từ redux
    const [currentCommentList, setCurrentCommentList] = useState(ratesLst?.items);

    useEffect(()=> {
        filterCommentByStar(activeButton);
    },[ratesLst])

    const filterCommentByStar = (buttonNumber: number) => {
        if (ratesLst) {

            if (buttonNumber === 0) {
                setCurrentCommentList(ratesLst?.items ? ratesLst?.items : [])
            } else {
                const cloneRateList = ratesLst
                setCurrentCommentList(cloneRateList?.items.filter(item => item.rate === buttonNumber));
            }
        }
    }

    const handleButtonClick = (buttonNumber: number) => {
        setActiveButton(buttonNumber);
        filterCommentByStar(buttonNumber)
    };
    return (
        <div className='main-comment'>
            <div className='title'>Bình luận ({ratesLst?.total ? ratesLst?.total: 0})</div>
            <div className='btn-group-and-total-rate'>
                <Button.Group>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                            type={activeButton === 0 ? 'primary' : 'default'}
                            onClick={() => handleButtonClick(0)}
                        >
                            Tất cả
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                            type={activeButton === 5 ? 'primary' : 'default'}
                            onClick={() => handleButtonClick(5)}
                        >
                            5 sao
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                            type={activeButton === 4 ? 'primary' : 'default'}
                            onClick={() => handleButtonClick(4)}
                        >
                            4 sao
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                            type={activeButton === 3 ? 'primary' : 'default'}
                            onClick={() => handleButtonClick(3)}
                        >
                            3 sao
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                            type={activeButton === 2 ? 'primary' : 'default'}
                            onClick={() => handleButtonClick(2)}
                        >
                            2 sao
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                            type={activeButton === 1 ? 'primary' : 'default'}
                            onClick={() => handleButtonClick(1)}
                        >
                            1 sao
                        </Button>
                    </motion.div>
                </Button.Group>
                <div
                    className='total-rate'
                >

                    <div className='number'>{ratesLst?.rateProduct}</div>
                    <Rate
                        allowHalf
                        // defaultValue={ratesLst?.rateProduct}
                        count={5}
                        disabled
                        value={ratesLst?.rateProduct}
                    />
                </div>
            </div>
            <div className='comment-list'>
                {
                    (currentCommentList && currentCommentList.length > 0)
                        ?
                        currentCommentList.map((item) => (
                            <div className='comment'>
                                <div className='avatar'>
                                    <img src={Avatar} />
                                </div>
                                <div className='content'>
                                    <div className='name'>{item.userName}</div>
                                    <div>
                                        <Rate
                                            allowHalf
                                            count={5}
                                            disabled
                                            value={item.rate}
                                        />
                                    </div>
                                    <div className='comment-content'>{item.description}</div>
                                    <div className='time'>{new Date(item.createdAt).toLocaleDateString('en-GB')}</div>
                                </div>
                            </div>
                        ))
                        :
                        <div className='comment'>
                            Chưa có đánh giá
                        </div>
                }
            </div>
            {/* <div className='more-comment'>
                <div className='text'>Xem thêm</div>
                <div className='icon'>
                    <DownOutlined />
                </div>
            </div> */}
        </div>
    )
}

export default CComment