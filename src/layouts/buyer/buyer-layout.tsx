import { useEffect, useState } from 'react';
import { BiGridAlt } from 'react-icons/bi';
import { BsShop } from 'react-icons/bs';
import { Outlet, useNavigate } from 'react-router-dom';
import './buyer-layout.styles.scss';


const BuyerLayout = () => {
  const [active, setActive] = useState<number>(0)
    const navigate = useNavigate();
    useEffect(() => {
        if (window.location.pathname === "/buyer") setActive(1);
        if (window.location.pathname === "/buyer/become-seller") setActive(3);
        if (window.location.pathname === "/buyer/purchased-sketchs") setActive(5);
        if (window.location.pathname === "/buyer/cart") setActive(8);
        if (window.location.pathname === "/buyer/change-password") setActive(4);

    }, []);

    return (
        <div className="main-profile">
            <div className='profile-navbar'>
                <div className={'profile-navbar-item' + (active === 1 ? ' active' : '')} onClick={() => {
                    setActive(1)
                    navigate('/buyer')
                }
                }>
                    <BiGridAlt className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Hồ sơ cá nhân</span>
                </div>
                <div className={'profile-navbar-item' + (active === 8 ? ' active' : '')} onClick={() => {
                    setActive(8)
                    navigate('/buyer/cart')
                }
                }>
                    <BsShop className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Giỏ hàng</span>
                </div>
                <div className={'profile-navbar-item' + (active === 5 ? ' active' : '')} onClick={() => {
                    setActive(5)
                    navigate('/buyer/purchased-sketchs')
                }
                }>
                    <BsShop className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Lịch sử mua hàng</span>
                </div>
                <div className={'profile-navbar-item' + (active === 3 ? ' active' : '')} onClick={() => {
                    setActive(3)
                    navigate('/buyer/become-seller')
                }
                }>
                    <BsShop className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Trở thành người bán</span>
                </div>
            </div>
            <div className='profile-content'>
                <Outlet />
            </div>
        </div>
    )
}

export default BuyerLayout