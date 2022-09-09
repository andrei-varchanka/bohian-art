/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AuthUserResponse } from '../models/auth-user-response';
import { AuthUser } from '../models/auth-user';
import { UsersResponse } from '../models/users-response';
import { User } from '../models/user';
import { UserResponse } from '../models/user-response';
import { BaseResponse } from '../models/base-response';

/**
 * User management
 */
@Injectable({
  providedIn: 'root',
})
class UsersService extends __BaseService {
  static readonly authPath = '/users/auth';
  static readonly getAllUsersPath = '/users';
  static readonly createUserPath = '/users';
  static readonly getUserPath = '/users/{userId}';
  static readonly updateUserPath = '/users/{userId}';
  static readonly deleteUserPath = '/users/{userId}';
  static readonly changePasswordPath = '/users/{userId}/change-password';

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
  authResponse(body: AuthUser): __Observable<__StrictHttpResponse<AuthUserResponse>> {
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
  auth(body: AuthUser): __Observable<AuthUserResponse> {
    return this.authResponse(body).pipe(
      __map(_r => _r.body as AuthUserResponse)
    );
  }

  /**
   * Get all users
   * @return OK
   */
  getAllUsersResponse(): __Observable<__StrictHttpResponse<UsersResponse>> {
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
  getAllUsers(): __Observable<UsersResponse> {
    return this.getAllUsersResponse().pipe(
      __map(_r => _r.body as UsersResponse)
    );
  }

  /**
   * Create a new user
   * @param body undefined
   * @return OK
   */
  createUserResponse(body: User): __Observable<__StrictHttpResponse<AuthUserResponse>> {
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
        return _r as __StrictHttpResponse<AuthUserResponse>;
      })
    );
  }
  /**
   * Create a new user
   * @param body undefined
   * @return OK
   */
  createUser(body: User): __Observable<AuthUserResponse> {
    return this.createUserResponse(body).pipe(
      __map(_r => _r.body as AuthUserResponse)
    );
  }

  /**
   * Get the user by id
   * @param userId undefined
   * @return OK
   */
  getUserResponse(userId: string): __Observable<__StrictHttpResponse<UserResponse>> {
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
  getUser(userId: string): __Observable<UserResponse> {
    return this.getUserResponse(userId).pipe(
      __map(_r => _r.body as UserResponse)
    );
  }

  /**
   * Update the user
   * @param params The `UsersService.UpdateUserParams` containing the following parameters:
   *
   * - `userId`:
   *
   * - `body`:
   *
   * @return OK
   */
  updateUserResponse(params: UsersService.UpdateUserParams): __Observable<__StrictHttpResponse<UserResponse>> {
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
   * @param params The `UsersService.UpdateUserParams` containing the following parameters:
   *
   * - `userId`:
   *
   * - `body`:
   *
   * @return OK
   */
  updateUser(params: UsersService.UpdateUserParams): __Observable<UserResponse> {
    return this.updateUserResponse(params).pipe(
      __map(_r => _r.body as UserResponse)
    );
  }

  /**
   * Delete the user
   * @param userId undefined
   * @return OK
   */
  deleteUserResponse(userId: string): __Observable<__StrictHttpResponse<BaseResponse>> {
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
  deleteUser(userId: string): __Observable<BaseResponse> {
    return this.deleteUserResponse(userId).pipe(
      __map(_r => _r.body as BaseResponse)
    );
  }

  /**
   * Change user password
   * @param params The `UsersService.ChangePasswordParams` containing the following parameters:
   *
   * - `userId`:
   *
   * - `body`:
   *
   * @return OK
   */
  changePasswordResponse(params: UsersService.ChangePasswordParams): __Observable<__StrictHttpResponse<UserResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/users/${encodeURIComponent(params.userId)}/change-password`,
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
   * Change user password
   * @param params The `UsersService.ChangePasswordParams` containing the following parameters:
   *
   * - `userId`:
   *
   * - `body`:
   *
   * @return OK
   */
  changePassword(params: UsersService.ChangePasswordParams): __Observable<UserResponse> {
    return this.changePasswordResponse(params).pipe(
      __map(_r => _r.body as UserResponse)
    );
  }
}

module UsersService {

  /**
   * Parameters for updateUser
   */
  export interface UpdateUserParams {
    userId: string;
    body: User;
  }

  /**
   * Parameters for changePassword
   */
  export interface ChangePasswordParams {
    userId: string;
    body: {password: string};
  }
}

export { UsersService }
