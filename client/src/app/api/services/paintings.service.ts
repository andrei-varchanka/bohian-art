/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PaintingsResponse } from '../models/paintings-response';
import { PaintingResponse } from '../models/painting-response';
import { Painting } from '../models/painting';
import { BaseResponse } from '../models/base-response';

/**
 * Painting Management
 */
@Injectable({
  providedIn: 'root',
})
class PaintingsService extends __BaseService {
  static readonly getAllPaintingsPath = '/paintings';
  static readonly uploadPaintingPath = '/paintings';
  static readonly getPaintingPath = '/paintings/{paintingId}';
  static readonly deletePaintingPath = '/paintings/{paintingId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get all paintings
   * @return OK
   */
  getAllPaintingsResponse(): __Observable<__StrictHttpResponse<PaintingsResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/paintings`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PaintingsResponse>;
      })
    );
  }
  /**
   * Get all paintings
   * @return OK
   */
  getAllPaintings(): __Observable<PaintingsResponse> {
    return this.getAllPaintingsResponse().pipe(
      __map(_r => _r.body as PaintingsResponse)
    );
  }

  /**
   * Upload a new painting
   * @param body undefined
   * @return OK
   */
  uploadPaintingResponse(body: Painting): __Observable<__StrictHttpResponse<PaintingResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/paintings`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PaintingResponse>;
      })
    );
  }
  /**
   * Upload a new painting
   * @param body undefined
   * @return OK
   */
  uploadPainting(body: Painting): __Observable<PaintingResponse> {
    return this.uploadPaintingResponse(body).pipe(
      __map(_r => _r.body as PaintingResponse)
    );
  }

  /**
   * Get the painting by id
   * @param paintingId undefined
   * @return OK
   */
  getPaintingResponse(paintingId: string): __Observable<__StrictHttpResponse<PaintingResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/paintings/${encodeURIComponent(paintingId)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PaintingResponse>;
      })
    );
  }
  /**
   * Get the painting by id
   * @param paintingId undefined
   * @return OK
   */
  getPainting(paintingId: string): __Observable<PaintingResponse> {
    return this.getPaintingResponse(paintingId).pipe(
      __map(_r => _r.body as PaintingResponse)
    );
  }

  /**
   * Delete the painting
   * @param paintingId undefined
   * @return OK
   */
  deletePaintingResponse(paintingId: string): __Observable<__StrictHttpResponse<BaseResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/paintings/${encodeURIComponent(paintingId)}`,
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
   * Delete the painting
   * @param paintingId undefined
   * @return OK
   */
  deletePainting(paintingId: string): __Observable<BaseResponse> {
    return this.deletePaintingResponse(paintingId).pipe(
      __map(_r => _r.body as BaseResponse)
    );
  }
}

module PaintingsService {
}

export { PaintingsService }
