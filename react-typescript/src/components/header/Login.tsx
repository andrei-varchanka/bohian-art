import React from "react";
import '../../styles/header/login.scss'
import {Button, Dialog, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {Formik} from "formik";
import * as yup from 'yup';


type LoginProps = { onLogin?: Function, onRegistration?: Function, onClose?: Function, isOpened: boolean };
type LoginState = {};

class Login extends React.Component<LoginProps, LoginState> {

    validationSchema = yup.object({
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
    });

    initialValues = {
        email: '',
        password: '',
    };

    constructor(props: any) {
        super(props);
    }

    login(values: any) {
        if (this.props.onLogin) {
            this.props.onLogin(values);
        }
    }

    registration() {
        if (this.props.onRegistration) {
            this.props.onRegistration();
        }
    }

    handleClose() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <Dialog className="login" onClose={() => this.handleClose()} open={this.props.isOpened}>
                <DialogTitle>Please enter your account details</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={this.initialValues}
                        validationSchema={this.validationSchema}
                        onSubmit={(values) => this.login(values)}>
                        {
                            formik => (
                                <form onSubmit={formik.handleSubmit}>
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
                                    <TextField className="input"
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                    <div className="buttons">
                                        <Button className={'button primary'} color="inherit" variant="contained" type="submit">
                                            Sign In
                                        </Button>
                                        <Button className="button" variant="contained" onClick={() => this.registration()}>
                                            Go to registration
                                        </Button>
                                    </div>
                                </form>
                            )
                        }

                    </Formik>
                </DialogContent>
            </Dialog>
        );
    }
}

export default Login;