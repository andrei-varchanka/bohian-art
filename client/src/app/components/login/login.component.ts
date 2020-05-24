import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormsValidators} from "../../helpers/forms-validators";
import {UsersService} from "../../api/services/users.service";
import {ContextService} from "../../services/context-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword = true;

  loginForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              private formBuilder: FormBuilder,
              private usersService: UsersService,
              private contextService: ContextService) {
  }

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
    this.usersService.auth({
      username: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }).subscribe(response => {
      if (response.success) {
        this.contextService.setCurrentUser(response.user);
        this.dialogRef.close();
        window.location.reload();
      }
    });
  }

  register(): void {
    this.usersService.createUser({
      username: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }).subscribe(response => {
      if (response.success) {
        this.contextService.setCurrentUser(response.user);
        this.dialogRef.close();
        window.location.reload();
      }
    });
  }

}
