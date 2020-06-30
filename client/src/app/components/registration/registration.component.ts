import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../api/services/users.service";
import {ContextService} from "../../services/context-service";
import {FormsValidators} from "../../utils/forms-validators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  hidePassword1 = true;

  hidePassword2 = true;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private contextService: ContextService,
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
    this.usersService.createUser({
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      phone: this.form.controls.phone.value
    }).subscribe(response => {
      if (response.success) {
        this.contextService.setCurrentUser(response.user);
        this.contextService.setAuthToken(response.token);
        this.router.navigate(['/']);
      }
    });
  }
}
