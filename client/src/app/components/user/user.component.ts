import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../api/services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../api/models/user";
import {FormsValidators} from "../../utils/forms-validators";
import {MatSnackBar} from "@angular/material";
import {mergeMap} from "rxjs/operators";
import {ContextService} from "../../services/context-service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  userId: string;

  user: User;

  hidePassword1 = true;

  hidePassword2 = true;

  constructor(private formBuilder: FormBuilder, private userService: UsersService, private route: ActivatedRoute,
              private router: Router, private snackBar: MatSnackBar, private context: ContextService) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe(response => {
        this.user = response.user;
        this.fillForm();
      });
    } else {
      this.router.navigate(['/']);
    }
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

  fillForm() {
    this.form = this.formBuilder.group({
      email: [this.user.email, [Validators.required, FormsValidators.email]],
      password: ['', [Validators.required, FormsValidators.password]],
      confirm: ['', [Validators.required, FormsValidators.confirmMatch('password')]],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      phone: [this.user.phone, []]
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

  submit() {
    if (!this.isFormValid()) {
      return;
    }
    const user = {
      email: this.form.controls.email.value,
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      password: this.form.controls.password.value,
      phone: this.form.controls.phone.value
    };

    this.userService.updateUser({userId: this.userId, body: user}).pipe(mergeMap(response => {
     return this.userService.auth({email: user.email, password: user.password});
    })).subscribe(response => {
      this.context.setAuthToken(response.token);
      this.context.setCurrentUser(response.user);
      this.snackBar.open('Saved!', null, {duration: 2000});
    });
  }

}
