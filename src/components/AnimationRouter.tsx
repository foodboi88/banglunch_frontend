import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import BuyerLayout from "../layouts/buyer/buyer-layout";
import SellerLayout from "../layouts/seller/seller-layout";
import ActiveAccount from "../pages/ActiveAccount/ActiveAccount";
import AdvancedSeaching from "../pages/AdvancedSearching/AdvancedSeaching";
import AuthorPage from "../pages/AuthorPage/AuthorPage";
import Cart from "../pages/Cart/Cart";
import DetailSketch from "../pages/DetailSketch/DetailSketch";
import ProfileBecomeSeller from "../pages/buyer/profile-become-seller/ProfileBecomeSeller";
import ProfileResume from "../pages/buyer/profile-resume/ProfileResume";
import PurchasedSketchs from "../pages/buyer/purchased-sketchs/purchased-sketchs";
import Home from "../pages/home/Home";
import PurchaseSuccessfully from "../pages/purchased-successfully/purchased-successfully";
import UploadSketch from "../pages/seller/UploadSketch/UploadSketch";
import SellerBill from "../pages/seller/seller-bill/seller-bill";
import SellerGeneral from "../pages/seller/seller-general/seller-general";
import SellerSketchs from "../pages/seller/seller-sketchs/seller-sketchs";
import ChangePassword from "./ChangePassword/ChangePassword";
import PrivateBuyerRoutes from "./PrivateBuyerRoutes";
import PrivateSellerRoutes from "./PrivateSellerRoutes";

// Dùng để set animation cho các router với nhau
const AnimationRouter = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>

                {/* Chủ quán - quán ăn */}
                <Route element={<PrivateSellerRoutes />}>
                    <Route path="/seller" element={<SellerLayout />}>
                        <Route path="/seller" element={<SellerGeneral />}></Route>
                        <Route path="/seller/upload" element={<UploadSketch />}></Route>
                        <Route path="/seller/order" element={<SellerBill />}></Route>
                        <Route path="/seller/management-food" element={<SellerSketchs />}></Route>
                    </Route>
                </Route>


                {/* Trang người mua */}
                <Route element={<PrivateBuyerRoutes />}>

                    <Route path="/buyer" element={<BuyerLayout />}>
                        <Route path="/buyer/purchased-food" element={<PurchasedSketchs />}></Route>
                        <Route path="/buyer/cart" element={<Cart />}></Route>
                    </Route>
                </Route>

                {/* Public route */}
                <Route path="/" element={<Home />}></Route>
                <Route path="/searching" element={<AdvancedSeaching />}></Route>
                <Route
                    path="/detail-food/:foodId"
                    element={<DetailSketch />}
                ></Route>
                <Route
                    path="/author-page/:authorId"
                    element={<AuthorPage />}
                ></Route>
                <Route path="/purchased-successfully" element={<PurchaseSuccessfully />}></Route>

                <Route path="*" element={<ActiveAccount />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimationRouter;