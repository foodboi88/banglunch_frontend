import Utils from "../common/utils";
import { throwError } from "rxjs";
import { ajax, AjaxError, AjaxRequest, AjaxResponse } from "rxjs/ajax";
import { Observable } from "rxjs/internal/Observable";
import { catchError, map, retry } from "rxjs/operators";
import IdentityApi from "./identity/identity.api";
import { notification } from "antd";

/** types */
type PartAjaxRequest = Omit<AjaxRequest, "url" | "method" | "body">;
type HttpMethod = "GET" | "POST" | "DELETE" | "PUT";
type HeadersAjax = {
    Authorization: string;
    Accept: string;
    "Content-Type": string;
    "Sec-Fetch-Site"?: string;
};
interface Param {
    url: string;
    data?: unknown;
    headers?: PartAjaxRequest;
}

/** functions */
function mapResponse(res: AjaxResponse) {
    if (res.response) {
        return res.response;
    }
}
function mapResponseHeader(res: AjaxResponse) {
    if (res.response) {
        return res;
    }
}
async function handleRefreshToken() {
    const refresh_token = Utils.getValueLocalStorage("refresh_token");
    const body = Utils.parseUrl({
        refresh_token: refresh_token,
        client_id: "PKM",
        grant_type: "refresh_token",
        scope: "offline_access API",
        orgId: Utils.getValueLocalStorage("organizationId") ?? "",
    });
    await IdentityApi.login(body)
        .toPromise()
        .then((res) => {
            if (res?.access_token) {
                window.location.reload();
                Utils.setLocalStorage("token", res.access_token);
                Utils.setLocalStorage("refresh_token", res.refresh_token);
            } else {
                document.location.href = "/";
                localStorage.clear();
            }
        });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function handleRefreshTokenWithOrgId(organizationId?: string) {
    const refresh_token = Utils.getValueLocalStorage("refresh_token");
    const body = Utils.parseUrl({
        refresh_token: refresh_token,
        // client_id: "PKM",
        // grant_type: "refresh_token",
        // scope: "offline_access API",
        // orgId: organizationId ?? "",
    });
    await IdentityApi.handleRefreshToken(body)
        .toPromise()
        .then((res) => {
            if (res?.access_token) {
                //window.location.reload();
                Utils.setLocalStorage("token", res.access_token);
                Utils.setLocalStorage("refresh_token", res.refresh_token);
            } else {
                document.location.href = "/";
                localStorage.clear();
            }
        });
}

function handleError$(err: AjaxError): Observable<unknown> {
    if (err) {
        if (err.status === 401) {
            document.location.href = "/";
            localStorage.clear();
            notification.open({
                message: 'Hết phiên đăng nhập',
                description: 'Vui lòng đăng nhập lại',
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
            // handleRefreshToken();
        }
    }
    console.log(err);
    return throwError(err);
}

function mapAjaxRequest(request?: PartAjaxRequest) {
    const token = Utils.getValueLocalStorage("token");
    const mapHeaders = request?.headers
        ? ({ ...request.headers } as HeadersAjax)
        : undefined;
    const newHeaders = {
        Authorization: token ? `Bearer ${token}` : "",
        Accept: "application/json",
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        // timezone: -new Date().getTimezoneOffset() / 60,
        // ...mapHeaders,
    };
    return { ...request, headers: { ...newHeaders } };
}

function commonApiCall(
    method: HttpMethod,
    param: Param,
    isGetHeader = false
): Observable<unknown> {
    const { url, data, headers } = param;
    const newHeaders = mapAjaxRequest(headers);
    const body = data;
    return ajax({ url, method, body, ...newHeaders }).pipe(
        map((res: AjaxResponse) =>
            !isGetHeader ? mapResponse(res) : mapResponseHeader(res)
        ),
        retry(2),
        catchError((err: any) => handleError$(err))
    );
}

/** base class */
export default class HttpClient {
    static get(url: string, headers?: PartAjaxRequest): Observable<unknown> {
        return commonApiCall("GET", { url, headers });
    }

    static post(
        url: string,
        data: unknown,
        headers?: PartAjaxRequest,
        isGetHeader?: boolean
    ): Observable<unknown> {
        return commonApiCall("POST", { url, data, headers }, isGetHeader);
    }

    static delete(
        url: string,
        data?: unknown,
        headers?: PartAjaxRequest
    ): Observable<unknown> {
        return commonApiCall("DELETE", { url, data, headers });
    }

    static put(
        url: string,
        data: unknown,
        headers?: PartAjaxRequest
    ): Observable<unknown> {
        return commonApiCall("PUT", { url, data, headers });
    }
    // static upload(
    //     url: string,
    //     data: unknown,
    //     headers?: PartAjaxRequest
    // ): Observable<unknown> {
    //     const newHeaders = mapAjaxRequest(headers);
    //     const { headers: newHeadersUpload, ...res } = newHeaders;
    //     // const { "Content-Type": tem, ...resUpload } = newHeadersUpload;
    //     // const resultHeaders = { ...res, headers: resUpload };

    //     return ajax({ url, method: "POST", body: data, ...resultHeaders }).pipe(
    //         map((res: AjaxResponse) => mapResponse(res)),
    //         retry(2),
    //         catchError((err: any) => handleError$(err))
    //     );
    // }
}
