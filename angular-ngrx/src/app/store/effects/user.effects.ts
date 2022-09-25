import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { EMPTY, of } from "rxjs";
import { catchError, map, mergeMap, switchMap, withLatestFrom } from "rxjs/operators";
import { UsersService } from "src/app/api/services";
import { deleteUserErrorAction, deleteUserSuccessAction, getUserErrorAction, getUsersErrorAction, getUsersSuccessAction, getUserSuccessAction, UserActions } from "../actions/user.actions";

@Injectable()
export class UserEffects {

  getUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.GetUser),
      mergeMap(action => this.userService.getUser((action as any).userId)),
      map(response => getUserSuccessAction(response.user)),
      catchError((err) => [getUserErrorAction(err)])
    )
  );

  getUsers$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.GetUsers),
      mergeMap(() => this.userService.getAllUsers()),
      map(response => getUsersSuccessAction({ users: response.users })),
      catchError((err) => [getUsersErrorAction(err)])
    )
  );

  deleteUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.DeleteUser),
      mergeMap((action) => this.userService.deleteUser((action as any).userId)
        .pipe(
          map(response => deleteUserSuccessAction({ userId: (action as any).userId })),
          catchError((err) => [deleteUserErrorAction(err)])
        )
      )
    )
  );

  constructor(
    private userService: UsersService,
    private actions$: Actions,
  ) { }
}
