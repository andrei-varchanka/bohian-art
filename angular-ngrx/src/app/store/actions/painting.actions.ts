import { createAction, props } from "@ngrx/store";
import { Painting, PaintingsParametersResponse, PaintingsResponse } from "src/app/api/models";
import { PaintingsService } from "src/app/api/services";

export enum PaintingActions {
  CREATE_PAINTING = '[Painting Interface] Create Painting',
  CREATE_PAINTING_SUCCESS = '[Paintings API] Create Painting Success',
  CREATE_PAINTING_ERROR = '[Paintings API] Create Painting Error',

  GET_PAINTINGS_PARAMETERS = '[Gallery Interface] Get Paintings Parameters',
  GET_PAINTINGS_PARAMETERS_SUCCESS = '[Paintings API] Get Paintings Parameters Success',
  GET_PAINTINGS_PARAMETERS_ERROR = '[Paintings API] Get Paintings Parameters Error',

  GET_PAINTINGS = '[Gallery Interface] Get Paintings',
  GET_PAINTINGS_SUCCESS = '[Paintings API] Get Paintings Success',
  GET_PAINTINGS_ERROR = '[Paintings API] Get Paintings Error',

  GET_PAINTING = '[Painting Interface] Get Painting',
  GET_PAINTING_SUCCESS = '[Paintings API] Get Painting Success',
  GET_PAINTING_ERROR = '[Paintings API] Get Painting Error',

  UPDATE_PAINTING = '[Painting Interface] Update Painting',
  UPDATE_PAINTING_SUCCESS = '[Paintings API] Update Painting Success',
  UPDATE_PAINTING_ERROR = '[Paintings API] Update Painting Error',

  DELETE_PAINTING = '[Painting Interface] Delete Painting',
  DELETE_PAINTING_SUCCESS = '[Paintings API] Delete Painting Success',
  DELETE_PAINTING_ERROR = '[Paintings API] Delete Painting Error',
}

export const createPaintingAction = createAction(PaintingActions.CREATE_PAINTING, props<{ painting: Painting }>());
export const createPaintingSuccessAction = createAction(PaintingActions.CREATE_PAINTING_SUCCESS, props<{ painting: Painting }>());
export const createPaintingErrorAction = createAction(PaintingActions.CREATE_PAINTING_ERROR, props<{ error: Error }>());

export const getPaintingsParametersAction = createAction(PaintingActions.GET_PAINTINGS_PARAMETERS);
export const getPaintingsParametersSuccessAction = createAction(PaintingActions.GET_PAINTINGS_PARAMETERS_SUCCESS, props<{ paintingParameters: PaintingsParametersResponse }>());
export const getPaintingsParametersErrorAction = createAction(PaintingActions.GET_PAINTINGS_PARAMETERS_ERROR, props<{ error: Error }>());

export const getPaintingsAction = createAction(PaintingActions.GET_PAINTINGS, props<{ params: PaintingsService.GetAllPaintingsParams }>());
export const getPaintingsSuccessAction = createAction(PaintingActions.GET_PAINTINGS_SUCCESS, props<{ paintingsResponse: PaintingsResponse }>());
export const getPaintingsErrorAction = createAction(PaintingActions.GET_PAINTINGS_ERROR, props<{ error: Error }>());

export const getPaintingAction = createAction(PaintingActions.GET_PAINTING, props<{ paintingId: string }>());
export const getPaintingSuccessAction = createAction(PaintingActions.GET_PAINTING_SUCCESS, props<{ painting: Painting }>());
export const getPaintingErrorAction = createAction(PaintingActions.GET_PAINTING_ERROR, props<{ error: Error }>());

export const updatePaintingAction = createAction(PaintingActions.UPDATE_PAINTING, props<{ painting: Painting }>());
export const updatePaintingSuccessAction = createAction(PaintingActions.UPDATE_PAINTING_SUCCESS, props<{ painting: Painting }>());
export const updatePaintingErrorAction = createAction(PaintingActions.UPDATE_PAINTING_ERROR, props<{ error: Error }>());

export const deletePaintingAction = createAction(PaintingActions.DELETE_PAINTING, props<{ paintingId: string }>());
export const deletePaintingSuccessAction = createAction(PaintingActions.DELETE_PAINTING_SUCCESS, props<{ paintingId: string }>());
export const deletePaintingErrorAction = createAction(PaintingActions.DELETE_PAINTING_ERROR, props<{ error: Error }>());

