import { createReducer, on } from "@ngrx/store";
import { getPaintingsAction, getPaintingsErrorAction, getPaintingsParametersAction, getPaintingsParametersErrorAction, getPaintingsParametersSuccessAction, getPaintingsSuccessAction, PaintingActions } from "../actions/painting.actions";
import { initialPaintingState } from "../state/painting.state";

export const paintingReducer = createReducer(
  initialPaintingState,
  on(getPaintingsAction, (state) => ({ ...state, action: PaintingActions.GetPaintings, done: false, error: null })),
  on(getPaintingsSuccessAction, (state, payload) => ({ ...state, done: true, paintings: payload.paintings, count: payload.count })),
  on(getPaintingsErrorAction, (state, payload) => ({ ...state, done: true, error: payload })),

  on(getPaintingsParametersAction, (state) => ({ ...state, action: PaintingActions.GetPaintingsParameters, done: false, error: null })),
  on(getPaintingsParametersSuccessAction, (state, payload) => ({ ...state, done: true, parameters: payload })),
  on(getPaintingsParametersErrorAction, (state, payload) => ({ ...state, done: true, error: payload })),
);