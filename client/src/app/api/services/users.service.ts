/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AuthUserResponse } from '../models/auth-user-response';
import { User } from '../models/user';
import { UsersResponse } from '../models/users-response';
import { UserResponse } from '../models/user-response';
import { BaseResponse } from '../models/base-response';

/**
 * User management
 */
@Injectable({
  providedIn: 'root',
})
class UsersService extends __BaseService {
  static readonly postUsersAuthPath = '/users/auth';
  static readonly getUsersPath = '/users';
  static readonly postUsersPath = '/users';
  static readonly getUsersUserIdPath = '/users/{userId}';
  static readonly putUsersUserIdPath = '/users/{userId}';
  static readonly deleteUsersUserIdPath = '/users/{userId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Authorize user
   * @param body undefined
   * @return OK
   */
  postUsersAuthResponse(body: User): __Observable<__StrictHttpResponse<AuthUserResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/users/auth`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AuthUserResponse>;
      })
    );
  }
  /**
   * Authorize user
   * @param body undefined
   * @return OK
   */
  postUsersAuth(body: User): __Observable<AuthUserResponse> {
    return this.postUsersAuthResponse(body).pipe(
      __map(_r => _r.body as AuthUserResponse)
    );
  }

  /**
   * Get all users
   * @return OK
   */
  getUsersResponse(): __Observable<__StrictHttpResponse<UsersResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/users`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UsersResponse>;
      })
    );
  }
  /**
   * Get all users
   * @return OK
   */
  getUsers(): __Observable<UsersResponse> {
    return this.getUsersResponse().pipe(
      __map(_r => _r.body as UsersResponse)
    );
  }

  /**
   * Create a new user
   * @param body undefined
   * @return OK
   */
  postUsersResponse(body: User): __Observable<__StrictHttpResponse<UserResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/users`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserResponse>;
      })
    );
  }
  /**
   * Create a new user
   * @param body undefined
   * @return OK
   */
  postUsers(body: User): __Observable<UserResponse> {
    return this.postUsersResponse(body).pipe(
      __map(_r => _r.body as UserResponse)
    );
  }

  /**
   * Get the user by id
   * @param userId undefined
   * @return OK
   */
  getUsersUserIdResponse(userId: string): __Observable<__StrictHttpResponse<UserResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/users/${encodeURIComponent(userId)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserResponse>;
      })
    );
  }
  /**
   * Get the user by id
   * @param userId undefined
   * @return OK
   */
  getUsersUserId(userId: string): __Observable<UserResponse> {
    return this.getUsersUserIdResponse(userId).pipe(
      __map(_r => _r.body as UserResponse)
    );
  }

  /**
   * Update the user
   * @param params The `UsersService.PutUsersUserIdParams` containing the following parameters:
   *
   * - `userId`:
   *
   * - `body`:
   *
   * @return OK
   */
  putUsersUserIdResponse(params: UsersService.PutUsersUserIdParams): __Observable<__StrictHttpResponse<UserResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/users/${encodeURIComponent(params.userId)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserResponse>;
      })
    );
  }
  /**
   * Update the user
   * @param params The `UsersService.PutUsersUserIdParams` containing the following parameters:
   *
   * - `userId`:
   *
   * - `body`:
   *
   * @return OK
   */
  putUsersUserId(params: UsersService.PutUsersUserIdParams): __Observable<UserResponse> {
    return this.putUsersUserIdResponse(params).pipe(
      __map(_r => _r.body as UserResponse)
    );
  }

  /**
   * Delete the user
   * @param userId undefined
   * @return OK
   */
  deleteUsersUserIdResponse(userId: string): __Observable<__StrictHttpResponse<BaseResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/users/${encodeURIComponent(userId)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<BaseResponse>;
      })
    );
  }
  /**
   * Delete the user
   * @param userId undefined
   * @return OK
   */
  deleteUsersUserId(userId: string): __Observable<BaseResponse> {
    return this.deleteUsersUserIdResponse(userId).pipe(
      __map(_r => _r.body as BaseResponse)
    );
  }
}

module UsersService {

  /**
   * Parameters for putUsersUserId
   */
  export interface PutUsersUserIdParams {
    userId: string;
    body: User;
  }
}

export { UsersService }
