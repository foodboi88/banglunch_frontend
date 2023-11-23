/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CheckboxOptionType, notification } from "antd";
import {
    catchError,
    concatMap,
    filter,
    map,
    mergeMap,
    switchMap,
} from "rxjs/operators";
// import IdentityApi from "../../api/identity.api";
import { RootEpic } from "../../common/define-type";
import Utils from "../../common/utils";
import IdentityApi from "../../api/identity/identity.api";
import SketchsApi from "../../api/sketchs/sketchs.api";
import { forkJoin } from "rxjs";
import {
    ICurrentSearchValue,
    IDetailSketch,
    IFilteredSketch,
    IReqGetLatestSketchs,
    IReqProductsFiles,
    ISellerStatisticSketch,
    ISketch,
    ISketchInCart,
} from "../../common/sketch.interface";
import { ITool } from "../../common/tool.interface";
import FilterCriteriasApi from "../../api/filter-criterias/filter-criterias.api";
import CommentsApi from "../../api/comment/comment.api";
import { IAuthor, IBill, IHotProducts, IOverViewStatistic, ISellerProfile, IUser } from "../../common/user.interface";
import ImageSketchApi from "../../api/image-sketch/image-sketch.api";
import { IRates } from "../../common/rates.interface";
import RatesApi from "../../api/rates/rates.api";
import { IInFoSketch } from "../../common/sketch.interface";
import PaymentApi from "../../api/payment/payment.api";
import { IPaymentRequest } from "../../common/payment.interface";
import { IBank, IBusiness, IReqFormArchitect, IReqLookUp } from "../../common/profile.interface";
import ProfileAPI from "../../api/profile/profile.api";
import UserApi from "../../api/user/user.api";
import { IOverViewStatictis, IOverViewStatictisDay, IOverViewStatictisMonth, IOverViewStatictisQuarter, IOverViewStatictisYear, IStatictisSellerDay, IStatictisUserDay } from "../../common/statistic.interface";
import StatisticAPI from "../../api/statistic/statistic.api";
import { QUERY_PARAM } from "../../constants/get-api.constants";

type MessageLogin = {
    content: string;
    errorCode?: number;
};
type MessageForgot = {
    ErrorCode?: number;
    Message: string;
};
interface SketchState {
    loading: boolean;
    isSuccess: boolean;
    user: any | undefined;
    message: MessageLogin | undefined;
    messageForgot: MessageForgot | undefined;
    refresh_token: string;
    statusCode: string | undefined;
    tokenLogin: string | undefined;
    isExistEmail: boolean;
    registerSuccess: boolean;
    toolList: CheckboxOptionType[];
    cloneToolList: ITool[];
    architectureList: CheckboxOptionType[];
    cloneArchitecturelist: ITool[];
    styleList: CheckboxOptionType[];
    cloneStyleList: ITool[];
    latestSketchsList: ISketch[];
    mostViewedSketchList: ISketch[];
    villaSketchList: ISketch[];
    streetHouseSketchList: ISketch[];
    factorySketchList: ISketch[];
    interiorSketchList: ISketch[];
    freeSketchList: ISketch[];
    detailSketch?: IDetailSketch;
    commentList?: any[];
    filteredSketchs: IFilteredSketch[];
    filteredAuthors?: IUser[];
    currentSearchValue: any;
    checkWhetherSketchUploaded: number; // Là số chẵn thì chắc chắn file đó đã đc up cả ảnh + file + content thành công
    ratesLst: IRates | undefined;
    productsFile: string | undefined;
    checkProductsFile: boolean;
    lstSketchsInCart: ISketchInCart[];
    sketchsQuantityInCart: number;
    vnpayLink: string;
    authorIntroduction: IAuthor | undefined;
    checkPayment: boolean;
    checkInCart: boolean;
    businessProfile: IBusiness | undefined;
    sellerRegister: any | undefined;
    withdrawRequestList: any[];
    totalWithdrawRequestRecord: number;
    overViewStatistic: IOverViewStatistic | undefined;
    hotProducts: IHotProducts[];
    billList: IBill[];
    totalBillRecord: number;
    detailBill: any | undefined
    sketchsOfArchitect: ISketch[];
    totalSketchRecords: number;
    sketchStatistic: ISellerStatisticSketch | undefined;
    typeViewStatistic: string;
    overviewStatistic: IOverViewStatictis | undefined;
    overViewStatisticDay: IOverViewStatictisDay | undefined;
    overViewStatisticMonth: IOverViewStatictisMonth | undefined;
    overViewStatisticQuarter: IOverViewStatictisQuarter | undefined;
    overViewStatisticYear: IOverViewStatictisYear | undefined;
    overViewStatisticUserDay: IStatictisUserDay | undefined;
    overViewStatisticSellerDay: IStatictisSellerDay | undefined;

    lstBank: IBank[];
    accountBankName: string;

    listPurchasedSketch: any[];
    totalPurchasedSketch: number;
    sellerInformation: ISellerProfile | undefined



}

const initState: SketchState = {
    loading: false,
    isSuccess: true,
    user: undefined,
    message: undefined,
    messageForgot: undefined,
    refresh_token: Utils.getValueLocalStorage("refresh_token"),
    statusCode: undefined,
    tokenLogin: Utils.getValueLocalStorage("token"),
    isExistEmail: true,
    registerSuccess: false,
    toolList: [],
    cloneToolList: [],
    architectureList: [],
    cloneArchitecturelist: [],
    styleList: [],
    cloneStyleList: [],
    latestSketchsList: [],
    mostViewedSketchList: [],
    villaSketchList: [],
    factorySketchList: [],
    streetHouseSketchList: [],
    interiorSketchList: [],
    detailSketch: undefined,
    commentList: [],
    filteredSketchs: [],
    freeSketchList: [],
    filteredAuthors: [],
    currentSearchValue: {
        architecture: '',
        style: '',
        name: "",
        tool: '',
    },
    checkWhetherSketchUploaded: 0,
    ratesLst: {
        rateProduct: 0,
        items: [],
        total: 0
    },
    productsFile: undefined,
    checkProductsFile: false,
    lstSketchsInCart: [],
    sketchsQuantityInCart: 0,
    vnpayLink: "",
    authorIntroduction: undefined,
    checkPayment: false,
    checkInCart: false,

    businessProfile: undefined,
    sellerRegister: undefined,

    withdrawRequestList: [],
    totalWithdrawRequestRecord: 0,

    overViewStatistic: undefined,
    hotProducts: [],
    billList: [],
    totalBillRecord: 0,
    detailBill: undefined,

    sketchsOfArchitect: [],
    totalSketchRecords: 0,
    sketchStatistic: undefined,

    typeViewStatistic: "day",
    overviewStatistic: undefined,
    overViewStatisticDay: undefined,
    overViewStatisticMonth: undefined,
    overViewStatisticQuarter: undefined,
    overViewStatisticYear: undefined,
    overViewStatisticUserDay: undefined,
    overViewStatisticSellerDay: undefined,

    lstBank: [],
    accountBankName: "",
    listPurchasedSketch: [],
    totalPurchasedSketch: 0,
    sellerInformation: undefined,

};

