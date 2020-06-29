import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormsValidators} from "../../utils/forms-validators";
import {UsersService} from "../../api/services/users.service";
import {ContextService} from "../../services/context-service";
import {Router} from "@angular/router";

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
              private contextService: ContextService,
              private router: Router) {
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
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }).subscribe(response => {
      if (response.success) {
        this.contextService.setCurrentUser(response.user);
        this.contextService.setAuthToken(response.token);
        this.dialogRef.close();
        window.location.reload();
      }
    });
  }

  redirectToRegistration() {
    this.dialogRef.close();
    this.router.navigate(['/registration']);
  }

}
