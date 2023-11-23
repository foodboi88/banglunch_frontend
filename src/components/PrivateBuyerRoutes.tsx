import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useSelectorRoot } from '../redux/store';
import { useEffect } from 'react';
import { notification } from 'antd';
import { ROLE } from '../enum/role.enum';

type Props = {
    children?: React.ReactNode
};

const PrivateBuyerRoutes = ({children}: Props) => {
    const {
        userRole
    } = useSelectorRoot((state) => state.login);
    const navigate = useNavigate();


    useEffect(()=>{
        if(userRole !== ROLE.BUYER){
            notification.open({
                message: "Bạn phải không phải người mua hàng",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
            // navigate('/')
        }
    },[userRole])

    return(
        (userRole === ROLE.BUYER) ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateBuyerRoutes