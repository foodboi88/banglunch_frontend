/* eslint-disable new-parens */
import HttpClient from "../http-client";

import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enum/api.enum";

export default class ImageSketchApi {
    static apiURL = API_URL;

    static uploadSketchImage(body: any): Observable<any> {
        console.log(body)
        const api = `${ImageSketchApi.apiURL.HOST}/${this.apiURL.UPLOAD_IMAGE_OF_SKETCH}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
