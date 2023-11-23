/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { WritableDraft } from "immer/dist/internal";
import { catchError, filter, map, mergeMap, switchMap } from "rxjs/operators";
// import IdentityApi from "../../api/identity.api";
import { RootEpic } from "../../common/define-type";
import Utils from "../../common/utils";
import IdentityApi from "../../api/identity/identity.api";
import UserApi from "../../api/user/user.api";

type MessageLogin = {
    content: string;
    errorCode?: number;
};
type MessageForgot = {
    ErrorCode?: number;
    Message: string;
};
interface LoginState {
    loading: boolean;
    isSuccess: boolean;
    // user: any | undefined;
    message: MessageLogin | undefined;
    messageForgot: MessageForgot | undefined;
    departmentId: number;
    refresh_token: string;
    statusCode: string | undefined;
    tokenLogin: string | undefined;
    isExistEmail: boolean;
    registerSuccess: boolean;
    userName: string | undefined;
    userMail: string | undefined;
    userPhone: string | undefined;
    accesstokenExpỉred: boolean;
    userRole: string;
}

const initState: LoginState = {
    loading: false,
    isSuccess: true,
    // user: Utils.getValueLocalStorage(""),
    userName: Utils.getValueLocalStorage("userName"),
    userMail: Utils.getValueLocalStorage("userMail"),
    userPhone: Utils.getValueLocalStorage("userPhone"),
    departmentId: 1,
    message: undefined,
    messageForgot: undefined,
    refresh_token: "",
    statusCode: undefined,
    tokenLogin: Utils.getValueLocalStorage("token"),
    isExistEmail: true,
    registerSuccess: false,
    accesstokenExpỉred: true,
    userRole: Utils.getValueLocalStorage("role") ? Utils.getValueLocalStorage("role") : 'user',
};

