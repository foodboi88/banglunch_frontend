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

export default class CommentsApi {
    static apiURL = API_URL;

    //Doi lai Endpoint API sau khi co API moi

    static getCommentsBySketchId(params: any): Observable<any> {
        const api = `${CommentsApi.apiURL.HOST}/${this.apiURL.GET_COMMENTS_BY_SKETCH_ID}?size=${params.size}&offset=${params.offset}&productId=${params.productId}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
