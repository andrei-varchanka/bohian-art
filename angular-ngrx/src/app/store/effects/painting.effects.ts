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
      ofType(PaintingActions.CreatePainting),
      mergeMap(action => this.paintingService.uploadPainting(action)
        .pipe(
          map(response => createPaintingSuccessAction(response.painting )),
          catchError((err) => of(createPaintingErrorAction(err)))
        )
      )
    )
  );

  getPainting$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaintingActions.GetPainting),
      mergeMap(action => this.paintingService.getPainting((action as any).paintingId)
        .pipe(
          map(response => getPaintingSuccessAction(response.painting)),
          catchError((err) => of(getPaintingErrorAction(err)))
        )
      )
    )
  );

  getPaintingsParameters$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaintingActions.GetPaintingsParameters),
      mergeMap(() => this.paintingService.getParameters()
        .pipe(
          map(response => getPaintingsParametersSuccessAction(response)),
          catchError((err) => of(getPaintingsParametersErrorAction(err)))
        )
      )
    )
  );

  getPaintings$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaintingActions.GetPaintings),
      mergeMap((action) => this.paintingService.getAllPaintings(action)
        .pipe(
          map(response => getPaintingsSuccessAction(response)),
          catchError((err) => of(getPaintingsErrorAction(err)))
        )
      )
    )
  );

  updatePainting$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaintingActions.UpdatePainting),
      mergeMap((action) => this.paintingService.updatePainting(action)
        .pipe(
          map(response => updatePaintingSuccessAction(response.painting)),
          catchError((err) => of(updatePaintingErrorAction(err)))
        )
      )
    )
  );

  deletePainting$ = createEffect(() => this.actions$
    .pipe(
      ofType(PaintingActions.DeletePainting),
      mergeMap((action) => this.paintingService.deletePainting((action as any).paintingId)
        .pipe(
          map(response => deletePaintingSuccessAction({ paintingId: (action as any).paintingId })),
          catchError((err) => of(deletePaintingErrorAction(err)))
        )
      )
    )
  );

  constructor(
    private paintingService: PaintingsService,
    private actions$: Actions,
  ) { }
}
