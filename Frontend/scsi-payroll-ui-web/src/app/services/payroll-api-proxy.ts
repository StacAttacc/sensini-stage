//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.19.0.0 (NJsonSchema v10.9.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class EmployeesService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "https://localhost:5001";
    }

    /**
     * @return Success
     */
    employeesGet(): Observable<Employee[]> {
        let url_ = this.baseUrl + "/api/human-ressources/v1/employees/employees";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processEmployeesGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processEmployeesGet(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<Employee[]>;
                }
            } else
                return _observableThrow(response_) as any as Observable<Employee[]>;
        }));
    }

    protected processEmployeesGet(response: HttpResponseBase): Observable<Employee[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        let _mappings: { source: any, target: any }[] = [];
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : jsonParse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(Employee.fromJS(item, _mappings));
            }
            else {
                result200 = <any>null;
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param body (optional)
     * @return Success
     */
    employeesPost(body: Employee | undefined): Observable<Employee> {
        let url_ = this.baseUrl + "/api/human-ressources/v1/employees/employees";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processEmployeesPost(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processEmployeesPost(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<Employee>;
                }
            } else
                return _observableThrow(response_) as any as Observable<Employee>;
        }));
    }

    protected processEmployeesPost(response: HttpResponseBase): Observable<Employee> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        let _mappings: { source: any, target: any }[] = [];
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : jsonParse(_responseText, this.jsonParseReviver);
            result200 = Employee.fromJS(resultData200, _mappings);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    employeeById(id: number | undefined): Observable<Employee> {
        let url_ = this.baseUrl + "/api/human-ressources/v1/employees/employee-by-id?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processEmployeeById(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processEmployeeById(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<Employee>;
                }
            } else
                return _observableThrow(response_) as any as Observable<Employee>;
        }));
    }

    protected processEmployeeById(response: HttpResponseBase): Observable<Employee> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        let _mappings: { source: any, target: any }[] = [];
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : jsonParse(_responseText, this.jsonParseReviver);
            result200 = Employee.fromJS(resultData200, _mappings);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    employeeDeleteById(id: number | undefined): Observable<Employee> {
        let url_ = this.baseUrl + "/api/human-ressources/v1/employees/employee-delete-by-id?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processEmployeeDeleteById(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processEmployeeDeleteById(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<Employee>;
                }
            } else
                return _observableThrow(response_) as any as Observable<Employee>;
        }));
    }

    protected processEmployeeDeleteById(response: HttpResponseBase): Observable<Employee> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        let _mappings: { source: any, target: any }[] = [];
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : jsonParse(_responseText, this.jsonParseReviver);
            result200 = Employee.fromJS(resultData200, _mappings);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

@Injectable()
export class SocialContributionService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "https://localhost:5001";
    }

    /**
     * @return Success
     */
    socialContributions(): Observable<SocialContribution[]> {
        let url_ = this.baseUrl + "/api/tax/v1/social-contribution/social-contributions";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processSocialContributions(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSocialContributions(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<SocialContribution[]>;
                }
            } else
                return _observableThrow(response_) as any as Observable<SocialContribution[]>;
        }));
    }

    protected processSocialContributions(response: HttpResponseBase): Observable<SocialContribution[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        let _mappings: { source: any, target: any }[] = [];
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : jsonParse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(SocialContribution.fromJS(item, _mappings));
            }
            else {
                result200 = <any>null;
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    socialContributionById(id: number | undefined): Observable<SocialContribution> {
        let url_ = this.baseUrl + "/api/tax/v1/social-contribution/social-contribution-by-id?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processSocialContributionById(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSocialContributionById(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<SocialContribution>;
                }
            } else
                return _observableThrow(response_) as any as Observable<SocialContribution>;
        }));
    }

    protected processSocialContributionById(response: HttpResponseBase): Observable<SocialContribution> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        let _mappings: { source: any, target: any }[] = [];
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : jsonParse(_responseText, this.jsonParseReviver);
            result200 = SocialContribution.fromJS(resultData200, _mappings);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    socialContributionDeleteById(id: number | undefined): Observable<SocialContribution> {
        let url_ = this.baseUrl + "/api/tax/v1/social-contribution/social-contribution-delete-by-id?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processSocialContributionDeleteById(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSocialContributionDeleteById(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<SocialContribution>;
                }
            } else
                return _observableThrow(response_) as any as Observable<SocialContribution>;
        }));
    }

    protected processSocialContributionDeleteById(response: HttpResponseBase): Observable<SocialContribution> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        let _mappings: { source: any, target: any }[] = [];
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : jsonParse(_responseText, this.jsonParseReviver);
            result200 = SocialContribution.fromJS(resultData200, _mappings);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param body (optional)
     * @return Success
     */
    socialContribution(body: SocialContribution | undefined): Observable<SocialContribution> {
        let url_ = this.baseUrl + "/api/tax/v1/social-contribution/social-contribution";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processSocialContribution(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSocialContribution(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<SocialContribution>;
                }
            } else
                return _observableThrow(response_) as any as Observable<SocialContribution>;
        }));
    }

    protected processSocialContribution(response: HttpResponseBase): Observable<SocialContribution> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        let _mappings: { source: any, target: any }[] = [];
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : jsonParse(_responseText, this.jsonParseReviver);
            result200 = SocialContribution.fromJS(resultData200, _mappings);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

