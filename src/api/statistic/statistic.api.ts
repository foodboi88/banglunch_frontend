import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enum/api.enum";
import HttpClient from "../http-client";
import Utils from "../../common/utils";

export default class StatisticAPI {
    static apiURL = API_URL;

    // Lấy ra thống kê tổng quan về tổng doanh thu, số lượng đơn hàng, số lượng sản phẩm, số lượng người dùng của cửa hàng
    static getOverViewStatistic(): Observable<any> {
        const api = `${StatisticAPI.apiURL.HOST}/${this.apiURL.OVERVIEW_STATISTIC}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    // Lấy ra thống kê theo ngày
    static getOverViewStatisticDay(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${StatisticAPI.apiURL.HOST}/${this.apiURL.OVERVIEW_STATISTIC_DAY}${queryParam}`;
        console.log(api);

        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }


    // Lấy ra thống kê theo tháng
    static getOverViewStatisticMonth(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${StatisticAPI.apiURL.HOST}/${this.apiURL.OVERVIEW_STATISTIC_MONTH}${queryParam}`;
        console.log(api);

        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    // Lấy ra thống kê theo quý
    static getOverViewStatisticQuarter(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${StatisticAPI.apiURL.HOST}/${this.apiURL.OVERVIEW_STATISTIC_QUARTER}${queryParam}`;
        console.log(api);

        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    // Lấy ra thống kê theo năm
    static getOverViewStatisticYear(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${StatisticAPI.apiURL.HOST}/${this.apiURL.OVERVIEW_STATISTIC_YEAR}${queryParam}`;
        console.log(api);

        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    // Lấy ra thống kế user theo ngày
    static getUserStatisticDay(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${StatisticAPI.apiURL.HOST}/${this.apiURL.USER_STATISTIC_DAY}${queryParam}`;
        console.log(api);

        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    // Lấy ra thống kế seller theo ngày
    static getSellerStatisticDay(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${StatisticAPI.apiURL.HOST}/${this.apiURL.SELLER_STATISTIC_DAY}${queryParam}`;
        console.log(api);

        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
