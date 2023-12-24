import { useEffect, useState } from 'react';
import { AiOutlineGift, AiOutlineSetting } from 'react-icons/ai';
import { BiGridAlt } from 'react-icons/bi';
import { BsShop } from 'react-icons/bs';

import { Outlet, useNavigate } from 'react-router-dom';

import './seller-layout.styles.scss';
import { Switch } from 'antd';
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import { getShopStatusRequest, updateShopStatusRequest } from '../../redux/controller';

const SellerLayout = () => {
	const navigate = useNavigate();
	const [active, setActive] = useState<number>(0)
	const {shopStatus } = useSelectorRoot((state) => state.login);
	const [status, setStatus] = useState(false);
	const dispatch = useDispatchRoot()

	useEffect(() => {
		document.body.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}, [navigate]);

	useEffect(()=>{
		dispatch(getShopStatusRequest())
	},[])

	useEffect(() => {
		if (window.location.pathname === "/seller") setActive(1);
		if (window.location.pathname === "/seller/management-food") setActive(2);
		if (window.location.pathname === "/seller/order") setActive(3);
		if (window.location.pathname === "/seller/upload") setActive(6);
		if (window.location.pathname === "/seller/withdraw") setActive(7);
		if (window.location.pathname === "/seller/purchased-food") setActive(8);
		if (window.location.pathname === "/seller/cart") setActive(9);
		if (window.location.pathname === "/seller/profile") setActive(10);
		if (window.location.pathname === "/seller/change-password") setActive(13);
	}, []);

	useEffect(()=> {
		setStatus(shopStatus)
	},[shopStatus])

	const changeShopStatus = (event: any) => {
		console.log(event);
		const bodyRequest = {
			shopStatus: event,
			additionalProp1: {}
		  }
		dispatch(
            updateShopStatusRequest(bodyRequest)
        )
	}

	return (
		<div>
			<div className="main-profile">
				<div className='profile-navbar'>
					<div>
						Trạng thái quán: <Switch checkedChildren="Mở cửa" unCheckedChildren="Đóng cửa" onClick={changeShopStatus} checked={status} />
					</div>
					<div className={'profile-navbar-item' + (active === 1 ? ' active' : '')} onClick={() => {
						setActive(1)
						navigate('/seller')
					}}>
						<BiGridAlt className='profile-navbar-item-icon' />
						<span className='profile-navbar-item-text'>Tổng quan</span>
					</div>
					<div className={'profile-navbar-item' + (active === 2 ? ' active' : '')} onClick={() => {
						setActive(2)
						navigate("/seller/management-food")
					}}>
						<AiOutlineSetting className='profile-navbar-item-icon' />
						<span className='profile-navbar-item-text'>Quản lý đồ ăn</span>
					</div>
					<div className={'profile-navbar-item' + (active === 3 ? ' active' : '')} onClick={() => {
						setActive(3)
						navigate('/seller/order')
					}}>
						<BsShop className='profile-navbar-item-icon' />
						<span className='profile-navbar-item-text'>Quản lý đơn hàng</span>
					</div>
				</div>
				<div className='profile-content'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default SellerLayout