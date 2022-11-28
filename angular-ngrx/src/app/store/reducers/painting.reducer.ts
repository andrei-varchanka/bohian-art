import { createReducer, on } from "@ngrx/store";
import { createPaintingAction, createPaintingErrorAction, createPaintingSuccessAction, deletePaintingAction, deletePaintingErrorAction, deletePaintingSuccessAction, getPaintingAction, getPaintingErrorAction, getPaintingsAction, getPaintingsErrorAction, getPaintingsParametersAction, getPaintingsParametersErrorAction, getPaintingsParametersSuccessAction, getPaintingsSuccessAction, getPaintingSuccessAction, PaintingActions, updatePaintingAction, updatePaintingErrorAction, updatePaintingSuccessAction } from "../actions/painting.actions";
import { UserActions } from "../actions/user.actions";
import { initialPaintingState } from "../state/painting.state";

export const paintingReducer = createReducer(
  initialPaintingState,

  on(createPaintingAction, (state) => ({ ...state, action: PaintingActions.CREATE_PAINTING, done: false, error: null })),
  on(createPaintingSuccessAction, (state, payload) => ({ ...state, done: true, paintings: state.paintings?.concat(payload.painting) })),
  on(createPaintingErrorAction, (state, payload) => ({ ...state, done: true, error: payload.error })),

  on(getPaintingsAction, (state) => ({ ...state, action: PaintingActions.GET_PAINTINGS, done: false, error: null })),
  on(getPaintingsSuccessAction, (state, payload) => ({ ...state, done: true, paintings: payload.paintingsResponse.paintings, count: payload.paintingsResponse.count })),
  on(getPaintingsErrorAction, (state, payload) => ({ ...state, done: true, error: payload.error })),

  on(getPaintingsParametersAction, (state) => ({ ...state, action: PaintingActions.GET_PAINTINGS_PARAMETERS, done: false, error: null })),
  on(getPaintingsParametersSuccessAction, (state, payload) => ({ ...state, done: true, parameters: payload.paintingParameters })),
  on(getPaintingsParametersErrorAction, (state, payload) => ({ ...state, done: true, error: payload.error })),

  on(getPaintingAction, (state) => ({ ...state, action: PaintingActions.GET_PAINTING, done: false, error: null })),
  on(getPaintingSuccessAction, (state, payload) => ({ ...state, done: true, selectedPainting: payload.painting })),
  on(getPaintingErrorAction, (state, payload) => ({ ...state, done: true, error: payload.error })),

  on(updatePaintingAction, (state, payload) => ({ ...state, action: PaintingActions.UPDATE_PAINTING, selectedPainting: payload.painting, done: false, error: null })),
  on(updatePaintingSuccessAction, (state, payload) => {
    const index = state.paintings?.findIndex(painting => painting.id === state.selectedPainting.id);
    return { ...state, done: true, paintings: index && state.paintings ? [...state.paintings.slice(0, index), state.selectedPainting, ...state.paintings.slice(index + 1)] : null };
  }),
  on(updatePaintingErrorAction, (state, payload) => ({ ...state, done: true, selectedPainting: null, error: payload.error })),

  on(deletePaintingAction, (state) => ({ ...state, action: PaintingActions.DELETE_PAINTING, done: false, error: null })),
  on(deletePaintingSuccessAction, (state, payload) => ({ ...state, done: true, paintings: state.paintings?.filter(p => p.id != payload.paintingId), selectedPainting: null })),
  on(deletePaintingErrorAction, (state, payload) => ({ ...state, done: true, error: payload.error })),
);