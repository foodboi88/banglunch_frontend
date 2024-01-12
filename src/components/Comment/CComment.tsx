import { Button, Rate } from 'antd'
import { useEffect, useState } from 'react'
import Avatar from '../../images/detail/avatar.png'

import { motion } from 'framer-motion'
import { useSelectorRoot } from '../../redux/store'
import './styles.comment.scss'

interface MyProps {
    setSummarizedComments: React.Dispatch<React.SetStateAction<number>>
}

const buttonArray = [0,1,2,3,4,5,6,7,8,9,10]

const CComment = (props: MyProps) => {
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
        props.setSummarizedComments(buttonNumber)
    };
    return (
        <div className='main-comment'>
            <div className='title'>Bình luận ({currentCommentList?.length ? currentCommentList.length : 0})</div>
            <div className='btn-group-and-total-rate'>
                <Button.Group>
                    {
                        buttonArray.map(item =>
                            {
                                return <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}>
                                    <Button
                                        type={activeButton === item ? 'primary' : 'default'}
                                        onClick={() => handleButtonClick(item)}
                                    >
                                        {item === 0 ? "Tất cả" : item + ' sao'}
                                    </Button>
                                </motion.div>
                            } 
                        )
                    }
                </Button.Group>
                <div
                    className='total-rate'
                >

                    <div className='number'>{ratesLst?.averageRate?.toString().slice(0,4)}</div>
                    <Rate
                        allowHalf
                        // defaultValue={ratesLst?.rateProduct}
                        count={10}
                        disabled
                        value={ratesLst?.averageRate}
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
                                    <div className='name'>{item.username}</div>
                                    <div>
                                        <Rate
                                            allowHalf
                                            count={10}
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
        </div>
    )
}

export default CComment