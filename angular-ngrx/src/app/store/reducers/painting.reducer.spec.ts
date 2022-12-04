import { Painting } from "src/app/api/models";
import { createPaintingAction, createPaintingErrorAction, createPaintingSuccessAction, deletePaintingAction, deletePaintingErrorAction, deletePaintingSuccessAction, getPaintingAction, getPaintingErrorAction, getPaintingsAction, getPaintingsErrorAction, getPaintingsParametersAction, getPaintingsParametersErrorAction, getPaintingsParametersSuccessAction, getPaintingsSuccessAction, getPaintingSuccessAction, PaintingActions, updatePaintingAction, updatePaintingErrorAction, updatePaintingSuccessAction } from "../actions/painting.actions";
import { PaintingState } from "../state/painting.state";
import { paintingReducer } from "./painting.reducer";

const state: PaintingState = {
  paintings: null,
  count: null,
  parameters: null,
  selectedPainting: null,
  action: null,
  done: true,
  error: null,
};

const MOCK_DATA: Painting[] = [
  {
    genres: [
      "Abstract",
      "Genre art"
    ],
    image: {
      data: "data:image/jpeg;base64, /...",
      name: "GvZ4rqsyNjI.jpg",
      contentType: "image/jpeg"
    },
    name: "Grey onyx",
    author: "Andrei Vachanka",
    userId: "5efbb163d46bb14bd8783504",
    height: 30,
    width: 30,
    price: 10,
    description: "Fluid art",
    id: "5eee7742031b912444850808"
  },
  {
    genres: [
      "Landscape"
    ],
    image: {
      data: "data:image/jpeg;base64, /...",
      name: "35b30500-5004-4411-a008-e63a8927a86f.jpg",
      contentType: "image/jpeg"
    },
    name: "Camping night",
    author: "Andrei Vachanka",
    userId: "5efbb163d46bb14bd8783504",
    height: 30,
    width: 30,
    price: 15,
    description: "",
    id: "5f0afef9467ee85c945ea3f6"
  }
];

const staticParams = {
  maxHeight: 0,
  maxPrice: 0,
  maxWidth: 0,
  minHeight: 0,
  minPrice: 0,
  minWidth: 0
}
const selectedParams = {
  widthTo: 0,
  widthFrom: 0,
  userId: null,
  priceTo: 0,
  priceFrom: 0,
  page: 0,
  limit: 0,
  heightTo: 0,
  heightFrom: 0,
  genres: null
};

describe('Create painting reducer', () => {
  it('should reduce the action CREATE_PAINTING', () => {
      const action = createPaintingAction({painting: MOCK_DATA[0]});
      const newState = paintingReducer(state, action);
      expect({...newState}).toEqual({...state, action: PaintingActions.CREATE_PAINTING, done: false, error: null});
  });
  it('should reduce the action CREATE_PAINTING_SUCCESS', () => {
      const action = createPaintingSuccessAction({painting: MOCK_DATA[0]});
      const newState = paintingReducer(state, action);
      expect({...newState}).toEqual({ ...state, done: true, paintings: state.paintings?.concat(MOCK_DATA[0])});
  });
  it('should reduce the action CREATE_PAINTING_ERROR', () => {
      const payload = new Error('Create painting error');
      const action = createPaintingErrorAction({error: payload});
      const newState = paintingReducer(state, action);
      expect({...newState }).toEqual({...state, done: true, error: payload});
  });
});

describe('Get paintings reducer', () => {

  it('should reduce the action GET_PAINTINGS', () => {
      const action = getPaintingsAction({params: selectedParams});
      const newState = paintingReducer(state, action);
      expect({ ...newState }).toEqual({...state, action: PaintingActions.GET_PAINTINGS, done: false, error: null});
  });

  it('should reduce the action GET_PAINTINGS_SUCCESS', () => {
      const action = getPaintingsSuccessAction({paintingsResponse: {
        count: MOCK_DATA.length,
        currentPage: 1,
        errorMessage: '',
        paintings: MOCK_DATA,
        success: true,
        totalPages: 1
      }});
      const newState = paintingReducer(state, action);
      expect({ ...newState }).toEqual({...state, done: true, paintings: MOCK_DATA, count: MOCK_DATA.length});
  });

  it('should reduce the action GET_PAINTINGS_ERROR', () => {
      const payload = new Error('Get paintings error');
      const action = getPaintingsErrorAction({error: payload});
      const newState = paintingReducer(state, action);
      expect({ ...newState }).toEqual({...state, done: true, error: payload});
  });
});

