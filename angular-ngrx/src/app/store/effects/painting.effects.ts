import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { PaintingsService } from "src/app/api/services";
import { createPaintingErrorAction, createPaintingSuccessAction, deletePaintingErrorAction, deletePaintingSuccessAction, getPaintingErrorAction, getPaintingsErrorAction, getPaintingsParametersErrorAction, getPaintingsParametersSuccessAction, getPaintingsSuccessAction, getPaintingSuccessAction, PaintingActions, updatePaintingErrorAction, updatePaintingSuccessAction } from "../actions/painting.actions";

@Injectable()
export class PaintingEffects {

  createPainting$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaintingActions.CREATE_PAINTING),
      mergeMap(action => this.paintingService.uploadPainting(action)
        .pipe(
          map(response => createPaintingSuccessAction({ painting: response.painting })),
          catchError((err) => of(createPaintingErrorAction({error: err})))
        )
      )
    )
  );

  getPainting$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaintingActions.GET_PAINTING),
      mergeMap(action => this.paintingService.getPainting((action as any).paintingId)
        .pipe(
          map(response => getPaintingSuccessAction({ painting: response.painting })),
          catchError((err) => of(getPaintingErrorAction({error: err})))
        )
      )
    )
  );

  getPaintingsParameters$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaintingActions.GET_PAINTINGS_PARAMETERS),
      mergeMap(() => this.paintingService.getParameters()
        .pipe(
          map(response => getPaintingsParametersSuccessAction({ paintingParameters: response })),
          catchError((err) => of(getPaintingsParametersErrorAction({error: err})))
        )
      )
    )
  );

  getPaintings$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaintingActions.GET_PAINTINGS),
      mergeMap((action) => this.paintingService.getAllPaintings(action)
        .pipe(
          map(response => getPaintingsSuccessAction({ paintingsResponse: response })),
          catchError((err) => of(getPaintingsErrorAction({error: err})))
        )
      )
    )
  );

  updatePainting$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaintingActions.UPDATE_PAINTING),
      mergeMap((action) => this.paintingService.updatePainting(action)
        .pipe(
          map(response => updatePaintingSuccessAction({ painting: response.painting })),
          catchError((err) => of(updatePaintingErrorAction({error: err})))
        )
      )
    )
  );

  deletePainting$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaintingActions.DELETE_PAINTING),
      mergeMap((action) => this.paintingService.deletePainting((action as any).paintingId)
        .pipe(
          map(response => deletePaintingSuccessAction({ paintingId: (action as any).paintingId })),
          catchError((err) => of(deletePaintingErrorAction({error: err})))
        )
      )
    )
  );

  constructor(
    private paintingService: PaintingsService,
    private actions$: Actions,
  ) { }
}
