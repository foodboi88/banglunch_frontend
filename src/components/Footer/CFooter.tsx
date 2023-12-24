import { useEffect, useState } from "react";
import Image1 from "../../images/footer/image1.png";
import Image2 from "../../images/footer/image2.png";
import Logo from "../../images/header/logo.png";
import "./styles.footer.scss";
const hoverVariants = {
    hover: {
        scale: 1.1,
        opacity: 0.8,
        fontWeight: "bold",
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 2
        },

    },
    tap: {
        scale: 0.8
    },
};
// Phần footer của trang web
export default function CFooter() {

    const [isReponsive, setIsReponsive] = useState(false);

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);
        if (window.innerWidth > 400) {
            setIsReponsive(false);
        }
        if (window.innerWidth <= 400) {
            setIsReponsive(true);
        }
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });
    return (
        <div>
            <footer className="footer">
            </footer>
            <div className="row-3">
            </div>

        </div>
    );
}