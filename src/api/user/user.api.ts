import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enum/api.enum";
import HttpClient from "../http-client";
import Utils from "../../common/utils";

export default class UserApi {
    static apiURL = API_URL;

    // Lấy ra thống kê tổng quan về tổng doanh thu, số lượng đơn hàng, số lượng sản phẩm, số lượng người dùng của cửa hàng
    static getOverViewStatistic(): Observable<any> {
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.GET_OVERVIEW_STATISTIC}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    // Lấy ra các sản phẩm hot nhất
    static getHotProducts(body: any): Observable<any> {
        console.log(body);

        const api = `${UserApi.apiURL.HOST}/${this.apiURL.GET_HOT_PRODUCTS}?size=${body.size}&offset=${body.offset}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }


    static getAllWithdrawRequests(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        console.log(queryParam)
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.WITHDRAW_REQUEST}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static createWithdrawRequest(body: any): Observable<any> {
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.CREATE_WITHDRAW_REQUEST}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static confirmPurchased(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        console.log(queryParam)
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.VNPAY_RETURN}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getBillList(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        console.log(queryParam)
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.GET_BILL}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getDetailBill(id: string): Observable<any> {
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.GET_BILL_DETAIL}/${id}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static changePassword(body: any): Observable<any> {
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.CHANGE_PASSWORD}`;
        return HttpClient.put(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

}
