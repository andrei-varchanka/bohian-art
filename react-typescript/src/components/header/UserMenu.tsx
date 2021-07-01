import React from "react";
import {ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import WcIcon from '@material-ui/icons/Wc';
import AddIcon from '@material-ui/icons/Add';
import {Link} from "react-router-dom";
import {User} from "../../api";
import storageService from "../../services/storage";
import '../../styles/header/user-menu.scss'

type UserMenuProps = {anchorRef: any, isUserMenuOpened: boolean, onClose: Function };
type UserMenuState = { };
class UserMenu extends React.Component<UserMenuProps, UserMenuState> {

    user: User;

    constructor(props: any) {
       super(props);
       this.user = storageService.getUser();
    }

    close() {
        this.props.onClose();
    }

    logout() {
        storageService.logout();
    }

    render() {
        return (
            <Popper className="user-menu" open={this.props.isUserMenuOpened} anchorEl={this.props.anchorRef.current} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={() => this.close()}>
                                <MenuList>
                                    <MenuItem>
                                        <Link className="link" to={'/user/' + this.user.id}><PersonIcon/>My profile</Link>
                                    </MenuItem>
                                    {this.user.role === 'Artist' &&
                                    <MenuItem>
                                        <Link className="link" to={'/painting-editor/'}><AddIcon/>Add new painting</Link>
                                    </MenuItem>}
                                    {this.user.role === 'Admin' && <MenuItem><WcIcon/>Users</MenuItem>}
                                    <MenuItem onClick={() => this.logout()}><ExitToAppIcon/>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        );
    }
}

export default UserMenu;
