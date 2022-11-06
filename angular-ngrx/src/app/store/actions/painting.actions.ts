import { createAction, props } from "@ngrx/store";
import { Painting, PaintingsParametersResponse, PaintingsResponse } from "src/app/api/models";
import { PaintingsService } from "src/app/api/services";

export enum PaintingActions {
  CreatePainting = '[Painting Interface] Create Painting',
  CreatePaintingSuccess = '[Paintings API] Create Painting Success',
  CreatePaintingError = '[Paintings API] Create Painting Error',

  GetPaintingsParameters = '[Gallery Interface] Get Paintings Parameters',
  GetPaintingsParametersSuccess = '[Paintings API] Get Paintings Parameters Success',
  GetPaintingsParametersError = '[Paintings API] Get Paintings Parameters Error',

  GetPaintings = '[Gallery Interface] Get Paintings',
  GetPaintingsSuccess = '[Paintings API] Get Paintings Success',
  GetPaintingsError = '[Paintings API] Get Paintings Error',

  GetPainting = '[Painting Interface] Get Painting',
  GetPaintingSuccess = '[Paintings API] Get Painting Success',
  GetPaintingError = '[Paintings API] Get Painting Error',

  UpdatePainting = '[Painting Interface] Update Painting',
  UpdatePaintingSuccess = '[Paintings API] Update Painting Success',
  UpdatePaintingError = '[Paintings API] Update Painting Error',

  DeletePainting = '[Painting Interface] Delete Painting',
  DeletePaintingSuccess = '[Paintings API] Delete Painting Success',
  DeletePaintingError = '[Paintings API] Delete Painting Error',
}

// export const createPaintingAction = createAction(PaintingActions.CreatePainting, props<Painting>());
// export const createPaintingSuccessAction = createAction(PaintingActions.CreatePaintingSuccess, props<{token: string, Painting: Painting}>());
// export const createPaintingErrorAction = createAction(PaintingActions.CreatePaintingError, props<Error>());

export const getPaintingsParametersAction = createAction(PaintingActions.GetPaintingsParameters);
export const getPaintingsParametersSuccessAction = createAction(PaintingActions.GetPaintingsParametersSuccess, props<PaintingsParametersResponse>());
export const getPaintingsParametersErrorAction = createAction(PaintingActions.GetPaintingsParametersError, props<Error>());

export const getPaintingsAction = createAction(PaintingActions.GetPaintings, props<PaintingsService.GetAllPaintingsParams>());
export const getPaintingsSuccessAction = createAction(PaintingActions.GetPaintingsSuccess, props<PaintingsResponse>());
export const getPaintingsErrorAction = createAction(PaintingActions.GetPaintingsError, props<Error>());

// export const getPaintingAction = createAction(PaintingActions.GetPainting, props<{PaintingId: string}>());
// export const getPaintingSuccessAction = createAction(PaintingActions.GetPaintingSuccess, props<Painting>());
// export const getPaintingErrorAction = createAction(PaintingActions.GetPaintingError, props<Error>());

// export const updatePaintingAction = createAction(PaintingActions.UpdatePainting, props<Painting>());
// export const updatePaintingSuccessAction = createAction(PaintingActions.UpdatePaintingSuccess, props<Painting>());
// export const updatePaintingErrorAction = createAction(PaintingActions.UpdatePaintingError, props<Error>());

// export const deletePaintingAction = createAction(PaintingActions.DeletePainting, props<{PaintingId: string}>());
// export const deletePaintingSuccessAction = createAction(PaintingActions.DeletePaintingSuccess, props<{PaintingId: string}>());
// export const deletePaintingErrorAction = createAction(PaintingActions.DeletePaintingError, props<Error>());

