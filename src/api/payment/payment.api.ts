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
import { IReqGetLatestSketchs } from "../../common/sketch.interface";
import { IPaymentRequest } from "../../common/payment.interface";

export default class PaymentApi {
    static apiURL = API_URL;

    static purchaseWithVNPay(body: IPaymentRequest): Observable<any> {
        const api = `${PaymentApi.apiURL.HOST}/${this.apiURL.PAYMENT}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
