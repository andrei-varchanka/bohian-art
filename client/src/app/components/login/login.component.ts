import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormsValidators} from "../../helpers/forms-validators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword = true;

  loginForm: FormGroup;

  constructor( public dialogRef: MatDialogRef<LoginComponent>, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, FormsValidators.email]],
      password: ['', [Validators.required]]
    });
  }

  getErrorMessage(controlName: string): string {
    let errorText = '';
    const control = this.loginForm.controls[controlName];
    if (control && control.errors) {
      if (control.hasError('required')) {
        errorText = `You need to enter your ${controlName}`;
      }
      if (control.hasError('invalidEmail')) {
        errorText = 'Please enter a valid email';
      }
    }
    return errorText;
  }

  login(): void {
    console.log(this.loginForm.controls.email.value + ' ' + this.loginForm.controls.password.value);
    this.dialogRef.close();
  }


}
