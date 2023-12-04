/* eslint-disable new-parens */
import HttpClient from "../http-client";

import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enum/api.enum";

export default class DeliveryApi {
  static apiURL = API_URL;

  static createShippingOrder(body: any): Observable<any> {
    const api = `${DeliveryApi.apiURL.HOST}/${this.apiURL.CREATE_SHIPPING_ORDER}`;
    return HttpClient.post(api, body).pipe(
      map(
        (res) => (res as any) || null,
        catchError((error) => new Observable())
      )
    );
  }

}
