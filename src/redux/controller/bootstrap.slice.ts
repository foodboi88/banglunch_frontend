import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootEpic, SystemConfig } from "../../common/define-type";
import { filter, map, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import IdentityApi from "../../api/identity/identity.api";
// import MailServiceAPI from "../../../api/mail/mailservice.api";

interface BootstrapState {
    systemConfig: SystemConfig;
    isSuccess: boolean;
}
const PATH_SYSTEM_CONFIG = `${process.env.PUBLIC_URL}/assets/system-config.json`;
const IS_CONFIG_LOCAL = false;
const DEFAULT_CONFIG: SystemConfig = {
    protocol: "http",
    hostIdentity: "http://14.231.84.10:6068",
    hostMailService: "http://14.231.84.10:6068",
    hostMeetings: "http://14.231.84.10:6068",
    hostMember: "http://14.231.84.10:6068",
    hostTask: "hhttp://14.231.84.10:6068",
};
const initialStateBootstrap: BootstrapState = {
    systemConfig: DEFAULT_CONFIG,
    isSuccess: false,
};

function updateHostService(host: SystemConfig) {
    // IdentityApi.apiURL = host.hostIdentity;
}
const bootstrapSlice = createSlice({
    name: "bootstrap",
    initialState: initialStateBootstrap,
    reducers: {
        setSysytemConfig: (state, action: PayloadAction<SystemConfig>) => {
            updateHostService(action.payload);
            state.systemConfig = action.payload;
            state.isSuccess = true;
        },
        fetchConfig: (state) => {
            state.isSuccess = false;
        },
    },
});

const bootstrap$: RootEpic = (action$) =>
    action$.pipe(
        filter(fetchConfig.match),
        switchMap(() => {
            return ajax
                .getJSON(PATH_SYSTEM_CONFIG, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                })
                .pipe(
                    map((res) => {
                        const config = IS_CONFIG_LOCAL
                            ? DEFAULT_CONFIG
                            : (res as SystemConfig);
                        return bootstrapSlice.actions.setSysytemConfig(config);
                    })
                );
        })
    );

export const BoostrapEpics = [bootstrap$];

export const { fetchConfig } = bootstrapSlice.actions;
export const bootstrapReducer = bootstrapSlice.reducer;
