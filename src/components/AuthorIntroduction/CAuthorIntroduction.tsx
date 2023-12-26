import { Badge, Button } from "antd";
import { motion } from "framer-motion";
import { IAuthor } from "../../common/user.interface";
import Avatar from "../../images/advance-searching/avatar1.png";
import "./styles.authorintro.scss";

const CAuthorIntroduction = (props: IAuthor) => {
    function formatDate(date: string) {
        return date.slice(0, 10);
    }

    // useEffect(()=>{
    //     props.createdAt = formatDate(props.createdAt)
    // },[])

    return (
        <div className="main-intro">
            <div className="left-side">
                <div className="avatar">
                    <img src={Avatar} />
                </div>
                <div className="name-status-contact">
                    <div className="name">{props.name}</div>
                    <div className="status">
                        <Badge status="success" text="Online" />
                    </div>
                    <div className="contact-and-view">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button className="contact">Liên hệ</Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button className="view">Xem trang</Button>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="right-side">
                <div className="grid-lst">
                    <div className="grid-item">
                        Địa chỉ: <strong>{props.address}</strong>
                    </div>
                    <div className="grid-item">
                        Số điện thoại: <strong>{props.phone}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CAuthorIntroduction;
