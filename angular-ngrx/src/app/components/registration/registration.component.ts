import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { FormsValidators } from "../../utils/forms-validators";
import { Router } from "@angular/router";
import { setAuthTokenAction, setCurrentUserAction } from 'src/app/store/actions/system.actions';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { createUserAction, createUserSuccessAction } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {

  hidePassword1 = true;

  hidePassword2 = true;

  form: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, private store: Store<AppState>, private actions$: Actions,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, FormsValidators.email]],
      password: ['', [Validators.required, FormsValidators.password]],
      confirm: ['', [Validators.required, FormsValidators.confirmMatch('password')]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', []]
    });
    this.subscribeOnRegister();
  }

  getErrorMessage(controlName: string, inputName?: string): string {
    if (!inputName) {
      inputName = controlName;
    }
    let errorText = '';
    const control = this.form.controls[controlName];
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

  register(): void {
    if (!this.isFormValid()) {
      return;
    }
    this.store.dispatch(createUserAction({
      user: {
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
        firstName: this.form.controls.firstName.value,
        lastName: this.form.controls.lastName.value,
        role: 'Artist',
        phone: this.form.controls.phone.value
      }
    }));
  }

  subscribeOnRegister() {
    this.actions$.pipe(ofType(createUserSuccessAction)).subscribe(response => {
      this.store.dispatch(setCurrentUserAction({ user: (response as any).user }));
      this.store.dispatch(setAuthTokenAction({ token: (response as any).token }));
      this.router.navigate(['/']);
    })
  }
}