const sketchSlice = createSlice({
    name: "sketch",
    initialState: initState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

        getHomeListSketchRequest(state) {
        },

        getHomeListSketchSuccess(state, action: PayloadAction<any>) {
            console.log("Da chui vao voi action: ", action);
        },





        getLatestSketchRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            console.log("Da chui vao voi action: ", action);
        },

        getLatestSketchSuccess(state, action: PayloadAction<any>) {
            console.log(action);
            state.latestSketchsList = action.payload.data.items;
            // notification.open({
            //     message: "Load success",
            //     // description:
            //     //     action.payload.response.message,
            //     onClick: () => {
            //         console.log("Notification Clicked!");
            //     },
            // });

            // state.user = action.payload.user
            state.isSuccess = true;
            state.loading = false;

            state.registerSuccess = true;
        },

        getLatestSketchFail(state, action: PayloadAction<any>) {
            console.log(action);
            notification.open({
                message: "Load fail",
                // description:
                //     action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            state.loading = false;
            // state.registerSuccess = false;
        },

        getFreeSketchRequest(state) {
            state.loading = true;
            // console.log("Da chui vao voi action: ", action);
        },

        getFreeSketchSuccess(state, action: PayloadAction<any>) {
            console.log(action.payload);
            if (action.payload.data.items)
                state.freeSketchList = action.payload.data.items;
            // notification.open({
            //     message: "Load success",
            //     // description:
            //     //     action.payload.response.message,
            //     onClick: () => {
            //         console.log("Notification Clicked!");
            //     },
            // });

            // state.user = action.payload.user
            state.isSuccess = true;
            state.loading = false;

            // state.registerSuccess = true;
        },

        getFreeSketchFail(state, action: PayloadAction<any>) {
            console.log(action);
            notification.open({
                message: "Load fail",
                // description:
                //     action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            state.loading = false;
            // state.registerSuccess = false;
        },

        getMostViewdSketchsRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            console.log("Da chui vao voi action: ", action);
        },

        getMostViewdSketchsSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.mostViewedSketchList = action.payload.data.items;

            console.log("Da chui vao voi action: ", action);
        },

        getMostViewdSketchsFail(state, action: PayloadAction<any>) {
            state.loading = false;

        },

        getAllToolsRequest(state, action: PayloadAction<any>) {
            console.log("Da chui vao voi action: ", action);
        },

        getAllToolsSuccess(state, action: PayloadAction<any>) {
            console.log(action.payload.data);
            state.toolList = action.payload.data.map(
                (item: ITool) =>
                ({
                    label: item.name,
                    value: item.id,
                } as CheckboxOptionType)
            );
            state.cloneToolList = action.payload.data;
            console.log(state.toolList);
            console.log("Da chui vao voi action: ", action);
        },


        getAllStylesRequest(state, action: PayloadAction<any>) {
            console.log("Da chui vao voi action: ", action);
        },

        getAllStylesSuccess(state, action: PayloadAction<any>) {
            console.log(action.payload.data);
            state.styleList = action.payload.data.map(
                (item: ITool) =>
                ({
                    label: item.name,
                    value: item.id,
                } as CheckboxOptionType)
            );
            state.cloneStyleList = action.payload.data
            console.log(state.toolList);
            console.log("Da chui vao voi action: ", action);
        },

        getAllArchitecturesRequest(state, action: PayloadAction<any>) {
            console.log("Da chui vao voi action: ", action);
        },

        getAllArchitecturesSuccess(state, action: PayloadAction<any>) {
            console.log(action.payload.data);
            state.architectureList = action.payload.data.map(
                (item: ITool) =>
                ({
                    label: item.name,
                    value: item.id,
                } as CheckboxOptionType)
            );
            state.cloneArchitecturelist = action.payload.data;
            console.log(state.architectureList);
            console.log("Da chui vao voi action: ", action);
        },

        getAllFilterCriteriasRequest(state) {
        },

        getAllFilterCriteriasSuccess(state) {
        },

        getDetailSketchRequest(state, action: PayloadAction<any>) {
        },

        getDetailSketchSuccess(state, action: PayloadAction<any>) {
            state.detailSketch = action.payload.data;
            console.log(action.payload.data);
        },

        getDetailSketchFail(state, action: PayloadAction<any>) {

        },

        getCommentBySketchIdRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getCommentBySketchIdSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.commentList = action.payload.data[0].items;
        },

        getDetailSketchPageContentRequest(
            state,
            action: PayloadAction<string>
        ) {
            state.loading = true;
        },

        getDetailSketchPageContentSuccess(state) {
            state.loading = false;
        },

        getDetailSketchPageContentFail(state) {
            state.loading = false;
        },

        sortFilteredSketchRequest(state, action: PayloadAction<any>) {
            // objs.sort((a,b) => a.last_nom - b.last_nom);
            switch (action.payload) {
                case 'view':
                    // code block
                    state.filteredSketchs?.sort((a, b) => a.views - b.views)
                    break;
                case 'purchase':
                    // code block
                    state.filteredSketchs?.sort((a, b) => a.quantityPurchased - b.quantityPurchased)
                    break;
                case 'minToMaxPrice':
                    state.filteredSketchs?.sort((a, b) => a.price - b.price)
                    break;
                case 'maxToMaxPrice':
                    state.filteredSketchs?.sort((a, b) => b.price - a.price)
                    break;
                default:
                // code block
            }

        },

        // Dùng để reset lại biến currentSearchValue (biến lưu lại các lựa chọn tìm kiếm nâng cao) mỗi khi chuyển qua chuyển lại giữa
        // trang home và trang tìm kiếm nâng cao
        // action.payload bây giờ sẽ là thông tin mà bạn muốn tìm kiếm sau khi clear giá trị tìm kiếm cũ
        resetCurrentSearchValueRequest(state, action: PayloadAction<any>){
            state.currentSearchValue = {
                architecture: '',
                style: '',
                name: "",
                tool: '',
            }
        },

        advancedSearchingRequest(
            state,
            action: PayloadAction<ICurrentSearchValue>
        ) {
            state.currentSearchValue = {
                // Xu ly de lay duoc ca gia tri cua o input cua header va cac o selectbox cua filter. Neu co
                // truong nao khong co gia tri thi lay gia tri hien tai duoc luu trong redux
                architecture: action.payload.architecture
                    ? action.payload.architecture
                    : state.currentSearchValue.architecture,
                style: action.payload.style
                    ? action.payload.style
                    : state.currentSearchValue.style,
                name: action.payload.name
                    ? action.payload.name
                    : state.currentSearchValue.name,
                tool: action.payload.tool
                    ? action.payload.tool
                    : state.currentSearchValue.tool,
            };
        },

        advancedSearchingSuccess(state, action: PayloadAction<any>) {
            console.log(action.payload.data[0].items.length);

            state.loading = false;
            state.filteredSketchs = action.payload?.data[0]?.items;
        },

        advancedSearchingFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.filteredSketchs = action.payload.data.items;
        },

        uploadSketchRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        uploadSketchSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            // state.checkWhetherSketchUploaded += 1;
            // if (state.checkWhetherSketchUploaded % 2 === 0) {
            // Cu chia het cho 2 thi la up file thanh cong
            state.checkProductsFile = true;
            notification.open({
                message: "Thành công",
                description: "Tải bản vẽ lên thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            // }
        },

        uploadSketchFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thất bại",
                description: "Tải bản vẽ lên thất bại",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        uploadFileSketchRequest(state, action: PayloadAction<any>) {
        },

        uploadFileSketchSuccess(state) {
        },

        uploadImageSketchRequest(state, action: PayloadAction<any>) {
        },

        uploadImageSketchSuccess(state) {
        },

        uploadContentSketchRequest(state, action: PayloadAction<any>) {
        },

        uploadContentSketchSuccess(state, action: PayloadAction<any>) {
        },

        getRatesBySketchIdRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        getRatesBySketchIdSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.ratesLst = action.payload.data;
        },
        getRatesBySketchIdFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        getProductFilesByIdRequest(state, action: PayloadAction<string>) {
            state.loading = true;
        },
        getProductFilesByIdSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.productsFile = ''
            if (typeof action.payload === "string") {
                console.log(action.payload);
                state.productsFile = '';
            }
            else {
                console.log(action.payload);

                if (action.payload) {
                    if (action.payload[0])
                        state.productsFile = action.payload[0].filePath;
                }
                else {
                    state.productsFile = 'string';
                }
            }
        },
        getProductFilesByIdFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        //Cart
        addSketchToCartRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        addSketchToCartSuccess(state, action: PayloadAction<any>) {
            state.loading = false;

            state.sketchsQuantityInCart = action.payload.Quantity;
            notification.open({
                message: "Thành công",
                description: "Thêm sản phẩm vào giỏ hàng thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },
        addSketchToCartFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thêm sản phẩm không thành công",
                description: action.payload.response.message === 'Products-already-in-the-cart' ? 'Sản phẩm đã có trong giỏ' : 'Network error',
                onClick: () => {
                    console.log(action.payload.message);
                },
            });
        },

        //Lấy số lượng sản phẩm trong giỏ
        getSketchQuantityInCartRequest(state) {
            state.loading = true;
        },
        getSketchQuantityInCartSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            state.sketchsQuantityInCart = action.payload.data.quantityProduct;
        },
        getSketchQuantityInCartFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        //Lấy tất cả sản phẩm trong giỏ
        getAllSketchInCartRequest(state) {
            state.loading = true;
        },
        getAllSketchInCartSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            if (typeof action.payload === "string")
                state.lstSketchsInCart = [];
            else
                state.lstSketchsInCart = action.payload.data;
        },
        getAllSketchInCartFail(state, action: PayloadAction<any>) {
            state.loading = false;
            state.lstSketchsInCart = [];

        },

        //Xoa san pham trong gio
        deleteSketchInCartRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        deleteSketchInCartSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            state.lstSketchsInCart = action.payload;
        },
        deleteSketchInCartFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        //Thanh toán
        purchaseWithVNPayRequest(
            state,
            action: PayloadAction<IPaymentRequest>
        ) {
            state.loading = true;
        },
        purchaseWithVNPaySuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            state.vnpayLink = action.payload;
        },
        purchaseWithVNPayFail(state, action: PayloadAction<any>) {
            state.loading = false;

        },

        // Get Author intro
        getAuthorIntroductionByIdRequest(state, action: PayloadAction<string>) {
            state.loading = true;
        },
        getAuthorIntroductionByIdSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            state.authorIntroduction = action.payload;
        },
        getAuthorIntroductionByIdFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        // get Sketch List By Author Id
        getSketchListByAuthorIdRequest(state, action: PayloadAction<string>) {
            state.loading = true;
        },
        getSketchListByAuthorIdSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            state.filteredSketchs = action.payload.data.items;
        },
        getSketchListByAuthorIdFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        // Get business by tax code
        getBusinessByTaxCodeRequest(state, action: PayloadAction<string>) {
            state.loading = true;
        },

        getBusinessByTaxCodeSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            if (action.payload.data)
                state.businessProfile = action.payload.data;
        },
        getBusinessByTaxCodeFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        // Seller Register
        sellerRegisterRequest(state, action: PayloadAction<IReqFormArchitect>) {
            state.loading = true;
        },

        sellerRegisterSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            notification.open({
                message: "Đăng ký người bán thành công",
                description: "Vui long đợi cho admin chấp nhận",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        sellerRegisterFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Đăng ký không thành công",
                description: 'Gửi đơn đăng ký không thành công! Đơn đăng ký của bạn đã tồn tại. Hãy chờ admin phê duyệt',
                onClick: () => {
                    console.log(action.payload.message);
                },
            });
        },

        // get list withdraw request 
        getWithdrawRequests(state, action: PayloadAction<any>) {
            state.loading = true;
            // console.log("da chui vao",state.loading)
        },
        getWithdrawRequestsSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload)
            state.withdrawRequestList = action.payload.items
            state.totalWithdrawRequestRecord = action.payload.total

        },
        getWithdrawRequestsFail(state, action: PayloadAction<any>) {
            console.log(action);
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        //Approve withdraw request
        createWithdrawRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        createWithdrawRequestSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: 'Tạo yêu cầu thành công',
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        },
        createWithdrawRequestFail(state, action: any) {
            state.loading = false;
        },


        confirmPurchasedRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        confirmPurchasedSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            // notification.open({
            //     message: "Thành công",
            //     description: "Thanh toán bản vẽ thành công",
            //     onClick: () => {
            //         console.log("Notification Clicked!");
            //     },
            // });

        },

        confirmPurchasedFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thất bại",
                description: "Thanh toán bản vẽ không thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        // Get overview statistic
        getOverviewStatisticRequest(state) {
            state.loading = true;
        },

        getOverviewStatisticSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            state.overViewStatistic = action.payload;
        },

        getOverviewStatisticFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        // Get hot product
        getHotProductRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getHotProductSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            state.hotProducts = action.payload[0].items;
        },

        getHotProductFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        // get list bill
        getBillListRequests(state, action: PayloadAction<any>) {
            state.loading = true;
            // console.log("da chui vao",state.loading)
        },
        getBillListSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload)
            state.billList = action.payload.items
            state.totalBillRecord = action.payload.total

        },
        getBillListFail(state, action: PayloadAction<any>) {
            console.log(action);
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        // get detail bill
        getDetailBillRequests(state, action: PayloadAction<any>) {
            state.loading = true;
            // console.log("da chui vao",state.loading)
        },
        getDetailBillSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload)
            state.detailBill = action.payload

        },
        getDetailBillFail(state, action: PayloadAction<any>) {
            console.log(action);
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        // get list sketch by architecture request 
        getSketchByArchitectRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            // console.log("da chui vao",state.loading)
        },
        getSketchByArchitectSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload)
            state.sketchsOfArchitect = action.payload.items
            state.totalSketchRecords = action.payload.total

        },
        getSketchByArchitectFail(state, action: PayloadAction<any>) {
            console.log(action);
            state.loading = false;
            notification.open({
                message: action.payload.response.message === "Not found" ? "Không tìm thấy bản vẽ nào" : action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        deleteSketchRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        deleteSketchSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thành công",
                description: "Xóa bản vẽ thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });

        },

        deleteSketchFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thất bại",
                description: "Xóa bản vẽ không thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        // Get overview statistic day
        getOverviewStatisticDayRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getOverviewStatisticDaySuccess(state, action: PayloadAction<any>) {
            console.log(action.payload);
            state.loading = false;
            state.overViewStatisticDay = action.payload;
        },

        getOverviewStatisticDayFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.response.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },

                });
            }
        },

        // Get sketch statistic
        getSketchStatisticRequest(state) {
            state.loading = true;
        },


        getSketchStatisticSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload)
            state.sketchStatistic = action.payload

        },
        getSketchStatisticFail(state, action: PayloadAction<any>) {
            console.log(action);
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        // Get overview statistic month
        getOverviewStatisticMonthRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getOverviewStatisticMonthSuccess(state, action: PayloadAction<any>) {
            console.log(action.payload);
            state.loading = false;
            state.overViewStatisticMonth = action.payload;
        },

        getOverviewStatisticMonthFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.response.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        },

        // Get overview statistic quarter
        getOverviewStatisticQuarterRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getOverviewStatisticQuarterSuccess(state, action: PayloadAction<any>) {
            console.log(action.payload);
            state.loading = false;
            state.overViewStatisticQuarter = action.payload;
        },

        getOverviewStatisticQuarterFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.response.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        },

        // Get overview statistic year
        getOverviewStatisticYearRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getOverviewStatisticYearSuccess(state, action: PayloadAction<any>) {
            console.log(action.payload);
            state.loading = false;
            state.overViewStatisticYear = action.payload;
        },

        getOverviewStatisticYearFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.response.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        },

        // Get overview statistic user day
        getOverviewStatisticUserDayRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getOverviewStatisticUserDaySuccess(state, action: PayloadAction<any>) {
            console.log(action.payload);
            state.loading = false;
            state.overViewStatisticUserDay = action.payload[0];
        },

        getOverviewStatisticUserDayFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        },

        // Get overview statistic seller day

        getOverviewStatisticSellerDayRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getOverviewStatisticSellerDaySuccess(state, action: PayloadAction<any>) {
            console.log(action.payload);
            state.loading = false;
            state.overViewStatisticSellerDay = action.payload[0];
        },

        getOverviewStatisticSellerDayFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        },


        setViewStatistic(state, action: PayloadAction<string>) {
            state.typeViewStatistic = action.payload;
        },

        // get bank list
        getLstBankRequest(state) {
            state.loading = true;
        },

        getLstBankSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.lstBank = action.payload;
        },

        getLstBankFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.response.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        },

        // get account bank name
        getAccountBankNameRequest(state, action: PayloadAction<IReqLookUp>) {
            state.loading = true;
        },

        getAccountBankNameSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            state.accountBankName = action.payload;
        },

        getAccountBankNameFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.response.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        },

        // get list purchased sketch
        getPurchasedSketchsRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getPurchasedSketchsSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            console.log(action.payload);
            state.listPurchasedSketch = action.payload.items;
        },

        getPurchasedSketchsFail(state, action: PayloadAction<any>) {
            state.loading = false;

            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.error({
                    message: 'Lỗi tải dữ liệu',
                    description: action.payload.response.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        },

        getSellerProfileRequest(state) {
            state.loading = true;

            // console.log("da chui vao",state.loading)
        },
        getSellerProfileSuccess(state, action: PayloadAction<any>) {
            state.loading = false;

            Utils.setLocalStorage("sellerProfile", action.payload);

            state.sellerInformation = action.payload

        },
        getSellerProfileFail(state, action: any) {
            state.loading = false;
            notification.open({
                message: "Lỗi",
                description: "Không tìm thấy thông tin người kiến trúc sư/ công ty",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    paddingTop: 40,
                },
            });

        },

        editSketchRequest(state, action: PayloadAction<any>) {
            state.loading = true;

        },

        editSketchSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            // state.checkWhetherSketchUploaded += 1;
            // if (state.checkWhetherSketchUploaded % 2 === 0) {
            // Cu chia het cho 2 thi la up file thanh cong
            notification.open({
                message: "Thành công",
                description: "Cập nhật bản vẽ thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            // }
        },

        editSketchFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thất bại",
                description: "Cập nhật bản vẽ thất bại",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },
    },
});

// Lay ra tat ca du lieu cua trang home
const getHomeListSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(getHomeListSketchRequest.match),
        switchMap((re) => {
            const bodyrequest: IReqGetLatestSketchs = {
                size: 10,
                offset: 0,
            };

            return [
                sketchSlice.actions.getLatestSketchRequest(bodyrequest),
                sketchSlice.actions.getMostViewdSketchsRequest(bodyrequest),
                // sketchSlice.actions.getAllVillaSketchRequest(),
                // sketchSlice.actions.getAllStreetHouseSketchRequest(),
                // sketchSlice.actions.getAllFactorySketchRequest(),
                // sketchSlice.actions.getAllInteriorSketchRequest(),
                sketchSlice.actions.getFreeSketchRequest(),

            ];
        })
    );





const getLatestSketchs$: RootEpic = (action$) =>
    action$.pipe(
        filter(getLatestSketchRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            const type = 'latest';


            return SketchsApi.getSketchsByType(type).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [sketchSlice.actions.getLatestSketchSuccess(res)];
                }),
                catchError((err) => [
                    sketchSlice.actions.getLatestSketchFail(err)
                ])
            );
        })
    );

const getFreeSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(getFreeSketchRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            // console.log(re);

            const type = 'freeProduct';

            return SketchsApi.getSketchsByType(type).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [sketchSlice.actions.getFreeSketchSuccess(res)];
                }),
                catchError((err) => [
                    sketchSlice.actions.getFreeSketchFail(err)
                ])
            );
        })
    );


const getMostViewdSketchs$: RootEpic = (action$) =>
    action$.pipe(
        filter(getMostViewdSketchsRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            const type = 'mostView';


            return SketchsApi.getSketchsByType(type).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [
                        sketchSlice.actions.getMostViewdSketchsSuccess(res),
                    ];
                }),
                catchError((err) => [
                    sketchSlice.actions.getMostViewdSketchsFail(err)
                ])
            );
        })
    );

// const getMostDownloadedSketchs$: RootEpic = (action$) =>
//     action$.pipe(
//         filter(getLatestSketchRequest.match),
//         switchMap((re) => {
//             // IdentityApi.login(re.payload) ?
//             console.log(re);
//             const body: any = {
//                 email: re.payload.email,
//                 password: re.payload.password,
//                 remember: re.payload.remember,
//                 additionalProp1: {},
//             };

//             return IdentityApi.login(body).pipe(
//                 mergeMap((res: any) => {
//                     console.log(res);
//                     console.log(res.data.accessToken);
//                     const token = res.data.accessToken;
//                     return [];
//                 }),
//                 catchError((err) => [])
//             );
//         })
//     );

//Lay ra cac tieu chi filter
const getAllFitlerCriterias$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAllFilterCriteriasRequest.match),
        switchMap((re) => {
            const bodyrequest: IReqGetLatestSketchs = {
                size: 50,
                offset: 0,
            };

            return [
                sketchSlice.actions.getAllArchitecturesRequest(bodyrequest),
                sketchSlice.actions.getAllStylesRequest(bodyrequest),
                sketchSlice.actions.getAllToolsRequest(bodyrequest),
                sketchSlice.actions.getAllFilterCriteriasSuccess(),
            ];
        })
    );

