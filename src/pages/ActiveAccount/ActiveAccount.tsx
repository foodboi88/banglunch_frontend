import React, { useEffect, useState } from 'react'
import './ActiveAccount.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatchRoot } from '../../redux/store';
import { checkActiveAccountRequest } from '../../redux/controller/login.slice';
import { ActiveAccountRequest } from '../../common/user.interface';

const ActiveAccount = () => {
    const [isNotFoundPage, setIsNotFoundPage] = useState<boolean>(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatchRoot();

    // Kiểm tra xem đường dẫn của trang có phải đường dẫn hợp lệ không
    useEffect(() => {
        console.log(window.location.pathname);
        if (window.location.pathname.includes("/active-account"))
            setIsNotFoundPage(false);
    }, [window.location.pathname])

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        const emailUser = queryParameters.get("email");
        const activeCode = queryParameters.get("activeCode");
        console.log(emailUser, activeCode);

        if (emailUser && activeCode) {
            const req: ActiveAccountRequest = {
                email: emailUser,
                activeCode: activeCode,
            }
            setTimeout(() => {
                dispatch(checkActiveAccountRequest(req));
            }, 7000);
        }
        if (!isNotFoundPage) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isNotFoundPage]);

    return (

        // {isNotFoundPage && }
        <div className='main-active-account'>
            {isNotFoundPage &&
                <div style={{ textAlign: 'center', marginTop: 100 }}>
                    <h1>404 Page Not Found</h1>
                    <p>The page you are looking for doesn't exist.</p>
                </div>
            }
            {!isNotFoundPage &&
                <div style={{ textAlign: 'center', marginTop: 100 }}>
                    <h1>Đang xử lý xác nhận đăng nhập</h1>
                    <p>Chuyển hướng đến trang đăng nhập, vui lòng chờ giây lát</p>
                </div>}
        </div>
    )
}

export default ActiveAccount