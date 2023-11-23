import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { useSelectorRoot, useDispatchRoot } from '../../../redux/store';
import { getOverviewStatisticRequest } from '../../../redux/controller';
import UserIcon from '../../../images/3 User.png'
import ShopIcon from '../../../images/shop.png'
import CoinIcon from '../../../images/coin.png'
import BillIcon from '../../../images/bill.png';
import TotalBox from '../../../components/TotalBox/TotalBox';
import './style-sellergeneral.scss'
import Statistical from '../../../components/Statistical/Statistical';
import StatisticalProduct from '../../../components/Statistical/StatisticalProduct';
const SellerGeneral = () => {

	const { overViewStatistic } = useSelectorRoot((state) => state.sketch); // lấy ra state từ store
	const dispatch = useDispatchRoot() // dispatch action   
	const [TotalBoxData, setTotalBoxData] = useState<any>([]) // state của component

	// Gọi api lấy ra tổng số người bán, người mua, tổng doanh thu
	useEffect(() => {
		dispatch(getOverviewStatisticRequest());
	}, [])

	// Gán dữ liệu vào state của component
	useEffect(() => {
		if (overViewStatistic) {
			const tmp = [
				{
					title: "Tổng doanh thu",
					number: overViewStatistic.totalRevenue,
					icon: CoinIcon
				},
				{
					title: "Tổng đơn đặt hàng",
					number: overViewStatistic.totalOrder,
					icon: ShopIcon
				},
				{
					title: "Tổng sản phẩm",
					number: overViewStatistic.totalProduct,
					icon: ShopIcon
				},
				// {
				// 	title: "Lượt phản hồi a",
				// 	number: overViewStatistic.totalUser,
				// 	icon: UserIcon
				// },
			]
			setTotalBoxData(tmp)
		}
	}, [overViewStatistic])

	return (
		<motion.div
			className="main-general"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div className='total-boxs'>
				{TotalBoxData.map((item: { title: string; number: number; icon: any }, index: React.Key | null | undefined) => (
					<TotalBox
						key={index}
						title={item.title}
						number={item.number}
						icon={item.icon}
					/>
				))}
			</div>
			<div className='general-static'>
				<Statistical />
				<StatisticalProduct />
			</div>
		</motion.div>
	)
}

export default SellerGeneral