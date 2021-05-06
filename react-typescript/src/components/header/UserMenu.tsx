import React from "react";
import {ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from "@material-ui/core";


type UserMenuProps = {anchorRef: any, isUserMenuOpened: boolean, onClose: Function };
type UserMenuState = { };
class UserMenu extends React.Component<UserMenuProps, UserMenuState> {

    close() {
        this.props.onClose();
    }

    render() {
        return (
            <Popper open={this.props.isUserMenuOpened} anchorEl={this.props.anchorRef.current} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={() => this.close()}>
                                <MenuList>
                                    <MenuItem>Profile</MenuItem>
                                    <MenuItem>My account</MenuItem>
                                    <MenuItem>Logout</MenuItem>
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