const loginSlice = createSlice({
    name: "login",
    initialState: initState,
    reducers: {
        loginRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            // console.log("da chui vao",state.loading)
        },
        loginSuccess(state, action: PayloadAction<any>) {
            Utils.setLocalStorage("token", action.payload.accessToken);
            Utils.setLocalStorage("refresh_token", action.payload.refreshToken);
            Utils.setLocalStorage("role", action.payload.role);
            console.log(action.payload.accessToken);

            state.tokenLogin = action?.payload?.accessToken;
            state.loading = false;
            state.isSuccess = true;
            state.accesstokenExpỉred = false;
            state.userRole = action.payload.role
            notification.open({
                message: "Đăng nhập thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        },
        loginFail(state, action: any) {
            console.log(action.payload.response);
            state.loading = false;
            state.accesstokenExpỉred = true;

            notification.open({
                message: "Đăng nhập không thành công",
                description: action.payload.response.message.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            state.message = action.payload.message;
        },
        checkAbleToLogin(state, action: PayloadAction<string>) {
            state.statusCode = action.payload;
        },
        getUserInfoRequest(state, action: PayloadAction<any>) {
            state.tokenLogin = action.payload.accessToken;
            state.loading = true;
        },
        getUserInfoSuccess(
            state,
            action: PayloadAction<{ user: any; token: string }>
        ) {
            Utils.setLocalStorage("userName", action.payload.user.name);
            Utils.setLocalStorage("userMail", action.payload.user.email);
            Utils.setLocalStorage("userPhone", action.payload.user.phone);
            state.userName = action.payload.user.name;
            state.userMail = action.payload.user.email;
            state.userPhone = action.payload.user.phone;
            state.loading = false;
            state.isSuccess = true;
            state.accesstokenExpỉred = false;
            // state.user = action.payload.user;
            console.log("---get user info success---");
        },
        getUserInfoFail(state, action: any) {
            // state.user = action.payload
            console.log(action);
            // notification.open({
            //     message: "Lấy thông tin thành viên không thành công",
            //     description: "Hãy kiểm tra lại thông tin đăng nhập.",
            //     onClick: () => {
            //         console.log("Notification Clicked!");
            //     },
            //     style: {
            //         paddingTop: 40,
            //     },
            // });
            Utils.removeItemLocalStorage("userName");
            Utils.removeItemLocalStorage("userMail");
            Utils.removeItemLocalStorage("userPhone");
            state.message = action.payload.message;
            state.accesstokenExpỉred = true;
            state.loading = false;


        },

        checkEmailRequest: (state, action: PayloadAction<string>) => {
            state.isExistEmail = true;
            state.loading = true;
        },
        checkEmailSuccess: (state, action: PayloadAction<any>) => {
            console.log(action.payload);
            state.loading = false;

            state.isExistEmail = action.payload.exist;
            if (action.payload.exist) {
                notification.open({
                    message: "Email đã tồn tại",
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                    style: {
                        marginTop: 40,
                    },
                });
            }
        },
        checkEmailFailed(state, action: PayloadAction<boolean>) {
            // state.loading = action.payload;
            state.loading = false;

        },
        checkActiveAccountRequest: (state, action: PayloadAction<any>) => {
            state.loading = true;
        },
        checkActiveAccountSuccess: (state, action: PayloadAction<any>) => {
            console.log(action.payload);
            state.loading = false;

            if (action.payload.statusCode === "OK") {
                notification.open({
                    message: action.payload.data,
                    description: "Tài khoản đã có thể đăng nhập",
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                    style: {
                        // marginTop: 20
                    },
                });
            }
            if (action.payload.statusCode === "AccountActivated") {
                notification.open({
                    message: action.payload.data,
                    description: "Vui lòng không xác nhận lại",
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                    style: {
                        // marginTop: 20
                    },
                });
            }
            if (action.payload.statusCode === "UserNotFound") {
                notification.open({
                    message: action.payload.data,
                    description:
                        "Vui lòng đăng ký / đăng nhập lại với tài khoản khác đã xác nhận",
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                    style: {
                        // marginTop: 20
                    },
                });
            }
        },
        checkActiveAccountFailed(state, action: PayloadAction<boolean>) {
            // state.loading = action.payload;
            state.loading = false;

        },
        forgotRequest(state, action: PayloadAction<string>) {
            state.loading = true;
        },
        sendMailSuccess(
            state,
            action: PayloadAction<{
                message: WritableDraft<MessageLogin> | undefined;
            }>
        ) {
            state.message = action.payload.message;
            state.loading = false;
            state.isSuccess = true;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        message(state, action: PayloadAction<MessageLogin>) {
            state.message = action.payload;
            state.loading = false;
        },
        messageForgot(state, action: PayloadAction<MessageForgot>) {
            state.messageForgot = action.payload;
            state.loading = false;
        },
        clearMessageResquest(state) {
            state.loading = true;
        },
        clearMessage(state) {
            state.messageForgot = undefined;
            state.message = undefined;
            state.loading = false;
        },
        setStatusCode(state, action: PayloadAction<string>) {
            state.statusCode = action.payload;
        },
        clearAllRequest(state) {
            state.loading = true;
            state.statusCode = undefined;
            // state.user = undefined;
        },

        registerRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            state.registerSuccess = false;
            console.log("Da chui vao voi action: ", action);
        },

        registerSuccess(state, action: PayloadAction<any>) {
            console.log(action.payload.data.message);
            state.loading = false;

            notification.open({
                message: action.payload.data.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });

            // state.user = action.payload.user
            state.isSuccess = true;
            state.registerSuccess = true;
        },

        registerFail(state, action: PayloadAction<any>) {
            console.log(action);

            notification.open({
                message: action.payload.response?.message ? action.payload.response?.message : "Đăng ký không thành công!",
                // description:
                //     action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            state.loading = false;
            state.registerSuccess = false;
        },

        changePasswordRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        changePasswordSuccess(state, action: PayloadAction<any>) {
            console.log(action.payload);
            state.loading = false;

            notification.open({
                message: 'Đổi mật khẩu thành công!',
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        changePasswordFail(state, action: PayloadAction<any>) {
            console.log(action);

            notification.open({
                message: action.payload.response?.message ? action.payload.response?.message : "Đổi mật khẩu không thành công!",
                // description:
                //     action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            state.loading = false;
        }
    },
});

const login$: RootEpic = (action$) =>
    action$.pipe(
        filter(loginRequest.match),
        mergeMap((re) => {
            // IdentityApi.login(re.payload) ?
            console.log(re);
            const body: any = {
                email: re.payload.email,
                password: re.payload.password,
                remember: re.payload.remember,
                additionalProp1: {},
            };

            return IdentityApi.login(body).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    console.log(res.data.accessToken);

                    return [
                        loginSlice.actions.loginSuccess(res.data),
                        loginSlice.actions.getUserInfoRequest(res.data.accessToken),
                        loginSlice.actions.setLoading(false),
                        loginSlice.actions.setStatusCode(res.statusCode),
                    ];
                }),
                catchError((err) => [loginSlice.actions.loginFail(err)])
            );
        })
    );

const clearMessage$: RootEpic = (action$) =>
    action$.pipe(
        filter(clearMessageResquest.match),
        map(() => {
            return loginSlice.actions.clearMessage();
        })
    );

const logOut$: RootEpic = (action$) =>
    action$.pipe(
        filter(clearAllRequest.match),
        mergeMap(() => {
            return [
                loginSlice.actions.clearAllRequest(),
                loginSlice.actions.setLoading(false),
            ];
        })
    );

const register$: RootEpic = (action$) =>
    action$.pipe(
        filter(registerRequest.match),
        switchMap((re) => {
            console.log(re.payload);
            const body: any = {
                email: re.payload.email,
                password: re.payload.password,
                confirmPassword: re.payload.confirmPassword,
                name: re.payload.name,
                phone: re.payload.phone,
                address: re.payload.address,
                dob: re.payload.dob,
                gender: re.payload.gender,
                additionalProp1: {},
            };
            return IdentityApi.reqister(body).pipe(
                mergeMap((res: any) => {
                    return [
                        loginSlice.actions.setLoading(false),
                        loginSlice.actions.setStatusCode(res.statusCode),
                        loginSlice.actions.registerSuccess(res),
                    ];
                }),
                catchError((err) => [
                    loginSlice.actions.setStatusCode("UniqueEmail"),
                    loginSlice.actions.registerFail(err),
                ])
            );
        })
    );
const getUserInfo$: RootEpic = (action$) =>
    action$.pipe(
        filter(getUserInfoRequest.match),
        switchMap((re) => {
            console.log(re);
            return IdentityApi.getUserInfo(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    const token = res.data.accessToken;
                    const user = {
                        email: res.data.email,
                        name: res.data.name,
                        phone: res.data.phone,
                        address: res.data.address,
                        dob: res.data.dob,
                        gender: res.data.gender,
                        createdAt: res.data.createdAt,
                        updatedAt: res.data.updatedAt,
                    };
                    console.log(user);
                    return [
                        loginSlice.actions.getUserInfoSuccess({
                            user,
                            token: token,
                        }),
                    ];
                }),
                catchError((err) => [loginSlice.actions.getUserInfoFail(err)])
            );
        })
    );

const checkActiveAccount$: RootEpic = (action$) => action$.pipe(
    filter(checkActiveAccountRequest.match),
    switchMap((re) => {
        console.log(re);
        return IdentityApi.checkActiveAccount(re.payload).pipe(
            mergeMap((res: any) => {
                console.log(res);
                return [
                    loginSlice.actions.checkActiveAccountSuccess(res),
                ];
            }),
            catchError(err =>
                [loginSlice.actions.checkActiveAccountFailed(err)]
            )
        )
    })
)

const changePassword$: RootEpic = (action$) => action$.pipe(
    filter(changePasswordRequest.match),
    switchMap((re) => {
        console.log(re.payload);
        return UserApi.changePassword(re.payload).pipe(
            mergeMap((res: any) => {
                console.log(res);
                return [
                    loginSlice.actions.changePasswordSuccess(res),
                ];
            }),
            catchError(err =>
                [loginSlice.actions.changePasswordFail(err)]
            )
        )
    })
)
export const LoginEpics = [
    login$,
    clearMessage$,
    logOut$,
    register$,
    getUserInfo$,
    checkActiveAccount$,
    changePassword$,
];
export const {
    getUserInfoRequest,
    loginRequest,
    checkEmailRequest,
    forgotRequest,
    clearMessageResquest,
    clearAllRequest,
    registerRequest,
    checkAbleToLogin,
    checkActiveAccountRequest,
    changePasswordRequest,
} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
