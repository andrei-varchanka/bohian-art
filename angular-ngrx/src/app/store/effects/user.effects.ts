import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { UsersService } from "src/app/api/services";
import { authErrorAction, authSuccessAction, changePasswordErrorAction, changePasswordSuccessAction, createUserErrorAction, createUserSuccessAction, deleteUserErrorAction, deleteUserSuccessAction, getUserErrorAction, getUsersErrorAction, getUsersSuccessAction, getUserSuccessAction, updateUserErrorAction, updateUserSuccessAction, UserActions } from "../actions/user.actions";

@Injectable()
export class UserEffects {

  auth$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.Auth),
      mergeMap(action => this.userService.auth(action)
        .pipe(
          map(response => authSuccessAction({ token: response.token, user: response.user })),
          catchError((err) => of(authErrorAction(err)))
        )
      )
    )
  );

  createUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.CreateUser),
      mergeMap(action => this.userService.createUser(action)
        .pipe(
          map(response => createUserSuccessAction({ token: response.token, user: response.user })),
          catchError((err) => of(createUserErrorAction(err)))
        )
      )
    )
  );

  getUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.GetUser),
      mergeMap(action => this.userService.getUser((action as any).userId)
        .pipe(
          map(response => getUserSuccessAction(response.user)),
          catchError((err) => of(getUserErrorAction(err)))
        )
      )
    )
  );

  getUsers$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.GetUsers),
      mergeMap(() => this.userService.getAllUsers()
        .pipe(
          map(response => getUsersSuccessAction({ users: response.users })),
          catchError((err) => of(getUsersErrorAction(err)))
        )
      )
    )
  );

  updateUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.UpdateUser),
      mergeMap((action) => this.userService.updateUser({ userId: (action as any).id, body: action })
        .pipe(
          map(response => updateUserSuccessAction(response.user)),
          catchError((err) => of(updateUserErrorAction(err)))
        )
      )
    )
  );

  deleteUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.DeleteUser),
      mergeMap((action) => this.userService.deleteUser((action as any).userId)
        .pipe(
          map(response => deleteUserSuccessAction({ userId: (action as any).userId })),
          catchError((err) => of(deleteUserErrorAction(err)))
        )
      )
    )
  );

  changePassword$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.ChangePassword),
      mergeMap((action) => this.userService.changePassword({
        userId: (action as any).userId,
        body: { password: (action as any).password }
      })
        .pipe(
          map(response => changePasswordSuccessAction(response.user)),
          catchError((err) => of(changePasswordErrorAction(err)))
        )
      )
    )
  );

  constructor(
    private userService: UsersService,
    private actions$: Actions,
  ) { }
}
