import { Button, Select } from 'antd';
import React, { useState } from 'react';
import './styles.arrangebar.scss';
import { motion } from 'framer-motion';
import {
    CaretDownOutlined,
} from '@ant-design/icons';
import { useDispatchRoot } from '../../redux/store';
import { sortFilteredSketchRequest } from '../../redux/controller';

const { Option } = Select;

const CArrangeBar = () => {
    const [activeButton, setActiveButton] = useState<string>('');
    const dispatch = useDispatchRoot()

    const handleButtonClick = (sortType: string) => {
        setActiveButton(sortType);
        dispatch(sortFilteredSketchRequest(sortType))
    };
    return (
        <div className='main-arrange'>
            <div className='title'>Sắp xếp theo</div>
            <Button.Group>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}>
                    <Button
                        type={activeButton === 'view' ? 'primary' : 'default'}
                        onClick={() => handleButtonClick('view')}
                    >
                        Xem nhiều nhất
                    </Button>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}>
                    <Button
                        type={activeButton === 'purchase' ? 'primary' : 'default'}
                        onClick={() => handleButtonClick('purchase')}
                    >
                        Mua nhiều nhất
                    </Button>
                </motion.div>
            </Button.Group>
            <div className='select-box'>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}>
                    <Select
                        suffixIcon={<CaretDownOutlined />}
                        placeholder="Chọn cách sắp xếp"
                        onChange={handleButtonClick}
                    >
                        <Option value='maxToMinPrice'>Giá từ cao đến thấp</Option>
                        <Option value='minToMaxPrice'>Giá từ thấp đến cao</Option>
                    </Select>

                </motion.div>
            </div>
        </div>
    )
}

export default CArrangeBar