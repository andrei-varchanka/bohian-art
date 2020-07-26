import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../api/services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../api/models/user";
import {FormsValidators} from "../../utils/forms-validators";
import {MatDialog, MatSnackBar} from "@angular/material";
import {mergeMap} from "rxjs/operators";
import {ContextService} from "../../services/context-service";
import {query} from "@angular/animations";
import {UserDeletionConfirmationComponent} from "../users/users.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  changePassForm: FormGroup = new FormGroup({});

  passwordChanging: boolean;

  userId: string;

  user: User;

  roles = ['Admin', 'Artist'];

  hidePassword1 = true;

  hidePassword2 = true;

  constructor(private formBuilder: FormBuilder, private userService: UsersService, private route: ActivatedRoute,
              private router: Router, private snackBar: MatSnackBar, private context: ContextService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe(response => {
        this.user = response.user;
        this.fillForms();
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  fillForms() {
    this.form = this.formBuilder.group({
      email: [this.user.email, [Validators.required, FormsValidators.email]],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      role: [this.user.role, [Validators.required]],
      phone: [this.user.phone, []]
    });
    this.changePassForm = this.formBuilder.group({
      password: ['', [Validators.required, FormsValidators.password]],
      confirm: ['', [Validators.required, FormsValidators.confirmMatch('password')]]
    });
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
    const user = {
      email: this.form.controls.email.value,
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      password: null,
      role: this.form.controls.role.value,
      phone: this.form.controls.phone.value
    };

    this.userService.updateUser({userId: this.userId, body: user}).subscribe(response => {
      this.context.setCurrentUser(response.user);
      this.snackBar.open('Saved!', null, {duration: 2000});
    });
  }

  changePassword() {
    if (!this.isPasswordsValid()) {
      return;
    }
    const password = this.changePassForm.controls.password.value;
    this.userService.changePassword({
      userId: this.userId,
      body: {password}
    }).pipe(mergeMap(response => {
      const email = response.user.email;
      return this.userService.auth({email, password});
    })).subscribe(response => {
      this.context.setAuthToken(response.token);
      this.context.setCurrentUser(response.user);
      this.snackBar.open('Saved!', null, {duration: 2000});
    });
  }

  redirectToUserGallery() {
    this.router.navigate(['/gallery'], {queryParams: {userId: this.userId}});
  }

  delete() {
    const dialogRef = this.dialog.open(UserDeletionConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(this.userId).subscribe(response => {
          if (this.context.getCurrentUser().id === this.user.id) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/users']);
          }
        });
      }
    });
  }

}
