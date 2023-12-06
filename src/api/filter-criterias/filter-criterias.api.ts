/* eslint-disable new-parens */
import SYSTEM_CONSTANTS from "../../common/constants";
import HttpClient from "../http-client";

import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { IReqGetLatestSketchs } from "../../common/sketch.interface";
import { API_URL } from "../../enum/api.enum";

export default class FilterCriteriasApi {
    static apiURL = API_URL;

    //Doi lai Endpoint API sau khi co API moi

    static getTools(params: IReqGetLatestSketchs): Observable<any> {
        const api = `${FilterCriteriasApi.apiURL.HOST}/${this.apiURL.GET_ALL_TOOLS}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static createTools(body: any): Observable<any> {
        const api = `${FilterCriteriasApi.apiURL}/${SYSTEM_CONSTANTS.API.MEETINGS.CREATE_MEETINGS}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static updateTools(meetingId: string, body: any): Observable<any> {
        const api = `${FilterCriteriasApi.apiURL.HOST
            }/${SYSTEM_CONSTANTS.API.MEETINGS.UPDATE_MEETINGS.replace(
                "{meetingId}",
                meetingId
            )}`;
        return HttpClient.put(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static deleteTools(meetingId: string): Observable<any> {
        const api = `${FilterCriteriasApi.apiURL.HOST
            }/${SYSTEM_CONSTANTS.API.MEETINGS.DELETE_MEETINGS.replace(
                "{meetingId}",
                meetingId
            )}`;
        return HttpClient.delete(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getStyles(params: IReqGetLatestSketchs): Observable<any> {
        const api = `${FilterCriteriasApi.apiURL.HOST}/${this.apiURL.GET_ALL_STYLE}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getArchitectures(): Observable<any> {
        const api = `${FilterCriteriasApi.apiURL.HOST}/${this.apiURL.GET_ALL_ARCHITECTURE}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
