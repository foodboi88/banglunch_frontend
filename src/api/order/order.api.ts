import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import Utils from "../../common/utils";
import { API_URL } from "../../enum/api.enum";
import HttpClient from "../http-client";

export default class OrderApi {
  static apiURL = API_URL;

  static getBillList(body: any): Observable<any> {
    const queryParam = Utils.parseObjectToQueryParameter(body);
    console.log(queryParam)
    const api = `${OrderApi.apiURL.HOST}/${this.apiURL.GET_BILL}`;
    return HttpClient.get(api).pipe(
      map(
        (res) => (res as any) || null,
        catchError((error) => new Observable())
      )
    );
  }

  static approveOrder(body: any): Observable<any> {
    const queryParam = Utils.parseObjectToQueryParameter(body);
    console.log(queryParam)
    const api = `${OrderApi.apiURL.HOST}/${this.apiURL.APPROVE_ORDER}`;
    return HttpClient.post(api, body).pipe(
      map(
        (res) => (res as any) || null,
        catchError((error) => new Observable())
      )
    );
  }
}
