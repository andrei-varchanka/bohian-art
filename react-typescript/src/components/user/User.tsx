import React from "react";
import {Button, Paper, TextField} from "@material-ui/core";
import {Formik} from "formik";
import * as yup from 'yup';
import "yup-phone";
import storageService from "../../services/storage";
import {User as UserModel} from "../../api/";
import {userService} from "../../services/api";
import {from} from "rxjs";

type UserProps = { match: any, history: any};
type UserState = {user: UserModel};
class User extends React.Component<UserProps, UserState> {

    validationSchema = yup.object({
        firstName: yup
            .string()
            .required('First name is required'),
        lastName: yup
            .string()
            .required('Last name is required'),
        phone: yup
            .string()
            .phone('BY', false, 'Enter a valid phone number starting +37529'),
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
    });

    currentUser: UserModel;

    userId: string;

    constructor(props: any) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                role: '',
                password: ''
            }
        };
    }

    componentDidMount(): void {
        this.currentUser = storageService.getUser();
        this.userId = this.props.match.params.id;
        if (this.userId) {
            from(userService.getUser(this.userId)).subscribe(response => {
                this.setState({user: response.data.user});
            });
        }
    }

    submit(values) {

    }

    render() {
        return (
            <div className="user">
                <Paper>
                    <Formik
                        initialValues={this.state.user}
                        validationSchema={this.validationSchema}
                        enableReinitialize={true}
                        onSubmit={(values) => this.submit(values)}>
                        {
                            formik => (
                                <form onSubmit={formik.handleSubmit}>
                                    <TextField className="input"
                                               fullWidth
                                               name="firstName"
                                               label="First name"
                                               value={formik.values.firstName}
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
                                               error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                               helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                    <TextField className="input"
                                               fullWidth
                                               name="lastName"
                                               label="Last name"
                                               value={formik.values.lastName}
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
                                               error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                               helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                                    <TextField className="input"
                                               fullWidth
                                               name="phone"
                                               label="Phone number"
                                               value={formik.values.phone}
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
                                               error={formik.touched.phone && Boolean(formik.errors.phone)}
                                               helperText={formik.touched.phone && formik.errors.phone}
                                    />
                                    <TextField className="input"
                                               fullWidth
                                               name="email"
                                               label="Email"
                                               value={formik.values.email}
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
                                               error={formik.touched.email && Boolean(formik.errors.email)}
                                               helperText={formik.touched.email && formik.errors.email}
                                    />
                                    {/*<div className="error">{this.state?.error}</div>*/}
                                    <div className="buttons">
                                        <Button className={'button primary'} color="inherit" variant="contained" type="submit">
                                            Sign In
                                        </Button>
                                    </div>
                                </form>
                            )
                        }

                    </Formik>
                </Paper>
            </div>
        );
    }
}

export default User;

// <div class="user">
//     <mat-card class="form" *ngIf="user && !passwordChanging" [formGroup]="form">
//
//     <mat-form-field>
//       <input matInput placeholder="Phone number" formControlName="phone"/>
//       <mat-error>{{getErrorMessage('phone')}}</mat-error>
//     </mat-form-field>
//
//     <mat-form-field>
//       <input matInput placeholder="Email" formControlName="email"/>
//       <mat-error>{{getErrorMessage('email')}}</mat-error>
//     </mat-form-field>
//
//     <mat-form-field *ngIf="currentUser?.role === 'Admin'">
//       <mat-label>Role</mat-label>
//       <mat-select formControlName="role">
//         <mat-option *ngFor="let role of roles" [value]="role">
//           {{role}}
//         </mat-option>
//       </mat-select>
//       <mat-error>{{getErrorMessage('role')}}</mat-error>
//     </mat-form-field>
//     <button class="submit" mat-flat-button color="primary" (click)="submit()">Submit</button>
// </mat-card>
//
// <mat-card class="form" *ngIf="user && passwordChanging" [formGroup]="changePassForm">
// <mat-form-field>
// <input [type]="hidePassword1 ? 'password' : 'text'" matInput placeholder="Password"
// formControlName="password"/>
//     <button tabindex="-1" mat-icon-button matSuffix (click)="hidePassword1 = !hidePassword1">
//     <mat-icon>{{hidePassword1 ? 'visibility_off' : 'visibility'}}</mat-icon>
// </button>
// <mat-error>{{getErrorMessage('password')}}</mat-error>
// </mat-form-field>
//
// <mat-form-field>
// <input [type]="hidePassword2 ? 'password' : 'text'" matInput placeholder="Confirm password"
// formControlName="confirm"/>
// <button tabindex="-1" mat-icon-button matSuffix (click)="hidePassword2 = !hidePassword2">
// <mat-icon>{{hidePassword2 ? 'visibility_off' : 'visibility'}}</mat-icon>
// </button>
// <mat-error>{{getErrorMessage('confirm', 'email confirmation')}}</mat-error>
// </mat-form-field>
//
// <button class="submit" mat-flat-button color="primary" (click)="changePassword()">Submit</button>
// </mat-card>
//
// <mat-card class="actions">
// <button mat-button [class.selected]="!passwordChanging" (click)="passwordChanging = false">General information</button>
// <button mat-button *ngIf="currentUser?.id === user?.id" [class.selected]="passwordChanging"
// (click)="passwordChanging = true">
// Change password
// </button>
// <button mat-button (click)="redirectToUserGallery()">View uploaded artworks</button>
// </mat-card>
//
// </div>
// <div class="user__delete">
// <div class="button" (click)="delete()">
// Delete the account
// </div>
// </div>