describe('Get paintings parameters reducer', () => {

  it('should reduce the action GET_PAINTINGS_PARAMETERS', () => {
      const action = getPaintingsParametersAction();
      const newState = paintingReducer(state, action);
      expect({ ...newState }).toEqual({...state, action: PaintingActions.GET_PAINTINGS_PARAMETERS, done: false, error: null});
  });

  it('should reduce the action GET_PAINTINGS_PARAMETERS_SUCCESS', () => {
      const action = getPaintingsParametersSuccessAction({paintingParameters: staticParams});
      const newState = paintingReducer(state, action);
      expect({ ...newState }).toEqual({...state, done: true, parameters: staticParams});
  });

  it('should reduce the action GET_PAINTINGS_PARAMETERS_ERROR', () => {
      const payload = new Error('Get paintings parameters error');
      const action = getPaintingsParametersErrorAction({error: payload});
      const newState = paintingReducer(state, action);
      expect({ ...newState }).toEqual({...state, done: true, error: payload});
  });
});

describe('GET painting by id reducer', () => {
  it('should reduce the action GET_PAINTING', () => {
      const payload = MOCK_DATA[0].id;
      const action = getPaintingAction({paintingId: payload});
      const newState = paintingReducer(state, action);
      expect({...newState}).toEqual({...state, action: PaintingActions.GET_PAINTING, done: false, error: null});
  });
  it('should reduce the action GET_PAINTING_SUCCESS', () => {
      const payload = MOCK_DATA[0];
      const action = getPaintingSuccessAction({painting: payload});
      const newState = paintingReducer(state, action);
      expect({...newState}).toEqual({ ...state, done: true, selectedPainting: payload});
  });
  it('should reduce the action GET_PAINTING_ERROR', () => {
      const payload = new Error('Get painting error');
      const action = getPaintingErrorAction({error: payload});
      const newState = paintingReducer(state, action);
      expect({...newState }).toEqual({...state, done: true, error: payload});
  });
});

describe('Update painting reducer', () => {
  it('should reduce the action UPDATE_PAINTING', () => {
      const action = updatePaintingAction({painting: MOCK_DATA[0]});
      const newState = paintingReducer(state, action);
      expect({...newState}).toEqual({...state, action: PaintingActions.UPDATE_PAINTING, done: false, error: null, selectedPainting: MOCK_DATA[0]});
  });
  it('should reduce the action UPDATE_PAINTING_SUCCESS', () => {
      const action = updatePaintingSuccessAction({painting: MOCK_DATA[0]});
      const newState = paintingReducer(state, action);
      const index = state.paintings?.findIndex(painting => painting.id === state.selectedPainting.id);
      expect({...newState}).toEqual({ ...state, done: true, paintings: index && state.paintings ? [...state.paintings.slice(0, index), state.selectedPainting, ...state.paintings.slice(index + 1)] : null});
  });
  it('should reduce the action UPDATE_PAINTING_ERROR', () => {
      const payload = new Error('Update painting error');
      const action = updatePaintingErrorAction({error: payload});
      const newState = paintingReducer(state, action);
      expect({...newState }).toEqual({...state, done: true, error: payload});
  });
});

describe('Delete painting reducer', () => {
  it('should reduce the action DELETE_PAINTING', () => {
      const action = deletePaintingAction({paintingId: MOCK_DATA[0].id});
      const newState = paintingReducer(state, action);
      expect({...newState}).toEqual({...state, action: PaintingActions.DELETE_PAINTING, done: false, error: null});
  });
  it('should reduce the action DELETE_PAINTING_SUCCESS', () => {
      const action = deletePaintingSuccessAction({paintingId: MOCK_DATA[0].id});
      const newState = paintingReducer(state, action);
      expect({...newState}).toEqual({ ...state, done: true, paintings: state.paintings?.filter(u => u.id != MOCK_DATA[0].id), selectedPainting: null});
  });
  it('should reduce the action DELETE_PAINTING_ERROR', () => {
      const payload = new Error('Delete painting error');
      const action = deletePaintingErrorAction({error: payload});
      const newState = paintingReducer(state, action);
      expect({...newState }).toEqual({...state, done: true, error: payload});
  });
});