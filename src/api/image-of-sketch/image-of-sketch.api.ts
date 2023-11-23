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

export default class ImageSketchApi {
    static apiURL = API_URL;

    static uploadSketchImage(param: any): Observable<any> {
        const api = `${ImageSketchApi.apiURL.HOST}/${this.apiURL.UPLOAD_IMAGE_OF_SKETCH}`;
        return HttpClient.post(api, param).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
