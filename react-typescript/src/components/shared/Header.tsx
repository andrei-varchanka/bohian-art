import React from 'react';
import {Link} from "react-router-dom";
import '../../styles/header.scss';

class Header extends React.Component {

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
                </div>
            </nav>
        );
    }
}

export default Header;
