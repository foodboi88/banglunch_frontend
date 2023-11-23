import { useEffect, useState } from 'react'
import { AiOutlineGift, AiOutlineLock, AiOutlineQuestionCircle, AiOutlineSetting } from 'react-icons/ai'
import { BiGridAlt } from 'react-icons/bi'
import { BsShop } from 'react-icons/bs'

import './style.profile.scss'
import { Outlet, useNavigate } from 'react-router-dom'
const Profile = () => {
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
                    <span className='profile-navbar-item-text'>Sản phẩm đã mua</span>
                </div>


                <div className={'profile-navbar-item' + (active === 6 ? ' active' : '')} onClick={() => setActive(6)}>
                    <AiOutlineGift className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Kho Voucher</span>
                </div>
                <div className={'profile-navbar-item' + (active === 7 ? ' active' : '')} onClick={() => setActive(7)}>
                    <AiOutlineQuestionCircle className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Hỗ trợ</span>
                </div>
                <div className={'profile-navbar-item' + (active === 4 ? ' active' : '')}
                    onClick={() => {
                        setActive(4)
                        navigate('/buyer/change-password')
                    }}

                >
                    <AiOutlineLock className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Thay đổi mật khẩu</span>
                </div>
                <div className={'profile-navbar-item' + (active === 2 ? ' active' : '')} onClick={() => setActive(2)}>
                    <AiOutlineSetting className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Cài đặt chung</span>
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
            {/* {active === 1 &&
                <ProfileResume />
            }

            {active === 3 &&
                <ProfileBecomeSeller />
            } */}
        </div>
    )
}

export default Profile