const getAllTools$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAllToolsRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            return FilterCriteriasApi.getTools(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [sketchSlice.actions.getAllToolsSuccess(res)];
                }),
                catchError((err) => [])
            );
        })
    );

const getAllStyles$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAllStylesRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            return FilterCriteriasApi.getStyles(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [sketchSlice.actions.getAllStylesSuccess(res)];
                }),
                catchError((err) => [])
            );
        })
    );

const getAllArchitectures$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAllArchitecturesRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            return FilterCriteriasApi.getArchitectures(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [
                        sketchSlice.actions.getAllArchitecturesSuccess(res),
                    ];
                }),
                catchError((err) => [])
            );
        })
    );

// Lay tat ca noi dung cua trang detail sketch: noi dung ban ve + comment
const getDetailSketchPageContent$: RootEpic = (action$) =>
    action$.pipe(
        filter(getDetailSketchPageContentRequest.match),
        switchMap((re) => {
            return [
                sketchSlice.actions.getDetailSketchRequest(re.payload),
                // sketchSlice.actions.getCommentBySketchIdRequest(re.payload),
            ];
        })
    );

const getDetailSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(getDetailSketchRequest.match),
        concatMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            return SketchsApi.getSketchById(re.payload).pipe(
                concatMap((res: any) => {
                    console.log(res);

                    return [
                        sketchSlice.actions.getDetailSketchSuccess(res),
                        sketchSlice.actions.getAuthorIntroductionByIdRequest(
                            res.data.info.userId
                        ),

                        sketchSlice.actions.getDetailSketchPageContentSuccess(),
                    ];
                }),
                catchError((err) => [
                    sketchSlice.actions.getDetailSketchPageContentFail(err)
                ])
            );
        })
    );

const getCommentBySketchId$: RootEpic = (action$) =>
    action$.pipe(
        filter(getCommentBySketchIdRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            const params = {
                size: 20,
                offset: 0,
                productId: re.payload,
            };

            return CommentsApi.getCommentsBySketchId(params).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [
                        sketchSlice.actions.getCommentBySketchIdSuccess(res),
                    ];
                }),
                catchError((err) => [])
            );
        })
    );

const getAuthorIntroductionById$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAuthorIntroductionByIdRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            return SketchsApi.getAuthorById(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);

                    return [
                        sketchSlice.actions.getAuthorIntroductionByIdSuccess(
                            res.data
                        ),
                    ];
                }),
                catchError((err) => [sketchSlice.actions.getAuthorIntroductionByIdFail(
                    err
                )])
            );
        })
    );

// http://14.231.84.10:6068/products/filter?size=10&offset=0&name=a
const advancedSearchSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(advancedSearchingRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            const bodyrequest = {
                size: re.payload.size || 1000,
                offset: 0,
                name: re.payload.name ? re.payload.name : "",
                designToolId: re.payload.tool ? re.payload.tool : "",
                typeOfArchitectureId: re.payload.architecture
                    ? re.payload.architecture
                    : "",
                designStyleId: re.payload.style ? re.payload.style : "",
                authorId: re.payload.authorId ? re.payload.authorId : ''

            };

            return SketchsApi.advancedSearching(bodyrequest).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    return [sketchSlice.actions.advancedSearchingSuccess(res)];
                }),
                catchError((err) => [
                    sketchSlice.actions.advancedSearchingFail(err)
                ])
            );
        })
    );

// Upload ban ve: upload anh + upload file + upload content
const uploadImageSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(uploadImageSketchRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            const { id, imageUploadLst } = re.payload;
            const file = imageUploadLst[0] as File;

            let imageData = new FormData();
            re.payload.imageUploadLst.forEach((item: any) => {
                imageData.append("files", item as File); // chinh lai ten file anh sau
            });
            // imageData.append("file", file);
            imageData.append("productId_in", re.payload.id);

            // const bodyrequest = {
            //     productId_in: re.payload.id,
            //     files: re.payload.imageUploadLst,
            // };

            return ImageSketchApi.uploadSketchImage(imageData).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    return [
                        sketchSlice.actions.uploadImageSketchSuccess(),
                        // sketchSlice.actions.uploadFileSketchRequest(res),
                        // sketchSlice.actions.uploadSketchSuccess(res), // vao luu gia tri check thanh cong lan 1
                    ];
                }),
                catchError((err) => [sketchSlice.actions.uploadSketchFail(err)])
            );
        })
    );

const uploadFileSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(uploadFileSketchRequest.match),
        switchMap((re) => {
            const { id, fileUploadLst } = re.payload;
            const file = fileUploadLst[0] as File;

            const formData = new FormData();
            formData.append("productId_in", id);
            formData.append("file", file);

            return SketchsApi.uploadSketchFile(formData).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    return [
                        sketchSlice.actions.uploadFileSketchSuccess(),
                        // sketchSlice.actions.uploadContentSketchRequest(res),
                        sketchSlice.actions.uploadSketchSuccess(res), // vao luu gia tri check thanh cong lan 2
                    ];
                }),
                catchError((err) => [sketchSlice.actions.uploadSketchFail(err)])
            );
        })
    );

const uploadContentSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(uploadSketchRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);

            const bodyrequest = {
                // searchType: searchType,
                // selectedType: selectedType,
                title: re.payload.title,
                // selectedTag: selectTag,
                // imageUploadLst: re.payload.imageUploadLst,
                // fileUploadLst: re.payload.fileUploadLst,
                size: re.payload.size,
                price: re.payload.price,
                content: re.payload.content,
                productDesignStyles: re.payload.productDesignStyles,
                productDesignTools: re.payload.productDesignTools[0].value,
                productTypeOfArchitecture: re.payload.productTypeOfArchitecture[0].value,
            };



            return SketchsApi.uploadSketchContent(bodyrequest).pipe(
                switchMap((res: any) => {
                    console.log(res);
                    res = { ...res.data, ...re.payload };
                    return [
                        sketchSlice.actions.uploadFileSketchRequest(res),
                        sketchSlice.actions.uploadImageSketchRequest(res),
                    ];
                }),
                catchError((err) => [sketchSlice.actions.uploadSketchFail(err)])
            );
        })
    );

const getSketchListByAuthorId$: RootEpic = (action$) =>
    action$.pipe(
        filter(getSketchListByAuthorIdRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            return SketchsApi.getSketchListByAuthorId(re.payload).pipe(
                mergeMap((res: IRates) => {
                    return [
                        sketchSlice.actions.getSketchListByAuthorIdSuccess(res),
                    ];
                }),
                catchError((err) => [
                    sketchSlice.actions.getSketchListByAuthorIdFail(err),

                ])
            );
        })
    );
const getProductFilesById$: RootEpic = (action$) =>
    action$.pipe(
        filter(getProductFilesByIdRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            return SketchsApi.getProductFilesById(re.payload).pipe(
                switchMap((res: any) => {
                    console.log(res);
                    return [
                        sketchSlice.actions.getProductFilesByIdSuccess(res),

                    ];
                }),
                catchError((err) => [])
            );
        })
    );

//Add sketch to cart
const addSketchToCart$: RootEpic = (action$) =>
    action$.pipe(
        filter(addSketchToCartRequest.match),
        switchMap((re) => {
            console.log(re);
            const req = {
                productId: re.payload.productId,
                additionalProp1: {},
            };
            return SketchsApi.addSketchToCart(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.addSketchToCartSuccess(res),
                        sketchSlice.actions.getSketchQuantityInCartRequest()
                    ];
                }),
                catchError((err) => [sketchSlice.actions.addSketchToCartFail(err)])

            );
        })
    );

const getRatesBySketchId$: RootEpic = (action$) =>
    action$.pipe(
        filter(getRatesBySketchIdRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            return RatesApi.getRatesBySketchId(re.payload).pipe(
                mergeMap((res: IRates) => {
                    return [sketchSlice.actions.getRatesBySketchIdSuccess(res)];
                }),
                catchError((err) => [])
            );
        })
    );

//Get all sketch in cart
const getAllSketchInCart$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAllSketchInCartRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            return SketchsApi.getAllSketchInCart().pipe(
                mergeMap((res: any) => {
                    return [sketchSlice.actions.getAllSketchInCartSuccess(res)];
                }),
                catchError((err) => [
                    sketchSlice.actions.getAllSketchInCartFail(err)
                ])
            );
        })
    );

//Get sketch quantity in cart
const getSketchQuantityInCart$: RootEpic = (action$) =>
    action$.pipe(
        filter(getSketchQuantityInCartRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            return SketchsApi.getSketchQuantityInCart().pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getSketchQuantityInCartSuccess(res),
                    ];
                }),
                catchError((err) => [
                    sketchSlice.actions.getSketchQuantityInCartFail(err),

                ])
            );
        })
    );

//chuyen san man thanh toan VNPay
const purchaseWithVNPay$: RootEpic = (action$) =>
    action$.pipe(
        filter(purchaseWithVNPayRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            return PaymentApi.purchaseWithVNPay(re.payload).pipe(
                mergeMap((res: any) => {
                    return [sketchSlice.actions.purchaseWithVNPaySuccess(res)];
                }),
                catchError((err) => [
                    sketchSlice.actions.purchaseWithVNPayFail(err),
                ])
            );
        })
    );

//chuyen san man thanh toan VNPay
const deleteSketchInCart$: RootEpic = (action$) =>
    action$.pipe(
        filter(deleteSketchInCartRequest.match),
        switchMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            return SketchsApi.deleteSketchInCart(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getAllSketchInCartRequest(),
                        sketchSlice.actions.getSketchQuantityInCartRequest()
                    ];
                }),
                catchError((err) => [
                    sketchSlice.actions.deleteSketchInCartFail(err),
                    sketchSlice.actions.getSketchQuantityInCartRequest()

                ])
            );
        })
    );

const getBusinessByTaxCode$: RootEpic = (action$) =>
    action$.pipe(
        filter(getBusinessByTaxCodeRequest.match),
        switchMap((re) => {

            return ProfileAPI.getBusiness(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getBusinessByTaxCodeSuccess(res),
                    ];
                }),
                catchError((err) => [
                    sketchSlice.actions.getBusinessByTaxCodeFail(err),
                ])
            );
        })
    );

const sellerRegister$: RootEpic = (action$) =>
    action$.pipe(
        filter(sellerRegisterRequest.match),
        switchMap((re) => {
            console.log(re);
            return ProfileAPI.sellerRegister(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.sellerRegisterSuccess(res),
                    ];
                }),
                catchError((err) => [
                    sketchSlice.actions.sellerRegisterFail(err),
                ])
            )
        })
    );



