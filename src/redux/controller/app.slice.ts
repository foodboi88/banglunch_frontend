import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageType, NavbarType } from "../../common/define-type";
import GLobalPkm from "../../common/global";

interface AppState {
    language: LanguageType;
    navbar: NavbarType,
    hotelName: string;
    hotelId: string;
    isTimeLineGuid: boolean,
    lastNightAudit: string,
    roomTypePMId: string
}

const initAppState: AppState = {
    language: 'vi',
    navbar: 'dashboard',
    hotelName: 'Hotel name',
    hotelId: "",
    isTimeLineGuid: false,
    lastNightAudit: "",
    roomTypePMId: GLobalPkm.defaultBytes32
}

const appSlice = createSlice({
    name: 'app',
    initialState: initAppState,
    reducers: {
        changeLanguage(state, action: PayloadAction<LanguageType>) {
            state.language = action.payload
        },
        setNavbar(state, action: PayloadAction<NavbarType>) {
            const navbar = action.payload;
            if (navbar !== state.navbar) {
                state.navbar = action.payload
            }
        },
        selectHotel(state, action: PayloadAction<{ hotelName: string, hotelId: string, businessDate: string, lastNightAudit: string }>) {
            state.hotelId = action.payload.hotelId;
            state.hotelName = action.payload.hotelName;
            state.lastNightAudit = action.payload.lastNightAudit
        },
        setTimeLineGuid(state, action: PayloadAction<boolean>) {
            state.isTimeLineGuid = action.payload;
        },
        setRoomTypePm: (state, action: PayloadAction<string>) => {
            state.roomTypePMId = action.payload;
        }
    }
})
export const {
    changeLanguage,
    setNavbar,
    selectHotel,
    setTimeLineGuid,
} = appSlice.actions;

export const AppEpics = [
];

export const appReducer = appSlice.reducer