export class Employee implements IEmployee {
    id?: number;
    firstName?: string | undefined;
    lastName?: string | undefined;
    birthDate?: Date;
    nas?: string | undefined;

    constructor(data?: IEmployee) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any, _mappings?: any) {
        if (_data) {
            this.id = _data["id"];
            this.firstName = _data["firstName"];
            this.lastName = _data["lastName"];
            this.birthDate = _data["birthDate"] ? new Date(_data["birthDate"].toString()) : <any>undefined;
            this.nas = _data["nas"];
        }
    }

    static fromJS(data: any, _mappings?: any): Employee | null {
        data = typeof data === 'object' ? data : {};
        return createInstance<Employee>(data, _mappings, Employee);
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["firstName"] = this.firstName;
        data["lastName"] = this.lastName;
        data["birthDate"] = this.birthDate ? this.birthDate.toISOString() : <any>undefined;
        data["nas"] = this.nas;
        return data;
    }
}

export interface IEmployee {
    id?: number;
    firstName?: string | undefined;
    lastName?: string | undefined;
    birthDate?: Date;
    nas?: string | undefined;
}

export class SocialContribution implements ISocialContribution {
    id?: number;
    year?: number;
    rrqRate?: number;
    rrqMga?: number;
    employmentInsurance?: number;
    rqapRate?: number;
    rqapMga?: number;

    constructor(data?: ISocialContribution) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any, _mappings?: any) {
        if (_data) {
            this.id = _data["id"];
            this.year = _data["year"];
            this.rrqRate = _data["rrqRate"];
            this.rrqMga = _data["rrqMga"];
            this.employmentInsurance = _data["employmentInsurance"];
            this.rqapRate = _data["rqapRate"];
            this.rqapMga = _data["rqapMga"];
        }
    }

    static fromJS(data: any, _mappings?: any): SocialContribution | null {
        data = typeof data === 'object' ? data : {};
        return createInstance<SocialContribution>(data, _mappings, SocialContribution);
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["year"] = this.year;
        data["rrqRate"] = this.rrqRate;
        data["rrqMga"] = this.rrqMga;
        data["employmentInsurance"] = this.employmentInsurance;
        data["rqapRate"] = this.rqapRate;
        data["rqapMga"] = this.rqapMga;
        return data;
    }
}

export interface ISocialContribution {
    id?: number;
    year?: number;
    rrqRate?: number;
    rrqMga?: number;
    employmentInsurance?: number;
    rqapRate?: number;
    rqapMga?: number;
}

function jsonParse(json: any, reviver?: any) {
    json = JSON.parse(json, reviver);

    var byid: any = {};
    var refs: any = [];
    json = (function recurse(obj: any, prop?: any, parent?: any) {
        if (typeof obj !== 'object' || !obj)
            return obj;

        if ("$ref" in obj) {
            let ref = obj.$ref;
            if (ref in byid)
                return byid[ref];
            refs.push([parent, prop, ref]);
            return undefined;
        } else if ("$id" in obj) {
            let id = obj.$id;
            delete obj.$id;
            if ("$values" in obj)
                obj = obj.$values;
            byid[id] = obj;
        }

        if (Array.isArray(obj)) {
            obj = obj.map((v, i) => recurse(v, i, obj));
        } else {
            for (var p in obj) {
                if (obj.hasOwnProperty(p) && obj[p] && typeof obj[p] === 'object')
                    obj[p] = recurse(obj[p], p, obj);
            }
        }

        return obj;
    })(json);

    for (let i = 0; i < refs.length; i++) {
        const ref = refs[i];
        ref[0][ref[1]] = byid[ref[2]];
    }

    return json;
}

function createInstance<T>(data: any, mappings: any, type: any): T | null {
  if (!mappings)
    mappings = [];
  if (!data)
    return null;

  const mappingIndexName = "__mappingIndex";
  if (data[mappingIndexName])
    return <T>mappings[data[mappingIndexName]].target;

  data[mappingIndexName] = mappings.length;

  let result: any = new type();
  mappings.push({ source: data, target: result });
  result.init(data, mappings);
  return result;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}
