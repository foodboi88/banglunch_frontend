/* eslint-disable new-parens */
import HttpClient from "../http-client";
import SYSTEM_CONSTANTS from "../../common/constants";

import {
    GetAllMemberReq,
    GetAllMembersWithRoleReq,
} from "../../common/define-type";
import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enum/api.enum";
import {
    ICurrentSearchValue,
    IReqGetLatestSketchs,
} from "../../common/sketch.interface";
import { IBank, IReqFormArchitect, IReqLookUp } from "../../common/profile.interface";

export default class ProfileAPI {
    static apiURL = API_URL;

    static getBusiness(taxCode: string): Observable<any> {
        const api = `${this.apiURL.GET_BUSINESS}/${taxCode}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static sellerRegister(data: IReqFormArchitect): Observable<any> {
        const api = `${ProfileAPI.apiURL.HOST}/${this.apiURL.SELLER_REGISTER}`;
        return HttpClient.post(api, data).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getBanks(): Observable<any> {
        const api = `${this.apiURL.GET_BANKS}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getAccountBankName(req: IReqLookUp): Observable<any> {
        const api = `${this.apiURL.GET_ACCOUNT_BANK_NAME}`;
        return HttpClient.post(api, req).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
