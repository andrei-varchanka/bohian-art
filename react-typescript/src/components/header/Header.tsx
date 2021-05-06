import React, {RefObject} from 'react';
import {Link, withRouter} from "react-router-dom";
import '../../styles/header/header.scss';
import {Button, ClickAwayListener, Grow, Menu, MenuItem, MenuList, Paper, Popper} from "@material-ui/core";
import Login from "./Login";
import {navigationItems} from "../../constants";
import storageService from "../../services/storage";
import {User} from "../../api/api";

type HeaderProps = { history: any };
type HeaderState = { isLoginDialogOpened: boolean, isUserMenuOpened: boolean };

class Header extends React.Component<HeaderProps, HeaderState> {

    user: User;

    anchorRef: RefObject<HTMLButtonElement>;

    constructor(props: any) {
        super(props);
        this.state = {
            isLoginDialogOpened: false,
            isUserMenuOpened: false
        };
        this.anchorRef = React.createRef();
        this.toggleLoginDialog = this.toggleLoginDialog.bind(this);
        this.redirectToRegistration = this.redirectToRegistration.bind(this);
        this.user = storageService.getUser();
    }

    toggleLoginDialog() {
        this.setState({isLoginDialogOpened: !this.state.isLoginDialogOpened});
    }

    redirectToRegistration() {
        this.toggleLoginDialog();
        this.props.history.push('/registration');
    }

    toggleUserMenu() {
        this.setState({isUserMenuOpened: !this.state.isUserMenuOpened})
    }

    render() {
        return (
            <nav className="header">
                <div className="header__content">
                    <div className="left">
                        <Link className="logo" to="/">BOHIAN ART</Link>
                        <div className="navigation-items">
                            {navigationItems.map(item => {
                                return <Link key={item.label} className="navigation-item"
                                             to={item.route}>{item.label}</Link>
                            })}
                        </div>
                    </div>
                    <div className="actions">
                        {this.user
                            ? (<>
                                <Button className={'button primary'} color="inherit"
                                        ref={this.anchorRef}
                                        onClick={() => this.toggleUserMenu()}>
                                    {this.user.firstName + ' ' + this.user.lastName}
                                </Button>
                                <Popper open={this.state.isUserMenuOpened} anchorEl={this.anchorRef.current} transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={() => this.toggleUserMenu()}>
                                                    <MenuList>
                                                        <MenuItem onClick={() => this.toggleUserMenu()}>Profile</MenuItem>
                                                        <MenuItem onClick={() => this.toggleUserMenu()}>My account</MenuItem>
                                                        <MenuItem onClick={() => this.toggleUserMenu()}>Logout</MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </>)
                            : (<>
                                <Button className={'button primary'} variant="contained" color="inherit"
                                        onClick={() => this.toggleLoginDialog()}>
                                    Sign In / Sign Up
                                </Button>
                                < Login
                                    isOpened={this.state.isLoginDialogOpened}
                                    onRegistration={this.redirectToRegistration}
                                    onClose={this.toggleLoginDialog}
                                />
                            </>)
                        }
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(Header);