const getWithdrawRequests$: RootEpic = (action$) =>
    action$.pipe(
        filter(getWithdrawRequests.match),
        mergeMap((re) => {
            console.log(re);


            return UserApi.getAllWithdrawRequests(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getWithdrawRequestsSuccess(res.data),
                    ];
                }),
                catchError((err) => [sketchSlice.actions.getWithdrawRequestsFail(err)])
            )
        })
    );

const createWithdrawRequest$: RootEpic = (action$) =>
    action$.pipe(
        filter(createWithdrawRequest.match),
        mergeMap((re) => {
            console.log(re);

            const bodyrequest = {
                amount: re.payload.amount,
                additionalProp1: re.payload.additionalProp1
            }

            return UserApi.createWithdrawRequest(bodyrequest).pipe(
                mergeMap((res: any) => {
                    console.log(re.payload)
                    return [
                        sketchSlice.actions.createWithdrawRequestSuccess(res.data),
                        sketchSlice.actions.getWithdrawRequests(re.payload.currentSearchValue)
                    ];
                }),
                catchError((err) => [sketchSlice.actions.createWithdrawRequestFail(err)])
            );
        })
    );

const confirmPurchased$: RootEpic = (action$) =>
    action$.pipe(
        filter(confirmPurchasedRequest.match),
        mergeMap((re) => {
            console.log(re);

            return UserApi.confirmPurchased(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(re.payload)
                    return [
                        sketchSlice.actions.confirmPurchasedSuccess(res.data),
                    ];
                }),
                catchError((err) => [sketchSlice.actions.confirmPurchasedFail(err)])
            );
        })
    );

const getOverviewStatistic$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticRequest.match),
        mergeMap((re) => {
            console.log(re);

            return UserApi.getOverViewStatistic().pipe(
                mergeMap((res: any) => {
                    console.log(re.payload)
                    return [
                        sketchSlice.actions.getOverviewStatisticSuccess(res.data),
                    ];
                }),
                catchError((err) => [sketchSlice.actions.getOverviewStatisticFail(err)])
            )
        }))

const getSketchOfArchitect$: RootEpic = (action$) =>
    action$.pipe(
        filter(getSketchByArchitectRequest.match),
        mergeMap((re) => {
            console.log(re);


            return SketchsApi.getAllSketchByArchitect(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getSketchByArchitectSuccess(res.data),

                    ];
                }),
                catchError((err) => [sketchSlice.actions.getSketchByArchitectFail(err)])
            )
        })
    );

const deleteSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(deleteSketchRequest.match),
        mergeMap((re) => {
            console.log(re);

            const bodyrequest = {
                productId: re.payload.productId
            }

            return SketchsApi.deleteSketchOfArchitect(bodyrequest).pipe(
                mergeMap((res: any) => {
                    console.log(re.payload)
                    return [
                        sketchSlice.actions.deleteSketchSuccess(res.data),
                        sketchSlice.actions.getSketchByArchitectRequest(re.payload.currentSearchValue)
                    ];
                }),
                catchError((err) => [sketchSlice.actions.createWithdrawRequestFail(err)])
            );
        })
    );

const getHotProduct$: RootEpic = (action$) =>
    action$.pipe(
        filter(getHotProductRequest.match),
        mergeMap((re) => {
            console.log(re);
            const req = {
                size: re.payload.size,
                offset: re.payload.offset,
            }
            return UserApi.getHotProducts(req).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getHotProductSuccess(res.data),
                    ];
                }),
                catchError((err) => [sketchSlice.actions.getHotProductFail(err)])
            );
        })
    );

const getBillList$: RootEpic = (action$) =>
    action$.pipe(
        filter(getBillListRequests.match),
        mergeMap((re) => {
            console.log(re);


            return UserApi.getBillList(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getBillListSuccess(res.data),

                    ];
                }),
                catchError((err) => [sketchSlice.actions.getBillListFail(err)])
            )
        })
    );

const getDetailBill$: RootEpic = (action$) =>
    action$.pipe(
        filter(getDetailBillRequests.match),
        mergeMap((re) => {
            console.log(re);


            return UserApi.getDetailBill(re.payload.id).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getDetailBillSuccess(res.data),

                    ];
                }),
                catchError((err) => [sketchSlice.actions.getDetailBillFail(err)])
            )
        })
    );


const getSketchStatistic$: RootEpic = (action$) =>
    action$.pipe(
        filter(getSketchStatisticRequest.match),
        mergeMap((re) => {
            console.log(re);


            return SketchsApi.getSketchStatistic().pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getSketchStatisticSuccess(res.data),

                    ];
                }),
                catchError((err) => [sketchSlice.actions.getSketchStatisticFail(err)])
            )
        })
    );

const getOverviewStatisticDay$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticDayRequest.match),
        mergeMap((re) => {
            console.log(re);
            return StatisticAPI.getOverViewStatisticDay(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getOverviewStatisticDaySuccess(res.data),

                    ];
                }),
                catchError((err) => [sketchSlice.actions.getOverviewStatisticDayFail(err)])
            )
        }
        )
    );



const getOverviewStatisticMonth$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticMonthRequest.match),
        mergeMap((re) => {
            console.log(re);
            return StatisticAPI.getOverViewStatisticMonth(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getOverviewStatisticMonthSuccess(res.data),
                    ]
                }),
                catchError((err) => [sketchSlice.actions.getOverviewStatisticMonthFail(err)])
            );
        })
    );

const getOverviewStatisticQuarter$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticQuarterRequest.match),
        mergeMap((re) => {
            console.log(re);
            return StatisticAPI.getOverViewStatisticQuarter(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getOverviewStatisticQuarterSuccess(res.data),
                    ]
                }),
                catchError((err) => [sketchSlice.actions.getOverviewStatisticQuarterFail(err)])
            );
        })
    );

const getOverviewStatisticYear$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticYearRequest.match),
        mergeMap((re) => {
            console.log(re);
            return StatisticAPI.getOverViewStatisticYear(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getOverviewStatisticYearSuccess(res.data),
                    ]
                }),
                catchError((err) => [sketchSlice.actions.getOverviewStatisticYearFail(err)])
            );
        })
    );

const getOverviewStatisticUserDay$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticUserDayRequest.match),
        concatMap((re) => {
            console.log(re);
            return StatisticAPI.getUserStatisticDay(re.payload).pipe(
                concatMap((res: any) => {
                    return [
                        sketchSlice.actions.getOverviewStatisticUserDaySuccess(res.data),
                    ]
                }),
                catchError((err) => [sketchSlice.actions.getOverviewStatisticUserDayFail(err)])
            );
        })
    );

