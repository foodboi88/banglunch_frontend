/* eslint-disable new-parens */
import HttpClient from "../http-client";

import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { ICreateOrder } from "../../common/order.interface";
import { API_URL } from "../../enum/api.enum";

export default class PaymentApi {
    static apiURL = API_URL;

    static purchase(body: ICreateOrder): Observable<any> {
        const api = `${PaymentApi.apiURL.HOST}/${this.apiURL.PAYMENT}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
