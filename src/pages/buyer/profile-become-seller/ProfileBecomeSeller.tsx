import { Button, Radio } from 'antd'
import { useState } from 'react'
import BecomeSellerImage1 from '../../../images/become-seller-image1.png'
import BecomeSellerImage2 from '../../../images/become-seller-image2.png'
import FormCompany from './FormCompany'
import FormIndividuals from './FormIndividuals'
const ProfileBecomeSeller = () => {


    const [valueRadio, setValueRadio] = useState<number>(1)
    const [page, setPage] = useState<number>(1)


    const handleChangeValueRadio = (e: any) => {
        console.log(e.target.value);
        setValueRadio(e.target.value)
    }


    const handleSetPage = (value: number) => {
        setPage(value)
    }

    return (
        <>
            {page === 1 &&
                <div className='profile-content become-seller'>
                    <div className='profile-content-title'>Vui lòng lựa chọn ... của bạn!</div>
                    <div className='profile-content-option'>
                        <Radio.Group className='profile-content-option-group' name="radiogroup" defaultValue={1} onChange={handleChangeValueRadio}>
                            <div className='profile-content-option-item'>
                                <img src={BecomeSellerImage1} alt="" />
                                <Radio className='profile-content-option-item-radio' value={1} >Cá nhân (Kiến trúc sư)</Radio>
                            </div>
                            <div className='profile-content-option-item'>
                                <img src={BecomeSellerImage2} alt="" />
                                <Radio className='profile-content-option-item-radio' value={2}>Pháp nhân (Công ty kiến trúc, xây dựng)</Radio>
                            </div>
                        </Radio.Group>
                    </div>
                    <Button className='button-submit' type="primary" htmlType="submit"
                        onClick={() => {
                            document.body.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });
                            setPage(2)
                        }}>Tiếp tục</Button>
                </div>
            }
            {(page === 2 && valueRadio === 1) &&
                <FormIndividuals
                    setPage={handleSetPage}
                />
            }
            {(page === 2 && valueRadio === 2) &&
                <FormCompany
                    setPage={handleSetPage}
                />
            }
        </>
    )
}

export default ProfileBecomeSeller