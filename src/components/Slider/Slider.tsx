import { useEffect, useState } from 'react';
import { getAllFilterCriteriasRequest } from '../../redux/controller';
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import './style.slider.scss';
const Slider = () => {
    const dispatch = useDispatchRoot();
    const { checkProductsFile, toolList, architectureList, styleList } = useSelectorRoot((state: { sketch: any; }) => state.sketch); // Lst cac ban ve        
    const [lstCategory, setLstCategory] = useState<any>([]); // Lst cac ban ve
    // useEffect(() => {
    // dispatch(getAllFilterCriteriasRequest());
    // });

    useEffect(() => {
        console.log('architectureList', architectureList);
        setLstCategory(architectureList)
    },);
    return (
        <div className='main-slider'>
            <div className='slider-category'>
                <div className='slider-category-title'>
                    <HiOutlineSquares2X2 />
                    <span>Tất cả danh mục sản phẩm</span>
                </div>
                {lstCategory?.map((item: any, index: any) => {
                    <div className='slider-category-item'>
                        {item.label}
                    </div>
                })}
            </div>
        </div>
    )
}

export default Slider