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
   * @param params The `PaintingsService.UploadPaintingParams` containing the following parameters:
   *
   * - `width`:
   *
   * - `price`:
   *
   * - `name`:
   *
   * - `image`:
   *
   * - `height`:
   *
   * - `genres`:
   *
   * - `author`:
   *
   * - `description`:
   *
   * @return OK
   */
  uploadPaintingResponse(params: PaintingsService.UploadPaintingParams): __Observable<__StrictHttpResponse<PaintingResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let __formData = new FormData();
    __body = __formData;
    if (params.width != null) { __formData.append('width', JSON.stringify(params.width));}
    if (params.price != null) { __formData.append('price', JSON.stringify(params.price));}
    if (params.name != null) { __formData.append('name', params.name as string | Blob);}
    if (params.image != null) { __formData.append('image', params.image as string | Blob);}
    if (params.height != null) { __formData.append('height', JSON.stringify(params.height));}
    (params.genres || []).forEach(val => {if (val != null) __formData.append('genres', val as string | Blob)});
    if (params.author != null) { __formData.append('author', params.author as string | Blob);}
    if (params.description != null) { __formData.append('description', params.description as string | Blob);}
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
   * @param params The `PaintingsService.UploadPaintingParams` containing the following parameters:
   *
   * - `width`:
   *
   * - `price`:
   *
   * - `name`:
   *
   * - `image`:
   *
   * - `height`:
   *
   * - `genres`:
   *
   * - `author`:
   *
   * - `description`:
   *
   * @return OK
   */
  uploadPainting(params: PaintingsService.UploadPaintingParams): __Observable<PaintingResponse> {
    return this.uploadPaintingResponse(params).pipe(
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

  /**
   * Parameters for uploadPainting
   */
  export interface UploadPaintingParams {
    width: number;
    price: number;
    name: string;
    image: Blob;
    height: number;
    genres: Array<string>;
    author: string;
    description?: string;
  }
}

export { PaintingsService }
