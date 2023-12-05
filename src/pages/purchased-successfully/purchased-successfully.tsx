import { Button, notification } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VnpayResponseCode } from '../../constants/purchase.constants'
import { useSelectorRoot } from '../../redux/store'
import './purchased-successfully.styles.scss'

const PurchaseSuccessfully = () => {
    const {
        userRole
      } = useSelectorRoot((state) => state.login);
    const navigate = useNavigate()
    // const dispatch = useDispatchRoot()
    const searchParams = new URLSearchParams(document.location.search);
    const [purchaseStatus, setPurchaseStatus] = useState('');

    useEffect(()=>{
        const status = searchParams.get('status');
        const code = searchParams.get('code');
    
        if(status && code){
            const response = VnpayResponseCode.find(item => item.code === code)
            setPurchaseStatus(response?.content || 'Giao dịch thất bại');
            notification.open({
                message: response?.content ? response?.content : "Giao dịch thất bại",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        }
        
    },[])

    const handleConfirmPurchased = () => {
        if(userRole === "user") navigate('/buyer/purchased-sketchs')
        else if(userRole === "seller") 	navigate('/seller/purchased-sketchs')
        else navigate('/')
    }

    return (
        <div
            className='main-container'
        >
            <div className='content-area'>
                <div className='container'>

                    <div className='title'>{purchaseStatus}</div>
                    <div className='button'>
                        <Button
                            onClick={()=>{
                                handleConfirmPurchased()
                            }}
                        >
                            Quay lại trang sản phẩm đã mua của bạn
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseSuccessfully