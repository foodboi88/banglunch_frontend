/* eslint-disable new-parens */
import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enum/api.enum";
import HttpClient from "../http-client";

export default class RatesApi {
    static apiURL = API_URL;

    static getRatesBySketchId(foodId: string): Observable<any> {
        const api = `${RatesApi.apiURL.HOST}/${this.apiURL.GET_RATES_BY_SKETCH_ID}?foodId=${foodId}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }


}
