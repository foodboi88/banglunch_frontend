import React, { useEffect, useRef, useState } from 'react'
import './style.statistical.scss'
import { Button, DatePicker, notification } from 'antd'
import { motion } from 'framer-motion'
import StatisticalChart from './StatisticalChart'
import is from 'date-fns/esm/locale/is'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import { getOverviewStatisticDayRequest, getOverviewStatisticMonthRequest, getOverviewStatisticQuarterRequest, getOverviewStatisticSellerDayRequest, getOverviewStatisticUserDayRequest, getOverviewStatisticYearRequest, setViewStatistic } from '../../redux/controller'
import { IStatictisSellerDay, IStatictisUserDay } from '../../common/statistic.interface'
import moment from 'moment'
const { RangePicker } = DatePicker;

const Statistical = () => {

    const [dataChart, setDataChart] = useState<any>([]) // Biến lưu trữ dữ liệu thống kê
    const [startDate, setStartDate] = useState<string>('') // Biến lưu trữ ngày bắt đầu thống kê
    const [endDate, setEndDate] = useState<string>('') // Biến lưu trữ ngày kết thúc thống kê
    const dispatch = useDispatchRoot() // dispatch action
    const { overViewStatisticDay, overViewStatisticMonth, overViewStatisticQuarter, overViewStatisticYear, typeViewStatistic, overViewStatisticUserDay, overViewStatisticSellerDay } = useSelectorRoot((state) => state.sketch); // lấy ra state từ store

    const [dataUserChart, setDataUserChart] = useState<IStatictisUserDay>() // Biến lưu trữ dữ liệu thống kê
    const [dataSellerChart, setDataSellerChart] = useState<IStatictisSellerDay>() // Biến lưu trữ dữ liệu thống kê
    const [startDateUser, setStartDateUser] = useState<string>('') // Biến lưu trữ ngày bắt đầu thống kê
    const [endDateUser, setEndDateUser] = useState<string>('') // Biến lưu trữ ngày kết thúc thống kê

    useEffect(() => {
        switch (typeViewStatistic) {
            case 'day':
                setStartDate(moment().subtract(7, 'days').format('YYYY-MM-DD'))
                setEndDate(moment().format('YYYY-MM-DD'))
        }
    }, [typeViewStatistic])

    useEffect(() => {
        if (startDateUser && endDateUser) {
            if (isDateRangeValid4Day(startDateUser, endDateUser)) {
                const req = {
                    startTime: startDateUser,
                    endTime: endDateUser
                }
                dispatch(getOverviewStatisticUserDayRequest(req))
                dispatch(getOverviewStatisticSellerDayRequest(req))
            }
            else {
                notification.error({
                    message: 'Lấy dữ liệu không thành công',
                    description: 'Khoảng thời gian thống kê không được vượt quá 7 ngày',
                });
            }
        }
    }, [startDateUser, endDateUser])

    useEffect(() => {
        console.log(overViewStatisticUserDay, overViewStatisticSellerDay);

        overViewStatisticUserDay && setDataUserChart(overViewStatisticUserDay);
        overViewStatisticSellerDay && setDataSellerChart(overViewStatisticSellerDay);
    }, [overViewStatisticUserDay, overViewStatisticSellerDay])

    useEffect(() => {
        console.log(dataUserChart, dataSellerChart);

    }, [dataUserChart, dataSellerChart])

    // Hàm gọi khi thay đổi ngày thống kê
    const handleChangeDate = (date: any) => {
        if (date) {
            setStartDate(date[0].format('YYYY-MM-DD'))
            setEndDate(date[1].format('YYYY-MM-DD'))
        }

    }

    const handleChangeDateUser = (date: any) => {
        if (date) {
            setStartDateUser(date[0].format('YYYY-MM-DD'))
            setEndDateUser(date[1].format('YYYY-MM-DD'))
        }
    }

    const isDateRangeValid = (startDate: string, endDate: string) => {
        const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffInDays = Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay));
        return diffInDays <= 7;
    }
    const isDateRangeValid4Day = (startDate: string, endDate: string) => {
        const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffInDays = Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay));
        return diffInDays <= 4;
    }


    useEffect(() => {
        if (startDate && endDate) {
            console.log(startDate, endDate);
            if (typeViewStatistic === 'day') {
                if (isDateRangeValid(startDate, endDate)) {
                    console.log(startDate, endDate);
                    const req = {
                        startDay: startDate,
                        endDay: endDate
                    }
                    dispatch(getOverviewStatisticDayRequest(req))
                }
                else {
                    notification.error({
                        message: 'Lấy dữ liệu không thành công',
                        description: 'Khoảng thời gian thống kê không được vượt quá 7 ngày',
                    });
                }
            }
            if (typeViewStatistic === 'month') {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const req = {
                    startMonth: start.getMonth() + 1,
                    startYear: start.getFullYear(),
                    endMonth: end.getMonth() + 1,
                    endYear: end.getFullYear(),
                }
                dispatch(getOverviewStatisticMonthRequest(req))
            }

            if (typeViewStatistic === 'quarter') {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const req = {
                    startQuarter: Math.floor(start.getMonth() / 3) + 1,
                    startYear: start.getFullYear(),
                    endQuarter: Math.floor(end.getMonth() / 3) + 1,
                    endYear: end.getFullYear(),
                }
                dispatch(getOverviewStatisticQuarterRequest(req))
            }

            if (typeViewStatistic === 'year') {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const req = {
                    startYear: start.getFullYear(),
                    endYear: end.getFullYear(),
                }
                dispatch(getOverviewStatisticYearRequest(req))
            }
        }

    }, [startDate, endDate])

    useEffect(() => {
        overViewStatisticDay && setDataChart(overViewStatisticDay);
    }, [overViewStatisticDay])

    useEffect(() => {
        overViewStatisticMonth && setDataChart(overViewStatisticMonth);
    }, [overViewStatisticMonth])

    useEffect(() => {
        overViewStatisticQuarter && setDataChart(overViewStatisticQuarter);
    }, [overViewStatisticQuarter])

    useEffect(() => {
        overViewStatisticYear && setDataChart(overViewStatisticYear);
    }, [overViewStatisticYear])

    return (
        <div className='main-div' >
            <div className="main-statistical">
                <div className="statistical-title">
                    <div className='title-text'>
                        Báo cáo doanh thu
                    </div>
                    <div className='type-statistical'>
                        <div className='type-lst'>

                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`type-item ${typeViewStatistic === 'day' ? 'active' : ''}`}
                                onClick={() => dispatch(setViewStatistic('day'))}
                            >
                                Ngày
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`type-item ${typeViewStatistic === 'month' ? 'active' : ''}`}
                                onClick={() => dispatch(setViewStatistic('month'))}
                            >
                                Tháng
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`type-item ${typeViewStatistic === 'quarter' ? 'active' : ''}`}
                                onClick={() => dispatch(setViewStatistic('quarter'))}
                            >
                                Quý
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`type-item ${typeViewStatistic === 'year' ? 'active' : ''}`}
                                onClick={() => dispatch(setViewStatistic('year'))}
                            >
                                Năm
                            </motion.div>
                        </div>
                        <div className='picker'>
                            {typeViewStatistic === 'day' &&
                                <RangePicker placeholder={['Ngày bắt đầu', 'Ngày kết thúc']} onChange={handleChangeDate}
                                    defaultValue={[moment().subtract(7, 'days'), moment()]}
                                />
                            }

                            {typeViewStatistic === 'month' &&
                                <RangePicker placeholder={['Tháng bắt đầu', 'Tháng kết thúc']} onChange={handleChangeDate} picker="month" />
                            }

                            {typeViewStatistic === 'quarter' &&
                                <RangePicker placeholder={['Quý bắt đầu', 'Quý kết thúc']} onChange={handleChangeDate} picker="quarter" />
                            }

                            {typeViewStatistic === 'year' &&
                                <RangePicker placeholder={['Năm bắt đầu', 'Năm kết thúc']} onChange={handleChangeDate} picker="year" />
                            }
                        </div>

                    </div>
                </div>
                <StatisticalChart
                    data={dataChart}
                />
            </div>
        </div>
    )
}

export default Statistical