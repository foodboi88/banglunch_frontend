
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";

import { useNavigate } from "react-router-dom";
import "./styles.architectcard.scss";
import Utils from "../../common/utils";
import ImageNotFound from "../../images/Image_not_available.png";
import { useSelectorRoot } from "../../redux/store";
interface props {
    imageUrl?: string;
    name: string;
    email?: string;
    type?: string;
    index?: number;
}

const CArchitectCard = (props: props) => {
    const { cloneToolList } = useSelectorRoot(
        (state) => state.sketch
    ); // Lst cac ban ve
    const navigate = useNavigate();
    function padNumberWithZero(number: any, width: any) {
        // Convert the number to a string
        let numberStr = number.toString();

        // Calculate the number of zeros to add
        let zerosToAdd = width - numberStr.length;

        // Add leading zeros
        if (zerosToAdd > 0) {
            numberStr = '0'.repeat(zerosToAdd) + numberStr;
        }

        return numberStr;
    }
    return (
        <div className="card-main">
            <img className="image-card" alt="example" src={props.imageUrl ? props.imageUrl : ImageNotFound} />

            {/* <Card
                className="card"
                hoverable
                cover={
                    <div className="image-main">
                        
                        <img className="image-card" alt="example" src={props.imageUrl ? props.imageUrl : ImageNotFound} />
                    </div>
                }
            > */}
            {/* <div className="title-and-price">
                    <Meta
                        title={
                            <div className="home-card-title">
                                <div className="h-c-t-title">
                                    {props.name}
                                </div>
                                <div className="h-c-t-view-point">
                                 
                                </div>
                            </div>
                        }
                    />
                </div> */}
            {/* </Card> */}

        </div >
    );
};

export default CArchitectCard;