const getOverviewStatisticSellerDay$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticSellerDayRequest.match),
        concatMap((re) => {
            console.log(re);
            return StatisticAPI.getSellerStatisticDay(re.payload).pipe(
                concatMap((res: any) => {
                    return [
                        sketchSlice.actions.getOverviewStatisticSellerDaySuccess(res.data),
                    ]
                }),
                catchError((err) => [sketchSlice.actions.getOverviewStatisticSellerDayFail(err)])
            );
        })
    );

const getLstBank$: RootEpic = (action$) =>
    action$.pipe(
        filter(getLstBankRequest.match),
        mergeMap((re) => {
            console.log(re);
            return ProfileAPI.getBanks().pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getLstBankSuccess(res.data),
                    ]
                }),
                catchError((err) => [sketchSlice.actions.getLstBankFail(err)])
            );
        })
    );

const getAccountBankName$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAccountBankNameRequest.match),
        mergeMap((re) => {
            console.log(re);
            return ProfileAPI.getAccountBankName(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        sketchSlice.actions.getAccountBankNameSuccess(res.data),
                    ]
                }),
                catchError((err) => [sketchSlice.actions.getAccountBankNameFail(err)])
            );
        })
    );

const getPurchasedSketchs$: RootEpic = (action$) =>
    action$.pipe(
        filter(getPurchasedSketchsRequest.match),
        switchMap((re) => {
            console.log(re);
            return SketchsApi.getPurchasedSketchs(re.payload).pipe(
                switchMap((res: any) => {
                    return [
                        sketchSlice.actions.getPurchasedSketchsSuccess(res.data),
                    ]
                }),
                catchError((err) => [sketchSlice.actions.getPurchasedSketchsFail(err)])
            );
        })
    );

const getSellerProfile$: RootEpic = (action$) =>
    action$.pipe(
        filter(getSellerProfileRequest.match),
        mergeMap((re) => {


            return IdentityApi.getSellerInformation().pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    return [
                        sketchSlice.actions.getSellerProfileSuccess(res.data)
                    ]
                }),
                catchError((err) => [sketchSlice.actions.getSellerProfileFail(err)])
            );
        })
    );

const editSketch$: RootEpic = (action$) =>
    action$.pipe(
        filter(editSketchRequest.match),
        mergeMap((re) => {
            const bodyrequest = {
                size: QUERY_PARAM.size,
                offset: 0
            }

            return SketchsApi.editSketchOfArchitect(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(re.payload)
                    return [
                        sketchSlice.actions.editSketchSuccess(res.data),
                        sketchSlice.actions.getSketchByArchitectRequest(bodyrequest)
                    ];
                }),
                catchError((err) => [sketchSlice.actions.editSketchFail(err)])
            );
        })
    );

const resetCurrentSearchValue$: RootEpic = (action$) => 
    action$.pipe(
        filter(resetCurrentSearchValueRequest.match),
        mergeMap((re) => {
            const bodyrequest: ICurrentSearchValue = {
                name: re.payload.name,
                architecture: '',
                tool: '',
                style: '',
            };
            return [
                sketchSlice.actions.advancedSearchingRequest(bodyrequest),
            ];
        })
    )

export const SketchEpics = [
    // uploadSketch$,
    resetCurrentSearchValue$,
    getHomeListSketch$,
    getFreeSketch$,
    getLatestSketchs$,
    getMostViewdSketchs$,
    // getMostDownloadedSketchs$,
    getAllTools$,
    getAllStyles$,
    getAllArchitectures$,
    getAllFitlerCriterias$,
    getDetailSketch$,
    getCommentBySketchId$,
    getDetailSketchPageContent$,
    advancedSearchSketch$,
    uploadImageSketch$,
    uploadContentSketch$,
    uploadFileSketch$,
    getRatesBySketchId$,
    getProductFilesById$,
    addSketchToCart$,
    getSketchQuantityInCart$,
    getAllSketchInCart$,
    purchaseWithVNPay$,
    getAuthorIntroductionById$,
    getRatesBySketchId$,
    getSketchListByAuthorId$,
    deleteSketchInCart$,

    getBusinessByTaxCode$,
    sellerRegister$,
    getWithdrawRequests$,
    createWithdrawRequest$,
    confirmPurchased$,

    getOverviewStatistic$,
    getHotProduct$,
    getBillList$,
    getDetailBill$,
    getSketchOfArchitect$,
    deleteSketch$,
    getSketchStatistic$,

    getOverviewStatisticDay$,
    getOverviewStatisticMonth$,
    getOverviewStatisticQuarter$,
    getOverviewStatisticYear$,
    getOverviewStatisticUserDay$,
    getOverviewStatisticSellerDay$,

    getLstBank$,
    getAccountBankName$,
    getPurchasedSketchs$,
    getSellerProfile$,
    editSketch$
];
export const {
    getLatestSketchRequest,
    getFreeSketchRequest,
    getHomeListSketchRequest,
    getMostViewdSketchsRequest,
    getAllToolsRequest,
    getAllArchitecturesRequest,
    getAllStylesRequest,
    getAllFilterCriteriasRequest,
    getDetailSketchRequest,
    getCommentBySketchIdRequest,
    getDetailSketchPageContentRequest,
    advancedSearchingRequest,
    uploadSketchRequest,
    uploadContentSketchRequest,
    uploadFileSketchRequest,
    uploadImageSketchRequest,
    getRatesBySketchIdRequest,
    getProductFilesByIdRequest,
    addSketchToCartRequest,
    getSketchQuantityInCartRequest,
    getAllSketchInCartRequest,
    purchaseWithVNPayRequest,
    getAuthorIntroductionByIdRequest,
    getSketchListByAuthorIdRequest,
    deleteSketchInCartRequest,

    getBusinessByTaxCodeRequest,
    sellerRegisterRequest,
    getWithdrawRequests,
    createWithdrawRequest,
    confirmPurchasedRequest,

    getOverviewStatisticRequest,
    getHotProductRequest,

    getBillListRequests,
    getDetailBillRequests,
    getSketchByArchitectRequest,
    deleteSketchRequest,
    getSketchStatisticRequest,

    getOverviewStatisticDayRequest,
    getOverviewStatisticMonthRequest,
    getOverviewStatisticQuarterRequest,
    getOverviewStatisticYearRequest,
    getOverviewStatisticUserDayRequest,
    getOverviewStatisticSellerDayRequest,
    setViewStatistic,

    getLstBankRequest,
    getAccountBankNameRequest,
    getPurchasedSketchsRequest,
    getSellerProfileRequest,
    editSketchRequest,

    sortFilteredSketchRequest,

    resetCurrentSearchValueRequest,

} = sketchSlice.actions;
export const sketchReducer = sketchSlice.reducer;




