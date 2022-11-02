import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { UsersService } from "../../api/services/users.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { User } from "../../api/models/user";
import { FormsValidators } from "../../utils/forms-validators";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { mergeMap, takeUntil } from "rxjs/operators";
import { UserDeletionConfirmationComponent } from "../users/users.component";
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { selectSelectedUser } from 'src/app/store/selectors/user.selectors';
import { Observable, Subject } from 'rxjs';
import { deleteUserAction, getUserAction, updateUserAction, UserActions } from 'src/app/store/actions/user.actions';
import { Actions, ofType } from '@ngrx/effects';
import { setAuthTokenAction, setCurrentUserAction } from 'src/app/store/actions/system.actions';
import { selectCurrentUser } from 'src/app/store/selectors/system.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit, OnDestroy {

  form: UntypedFormGroup = new UntypedFormGroup({});

  changePassForm: UntypedFormGroup = new UntypedFormGroup({});

  passwordChanging: boolean;

  userId: string;

  user$: Observable<User>;

  currentUser: User;

  roles = ['Admin', 'Artist'];

  hidePassword1 = true;

  hidePassword2 = true;

  unsubscribe$ = new Subject();

  constructor(private formBuilder: UntypedFormBuilder, private userService: UsersService, private route: ActivatedRoute, private store: Store<AppState>,
    private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog, private actions$: Actions) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, FormsValidators.email]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      role: [null, [Validators.required]],
      phone: [null, []]
    });
    this.changePassForm = this.formBuilder.group({
      password: [null, [Validators.required, FormsValidators.password]],
      confirm: [null, [Validators.required, FormsValidators.confirmMatch('password')]]
    });
  }

  // TODO: check multi-subscribing and unsubscribing, add ngrx change password
  // https://github.com/ngneat/until-destroy
  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe(currentUser => {
      this.currentUser = currentUser;
    });
    this.init();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.init();
      }
    });
  }

  init() {
    this.userId = this.route.snapshot.params.id;
    if (this.userId) {
      this.store.dispatch(getUserAction({ userId: this.userId }))
      this.user$ = this.store.select(selectSelectedUser);
      this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user: User) => {
        this.form.patchValue(user);
      });
    } else {
      this.router.navigate(['/']);
    }
  }


  isFormValid(): boolean {
    let isFormValid = true;
    if (this.form.invalid) {
      for (let inner in this.form.controls) {
        this.form.get(inner).markAsTouched();
      }
      isFormValid = false;
    }
    return isFormValid;
  }

  isPasswordsValid() {
    let isFormValid = true;
    if (this.changePassForm.invalid) {
      for (let inner in this.changePassForm.controls) {
        this.changePassForm.get(inner).markAsTouched();
      }
      isFormValid = false;
    }
    return isFormValid;
  }

  getErrorMessage(controlName: string, inputName?: string): string {
    if (!inputName) {
      inputName = controlName;
    }
    let errorText = '';
    const control = this.passwordChanging ? this.changePassForm.controls[controlName] : this.form.controls[controlName];
    if (control && control.errors) {
      if (control.hasError('required')) {
        errorText = `You need to enter your ${inputName}`;
      }
      if (control.hasError('invalidEmail')) {
        errorText = 'Please enter a valid email';
      }
      if (control.hasError('invalidPassword')) {
        errorText = 'Minimum of 6 characters, with an uppercase, lowercase, numeric and non-alphanumeric character';
      }
      if (control.hasError('invalidConfirmation')) {
        errorText = 'Please enter a matching password';
      }
    }
    return errorText;
  }

  submit() {
    if (!this.isFormValid()) {
      return;
    }
    const user: User = {
      id: this.userId,
      email: this.form.controls.email.value,
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      password: null,
      role: this.form.controls.role.value,
      phone: this.form.controls.phone.value
    };
    this.store.dispatch(updateUserAction(user));
    this.actions$.pipe(
      ofType(UserActions.UpdateUserSuccess)
    ).subscribe((payload: User) => {
      if (this.currentUser.id === this.userId) {
        this.store.dispatch(setCurrentUserAction({ user: payload }));
      }
      this.snackBar.open('Saved!', null, { duration: 2000 });
    });
  }

  changePassword() {
    if (!this.isPasswordsValid()) {
      return;
    }
    const password = this.changePassForm.controls.password.value;
    this.userService.changePassword({
      userId: this.userId,
      body: { password }
    }).pipe(mergeMap(response => {
      const email = response.user.email;
      return this.userService.auth({ email, password });
    })).subscribe(response => {
      this.store.dispatch(setCurrentUserAction({ user: (response as any).user }));
      this.store.dispatch(setAuthTokenAction({ token: (response as any).token }));
      this.snackBar.open('Saved!', null, { duration: 2000 });
    });
  }

  redirectToUserGallery() {
    this.router.navigate(['/gallery'], { queryParams: { userId: this.userId } });
  }

  delete() {
    const dialogRef = this.dialog.open(UserDeletionConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(deleteUserAction({ userId: this.userId }));
        this.actions$.pipe(ofType(UserActions.DeleteUserSuccess)).subscribe(action => {
          if (this.currentUser.id === this.userId) {
            this.store.dispatch(setCurrentUserAction(null));
            this.store.dispatch(setAuthTokenAction({ token: null }));
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/users']);
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
