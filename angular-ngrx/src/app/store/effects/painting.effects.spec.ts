import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jasmine-marbles";
import { Observable } from "rxjs";
import { Painting } from "src/app/api/models";
import { PaintingsService } from "src/app/api/services";
import { createPaintingAction, createPaintingErrorAction, createPaintingSuccessAction, deletePaintingAction, deletePaintingErrorAction, deletePaintingSuccessAction, getPaintingAction, getPaintingErrorAction, getPaintingsAction, getPaintingsErrorAction, getPaintingsParametersAction, getPaintingsParametersErrorAction, getPaintingsParametersSuccessAction, getPaintingsSuccessAction, getPaintingSuccessAction, updatePaintingAction, updatePaintingErrorAction, updatePaintingSuccessAction } from "../actions/painting.actions";
import { PaintingEffects } from "./painting.effects";

const PAINTINGS: Painting[] = [
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

const STATIC_PARAMS = {
  maxHeight: 0,
  maxPrice: 0,
  maxWidth: 0,
  minHeight: 0,
  minPrice: 0,
  minWidth: 0
}

const SELECTED_PARAMS = {
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

describe('Painting effects', () => {
  let actions$: Observable<any>;
  let effects: PaintingEffects;
  let paintingService: jasmine.SpyObj<PaintingsService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PaintingEffects,
        // An Effect subscribes to the Actions Observable to perform side effects. provideMockActions provides a mock provider of the Actions Observable to subscribe to
        provideMockActions(() => actions$),
        {
          provide: PaintingsService,
          useValue: {
            uploadPainting: jasmine.createSpy(),
            getPainting: jasmine.createSpy(),
            getParameters: jasmine.createSpy(),
            getAllPaintings: jasmine.createSpy(),
            updatePainting: jasmine.createSpy(),
            deletePainting: jasmine.createSpy()
          }
        }
      ]
    });
    effects = TestBed.get(PaintingEffects);
    paintingService = TestBed.get(PaintingsService);
  });

  describe('Create painting effect', () => {
    it('should return a success action', () => {
      actions$ = hot('-a', { a: createPaintingAction({ painting: PAINTINGS[0] }) });

      const response = cold('-b|', { b: { painting: PAINTINGS[0], errorMessage: '', success: true } });
      paintingService.uploadPainting.and.returnValue(response);

      const expected = cold('--c', { c: createPaintingSuccessAction({ painting: PAINTINGS[0] }) });
      expect(effects.createPainting$).toBeObservable(expected);
    });

    it('should fail and return an action with the error', () => {
      actions$ = hot('-a', { a:createPaintingAction({ painting: PAINTINGS[0] }) });
      const error = new Error('some error');

      const response = cold('-#|', {}, error);
      paintingService.uploadPainting.and.returnValue(response);

      const expected = cold('--b', { b: createPaintingErrorAction({ error: error }) });

      expect(effects.createPainting$).toBeObservable(expected);
    });
  });

  describe('Get painting effect', () => {
    it('should return a success action', () => {
      actions$ = hot('-a', { a: getPaintingAction({ paintingId: PAINTINGS[0].id }) });

      const response = cold('-b|', { b: { painting: PAINTINGS[0], errorMessage: '', success: true } });
      paintingService.getPainting.and.returnValue(response);

      const expected = cold('--c', { c: getPaintingSuccessAction({ painting: PAINTINGS[0] }) });
      expect(effects.getPainting$).toBeObservable(expected);
    });

    it('should fail and return an action with the error', () => {
      actions$ = hot('-a', { a: getPaintingAction({ paintingId: PAINTINGS[0].id }) });
      const error = new Error('some error');

      const response = cold('-#|', {}, error);
      paintingService.getPainting.and.returnValue(response);

      const expected = cold('--b', { b: getPaintingErrorAction({ error: error }) });

      expect(effects.getPainting$).toBeObservable(expected);
    });
  });

  describe('Get paintings parameters effect', () => {
    it('should return a success action', () => {
      actions$ = hot('-a', { a: getPaintingsParametersAction() });

      const response = cold('-b|', { b: STATIC_PARAMS });
      paintingService.getParameters.and.returnValue(response);

      const expected = cold('--c', { c: getPaintingsParametersSuccessAction({ paintingParameters: STATIC_PARAMS}) });
      expect(effects.getPaintingsParameters$).toBeObservable(expected);
    });

    it('should fail and return an action with the error', () => {
      actions$ = hot('-a', { a: getPaintingsParametersAction() });
      const error = new Error('some error');

      const response = cold('-#|', {}, error);
      paintingService.getParameters.and.returnValue(response);

      const expected = cold('--b', { b: getPaintingsParametersErrorAction({ error: error }) });

      expect(effects.getPaintingsParameters$).toBeObservable(expected);
    });
  });

  describe('Get paintings effect', () => {
    it('should return a success action', () => {
      actions$ = hot('-a', { a: getPaintingsAction({params: SELECTED_PARAMS}) });

      const response = cold('-b|', { b: { paintings: PAINTINGS, errorMessage: '', success: true, count: 2, currentPage: 1, totalPages: 1 } });
      paintingService.getAllPaintings.and.returnValue(response);

      const expected = cold('--c', { c: getPaintingsSuccessAction({ paintingsResponse: { paintings: PAINTINGS, errorMessage: '', success: true, count: 2, currentPage: 1, totalPages: 1 } }) });
      expect(effects.getPaintings$).toBeObservable(expected);
    });

    it('should fail and return an action with the error', () => {
      actions$ = hot('-a', { a: getPaintingsAction({ params: SELECTED_PARAMS }) });
      const error = new Error('some error');

      const response = cold('-#|', {}, error);
      paintingService.getAllPaintings.and.returnValue(response);

      const expected = cold('--b', { b: getPaintingsErrorAction({ error: error }) });

      expect(effects.getPaintings$).toBeObservable(expected);
    });
  });

  describe('Update painting effect', () => {
    it('should return a success action', () => {
      actions$ = hot('-a', { a: updatePaintingAction({ painting: PAINTINGS[0] }) });

      const response = cold('-b|', { b: { painting: PAINTINGS[0], errorMessage: '', success: true } });
      paintingService.updatePainting.and.returnValue(response);

      const expected = cold('--c', { c: updatePaintingSuccessAction({ painting: PAINTINGS[0] }) });
      expect(effects.updatePainting$).toBeObservable(expected);
    });

    it('should fail and return an action with the error', () => {
      actions$ = hot('-a', { a: updatePaintingAction({ painting: PAINTINGS[0] }) });
      const error = new Error('some error');

      const response = cold('-#|', {}, error);
      paintingService.updatePainting.and.returnValue(response);

      const expected = cold('--b', { b: updatePaintingErrorAction({ error: error }) });

      expect(effects.updatePainting$).toBeObservable(expected);
    });
  });

  // deletePainting$ = createEffect(() => this.actions$
  //   .pipe(
  //     ofType(PaintingActions.DELETE_PAINTING),
  //     mergeMap((action) => this.paintingService.deletePainting((action as any).paintingId)
  //       .pipe(
  //         map(response => deletePaintingSuccessAction({ paintingId: (action as any).paintingId })),
  //         catchError((err) => of(deletePaintingErrorAction({error: err})))
  //       )
  //     )
  //   )
  // );
  describe('Delete painting effect', () => {
    it('should return a success action', () => {
      actions$ = hot('-a', { a: deletePaintingAction({ paintingId: PAINTINGS[0].id }) });

      const response = cold('-b|', { b: { errorMessage: '', success: true } });
      paintingService.deletePainting.and.returnValue(response);

      const expected = cold('--c', { c: deletePaintingSuccessAction({ paintingId: PAINTINGS[0].id }) });
      expect(effects.deletePainting$).toBeObservable(expected);
    });

    it('should fail and return an action with the error', () => {
      actions$ = hot('-a', { a: deletePaintingAction({ paintingId: PAINTINGS[0].id }) });
      const error = new Error('some error');

      const response = cold('-#|', {}, error);
      paintingService.deletePainting.and.returnValue(response);

      const expected = cold('--b', { b: deletePaintingErrorAction({ error: error }) });

      expect(effects.deletePainting$).toBeObservable(expected);
    });
  });

});