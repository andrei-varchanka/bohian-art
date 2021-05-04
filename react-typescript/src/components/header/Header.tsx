import React from 'react';
import {Link, withRouter} from "react-router-dom";
import '../../styles/header/header.scss';
import {Button} from "@material-ui/core";
import Login from "./Login";

type HeaderProps = {history: any};
type HeaderState = {isLoginDialogOpened: boolean};
class Header extends React.Component<HeaderProps, HeaderState> {

    navigationItems = [
        {
            route: 'gallery',
            label: 'Gallery'
        },
        {
            route: 'contacts',
            label: 'Contacts'
        }
    ];

    constructor(props: any) {
        super(props);
        this.state = {
            isLoginDialogOpened: false
        };
        this.closeDialog = this.closeDialog.bind(this);
        this.redirectToRegistration = this.redirectToRegistration.bind(this);
    }

    openDialog() {
        this.setState({isLoginDialogOpened: true});
    }

    closeDialog() {
        this.setState({isLoginDialogOpened: false});
    }

    redirectToRegistration() {
        this.closeDialog();
        this.props.history.push('/registration');
    }

    render() {
        return (
            <nav className="header">
                <div className="header__content">
                    <div className="left">
                        <Link className="logo" to="/">BOHIAN ART</Link>
                        <div className="navigation-items">
                            {this.navigationItems.map(item => {
                                return <Link key={item.label} className="navigation-item" to={item.route}>{item.label}</Link>
                            })}
                        </div>
                    </div>
                    <div className="actions">
                        <Button className={'button primary'} variant="contained" color="inherit" onClick={() => this.openDialog()}>
                            Sign In / Sign Up
                        </Button>
                        <Login
                            isOpened={this.state.isLoginDialogOpened}
                            onRegistration={this.redirectToRegistration}
                            onClose={this.closeDialog}
                        />
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(Header);
