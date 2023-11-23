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

export default class RatesApi {
    static apiURL = API_URL;

    static getRatesBySketchId(sketchId: string): Observable<any> {
        const api = `${RatesApi.apiURL.HOST}/${this.apiURL.GET_RATES_BY_SKETCH_ID}/${sketchId}?size=100&offset=0`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }


}
