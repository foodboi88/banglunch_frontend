/* eslint-disable new-parens */
import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enum/api.enum";
import HttpClient from "../http-client";

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
