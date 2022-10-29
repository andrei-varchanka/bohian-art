import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { FormsValidators } from "../../utils/forms-validators";
import { UsersService } from "../../api/services/users.service";
import { ContextService } from "../../services/context-service";
import { Router } from "@angular/router";
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { authAction, UserActions } from 'src/app/store/actions/user.actions';
import { setAuthTokenAction, setCurrentUserAction } from 'src/app/store/actions/system.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword = true;

  loginForm: UntypedFormGroup;

  error: string;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: UntypedFormBuilder,
    private usersService: UsersService,
    private contextService: ContextService,
    private router: Router, private store: Store<AppState>, private actions$: Actions) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.subscribeOnLogin();
  }

  getErrorMessage(controlName: string): string {
    let errorText = '';
    const control = this.loginForm.controls[controlName];
    if (control && control.errors) {
      if (control.hasError('required')) {
        errorText = `You need to enter your ${controlName}`;
      }
    }
    return errorText;
  }

  login(): void {
    this.error = null;
    this.store.dispatch(authAction({
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }));
  }

  subscribeOnLogin() {
    this.actions$.pipe(ofType(UserActions.AuthSuccess)).subscribe(response => {
      this.store.dispatch(setCurrentUserAction((response as any).user));
      this.store.dispatch(setAuthTokenAction({token: (response as any).token}));
      // this.contextService.setCurrentUser((response as any).user);
      // this.contextService.setAuthToken((response as any).token);
      this.dialogRef.close();
      // window.location.reload();
    });
    this.actions$.pipe(ofType(UserActions.AuthError)).subscribe(error => {
      this.error = (error as any)?.error.errorMessage;
    });
  }

  redirectToRegistration() {
    this.dialogRef.close();
    this.router.navigate(['/registration']);
  }

}
