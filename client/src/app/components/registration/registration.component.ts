import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../api/services/users.service";
import {ContextService} from "../../services/context-service";
import {FormsValidators} from "../../utils/forms-validators";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  hidePassword1 = true;

  hidePassword2 = true;

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private contextService: ContextService) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, FormsValidators.email]],
      password: ['', [Validators.required]],
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
    const control = this.registrationForm.controls[controlName];
    if (control && control.errors) {
      if (control.hasError('required')) {
        errorText = `You need to enter your ${inputName}`;
      }
      if (control.hasError('invalidEmail')) {
        errorText = 'Please enter a valid email';
      }
      if (control.hasError('invalidConfirmation')) {
        errorText = 'Please enter a matching password';
      }
    }
    return errorText;
  }

  register(): void {
    this.usersService.createUser({
      email: this.registrationForm.controls.email.value,
      password: this.registrationForm.controls.password.value,
      firstName: this.registrationForm.controls.firstName.value,
      lastName: this.registrationForm.controls.lastName.value,
      phone: this.registrationForm.controls.phone.value
    }).subscribe(response => {
      if (response.success) {
        this.contextService.setCurrentUser(response.user);
        this.contextService.setAuthToken(response.token);
        window.location.reload();
      }
    });
  }
}
