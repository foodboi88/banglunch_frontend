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
    IUploadSketchRequest,
} from "../../common/sketch.interface";
import axios from "axios";
import Utils from "../../common/utils";

export default class SketchsApi {
    static apiURL = API_URL;

    static getSketchById(sketchId: string): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_DETAIL_SKETCH}?id=${sketchId}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getValSketchById(sketchId: string) {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_DETAIL_SKETCH}?id=${sketchId}`;
        var config = {
            method: "get",
            url: api,
            headers: {},
        };
        return axios(config);
    }
    static getLatestSketchs(params: IReqGetLatestSketchs): Observable<any> {
        console.log(params);
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_LATEST_SKETCH}?size=${params.size}&offset=${params.offset}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getMostViewsSketchs(params: IReqGetLatestSketchs): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_MOST_VIEWS_SKETCH}?size=${params.size}&offset=${params.offset}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getSketchsByTypeOfArchitecture(typeId: string): Observable<any> {
        const pageSize = 10;
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_SKETCHS_BY_ARCHITECTURE}?typeOfArchitectureId=${typeId}&size=${pageSize}&offset=${0}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getSketchsByType(type: string): Observable<any> {
        const pageSize = 15;
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_SKETCH_BY_TYPE}?size=${pageSize}&offset=0&type=${type}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    //Tim kiem nang cao
    static advancedSearching(body: ICurrentSearchValue): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body)
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.ADVANCED_SEARCHING}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static uploadSketchContent(body: any): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.UPLOAD_CONTENT_OF_SKETCH}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static uploadSketchFile(body: any): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.UPLOAD_FILES_OF_SKETCH}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getAuthorById(authorId: string): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_AUTHOR_BY_ID}/${authorId}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getSketchListByAuthorId(authorId: string): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_SKETCH_LIST_BY_AUTHOR_ID}?shopId=${authorId}&size=40&offset=0`;
        return HttpClient.get(api).pipe( 
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getProductFilesById(sketchId: string,): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_PRODUCT_FILE_BY_ID}?id=${sketchId}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    // Thêm bản vẽ vào giỏ hàng
    static addSketchToCart(body: any): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.ADD_SKETCH_TO_CART}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    // Lấy số lượng bản vẽ trong giỏ hàng
    static getSketchQuantityInCart(): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_SKETCH_QUANTITY_IN_CART}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    // Lấy tất cả bản vẽ trong giỏ hàng
    static getAllSketchInCart(): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_ALL_SKETCH_IN_CART}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    // Xóa sản phẩm trong giỏ
    static deleteSketchInCart(sketchId: string): Observable<any> {
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.DELETE_SKETCH_IN_CART}/${sketchId}`;
        return HttpClient.delete(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    // KTS quản lý bản vẽ
    static getAllSketchByArchitect(bodyrequest: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(bodyrequest);

        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.SKETCH_MANAGEMENT}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    // Xóa sản phẩm của KTS
    static deleteSketchOfArchitect(bodyrequest: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(bodyrequest);

        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.DELETE_PRODUCT}${queryParam}`;
        return HttpClient.delete(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    // Sửa sản phẩm của KTS <===== sửa ở đây nhé 
    static editSketchOfArchitect(bodyrequest: IUploadSketchRequest): Observable<any> {
        const finalBodyrequest = {
            title: bodyrequest.title,
            content: bodyrequest.content,
            price: bodyrequest.price,
            productDesignTools: [
              bodyrequest.productDesignTools
            ],
            productTypeOfArchitecture: [
              bodyrequest.productTypeOfArchitecture
            ],
          }
        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.EDIT_PRODUCT}/${bodyrequest.id}`;
        return HttpClient.put(api,finalBodyrequest).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    // Thống kê sản phẩm của KTS
    static getSketchStatistic(): Observable<any> {

        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.STATISTIC_PRODUCT}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    // get danh sach san pham da mua
    static getPurchasedSketchs(bodyrequest: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(bodyrequest);

        const api = `${SketchsApi.apiURL.HOST}/${this.apiURL.GET_PURCHASED_SKETCHS}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
