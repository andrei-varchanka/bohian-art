import { createReducer, on } from "@ngrx/store";
import { createPaintingAction, createPaintingErrorAction, createPaintingSuccessAction, deletePaintingAction, deletePaintingErrorAction, deletePaintingSuccessAction, getPaintingAction, getPaintingErrorAction, getPaintingsAction, getPaintingsErrorAction, getPaintingsParametersAction, getPaintingsParametersErrorAction, getPaintingsParametersSuccessAction, getPaintingsSuccessAction, getPaintingSuccessAction, PaintingActions, updatePaintingAction, updatePaintingErrorAction, updatePaintingSuccessAction } from "../actions/painting.actions";
import { UserActions } from "../actions/user.actions";
import { initialPaintingState } from "../state/painting.state";

export const paintingReducer = createReducer(
  initialPaintingState,

  on(createPaintingAction, (state) => ({...state, action: PaintingActions.CreatePainting, done: false, error: null})),
  on(createPaintingSuccessAction, (state, payload) => ({...state, done: true, paintings: state.paintings?.concat(payload)})),
  on(createPaintingErrorAction, (state, payload) => ({...state, done: true, error: payload})),

  on(getPaintingsAction, (state) => ({ ...state, action: PaintingActions.GetPaintings, done: false, error: null })),
  on(getPaintingsSuccessAction, (state, payload) => ({ ...state, done: true, paintings: payload.paintings, count: payload.count })),
  on(getPaintingsErrorAction, (state, payload) => ({ ...state, done: true, error: payload })),

  on(getPaintingsParametersAction, (state) => ({ ...state, action: PaintingActions.GetPaintingsParameters, done: false, error: null })),
  on(getPaintingsParametersSuccessAction, (state, payload) => ({ ...state, done: true, parameters: payload })),
  on(getPaintingsParametersErrorAction, (state, payload) => ({ ...state, done: true, error: payload })),
  
  on(getPaintingAction, (state) => ({...state, action: PaintingActions.GetPainting, done: false, error: null})),
  on(getPaintingSuccessAction, (state, payload) => ({ ...state, done: true, selectedPainting: payload })),
  on(getPaintingErrorAction, (state, payload) => ({...state, done: true, error: payload})),

  on(updatePaintingAction, (state, payload) => ({...state, action: PaintingActions.UpdatePainting, selectedPainting: payload, done: false, error: null})),
  on(updatePaintingSuccessAction, (state, payload) => {
    const index = state.paintings?.findIndex(painting => painting.id === state.selectedPainting.id);
    return {...state, done: true, paintings: index && state.paintings ? [...state.paintings.slice(0, index), state.selectedPainting, ...state.paintings.slice(index + 1)] : null};
  }),
  on(updatePaintingErrorAction, (state, payload) => ({...state, done: true, selectedPainting: null, error: payload})),

  on(deletePaintingAction, (state) => ({...state, action: PaintingActions.DeletePainting, done: false, error: null})),
  on(deletePaintingSuccessAction, (state, payload) => ({...state, done: true, paintings: state.paintings?.filter(p => p.id != payload.paintingId), selectedPainting: null})),
  on(deletePaintingErrorAction, (state, payload) => ({...state, done: true, error: payload})),
);