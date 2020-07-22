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
import { PaintingsParametersResponse } from '../models/paintings-parameters-response';
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
  static readonly getParametersPath = '/paintings/parameters';
  static readonly getPaintingPath = '/paintings/{paintingId}';
  static readonly updatePaintingPath = '/paintings/{paintingId}';
  static readonly deletePaintingPath = '/paintings/{paintingId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Get all paintings
   * @param params The `PaintingsService.GetAllPaintingsParams` containing the following parameters:
   *
   * - `width_to`:
   *
   * - `width_from`:
   *
   * - `userId`:
   *
   * - `price_to`:
   *
   * - `price_from`:
   *
   * - `page`:
   *
   * - `limit`:
   *
   * - `height_to`:
   *
   * - `height_from`:
   *
   * - `genres`:
   *
   * @return OK
   */
  getAllPaintingsResponse(params: PaintingsService.GetAllPaintingsParams): __Observable<__StrictHttpResponse<PaintingsResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.widthTo != null) __params = __params.set('width_to', params.widthTo.toString());
    if (params.widthFrom != null) __params = __params.set('width_from', params.widthFrom.toString());
    if (params.userId != null) __params = __params.set('userId', params.userId.toString());
    if (params.priceTo != null) __params = __params.set('price_to', params.priceTo.toString());
    if (params.priceFrom != null) __params = __params.set('price_from', params.priceFrom.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.limit != null) __params = __params.set('limit', params.limit.toString());
    if (params.heightTo != null) __params = __params.set('height_to', params.heightTo.toString());
    if (params.heightFrom != null) __params = __params.set('height_from', params.heightFrom.toString());
    if (params.genres != null) __params = __params.set('genres', params.genres.toString());
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
   * @param params The `PaintingsService.GetAllPaintingsParams` containing the following parameters:
   *
   * - `width_to`:
   *
   * - `width_from`:
   *
   * - `userId`:
   *
   * - `price_to`:
   *
   * - `price_from`:
   *
   * - `page`:
   *
   * - `limit`:
   *
   * - `height_to`:
   *
   * - `height_from`:
   *
   * - `genres`:
   *
   * @return OK
   */
  getAllPaintings(params: PaintingsService.GetAllPaintingsParams): __Observable<PaintingsResponse> {
    return this.getAllPaintingsResponse(params).pipe(
      __map(_r => _r.body as PaintingsResponse)
    );
  }

  /**
   * Upload a new painting
   * @param params The `PaintingsService.UploadPaintingParams` containing the following parameters:
   *
   * - `width`:
   *
   * - `userId`:
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
    if (params.userId != null) { __formData.append('userId', params.userId as string | Blob);}
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
   * - `userId`:
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
   * Get paintings parameters
   * @return OK
   */
  getParametersResponse(): __Observable<__StrictHttpResponse<PaintingsParametersResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/paintings/parameters`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PaintingsParametersResponse>;
      })
    );
  }
  /**
   * Get paintings parameters
   * @return OK
   */
  getParameters(): __Observable<PaintingsParametersResponse> {
    return this.getParametersResponse().pipe(
      __map(_r => _r.body as PaintingsParametersResponse)
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
   * Update a new painting
   * @param params The `PaintingsService.UpdatePaintingParams` containing the following parameters:
   *
   * - `width`:
   *
   * - `userId`:
   *
   * - `price`:
   *
   * - `paintingId`:
   *
   * - `name`:
   *
   * - `height`:
   *
   * - `genres`:
   *
   * - `author`:
   *
   * - `image`:
   *
   * - `description`:
   *
   * @return OK
   */
  updatePaintingResponse(params: PaintingsService.UpdatePaintingParams): __Observable<__StrictHttpResponse<PaintingResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let __formData = new FormData();
    __body = __formData;
    if (params.width != null) { __formData.append('width', JSON.stringify(params.width));}
    if (params.userId != null) { __formData.append('userId', params.userId as string | Blob);}
    if (params.price != null) { __formData.append('price', JSON.stringify(params.price));}

    if (params.name != null) { __formData.append('name', params.name as string | Blob);}
    if (params.height != null) { __formData.append('height', JSON.stringify(params.height));}
    (params.genres || []).forEach(val => {if (val != null) __formData.append('genres', val as string | Blob)});
    if (params.author != null) { __formData.append('author', params.author as string | Blob);}
    if (params.image != null) { __formData.append('image', params.image as string | Blob);}
    if (params.description != null) { __formData.append('description', params.description as string | Blob);}
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/paintings/${encodeURIComponent(params.paintingId)}`,
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
   * Update a new painting
   * @param params The `PaintingsService.UpdatePaintingParams` containing the following parameters:
   *
   * - `width`:
   *
   * - `userId`:
   *
   * - `price`:
   *
   * - `paintingId`:
   *
   * - `name`:
   *
   * - `height`:
   *
   * - `genres`:
   *
   * - `author`:
   *
   * - `image`:
   *
   * - `description`:
   *
   * @return OK
   */
  updatePainting(params: PaintingsService.UpdatePaintingParams): __Observable<PaintingResponse> {
    return this.updatePaintingResponse(params).pipe(
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
   * Parameters for getAllPaintings
   */
  export interface GetAllPaintingsParams {
    widthTo?: number;
    widthFrom?: number;
    userId?: string;
    priceTo?: number;
    priceFrom?: number;
    page?: number;
    limit?: number;
    heightTo?: number;
    heightFrom?: number;
    genres?: string;
  }

  /**
   * Parameters for uploadPainting
   */
  export interface UploadPaintingParams {
    width: number;
    userId: string;
    price: number;
    name: string;
    image: Blob;
    height: number;
    genres: Array<string>;
    author: string;
    description?: string;
  }

  /**
   * Parameters for updatePainting
   */
  export interface UpdatePaintingParams {
    width: number;
    userId: string;
    price: number;
    paintingId: string;
    name: string;
    height: number;
    genres: Array<string>;
    author: string;
    image?: Blob;
    description?: string;
  }
}

export { PaintingsService }
