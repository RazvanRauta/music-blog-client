/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 11:21
*/

import React from 'react';
import {Link} from "react-router-dom";

class Header extends React.Component {


    renderUser() {
        const {userData, logout} = this.props;
        if (null === userData) {
            return (<i className="fas fa-spinner fa-spin"/>);
        }

        return (<span>Hello {userData.name},&nbsp;
            <button className="btn btn-link btn-sm" href="#" onClick={logout}>Logout</button>
        </span>)
    }


    render() {

        const {isAuthenticated} = this.props;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">
                    Music Blog
                </Link>

                <ul className="navbar-nav mr-auto">
                    {!isAuthenticated &&
                    (
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                    )
                    }

                    {isAuthenticated &&
                    (
                        <li className="nav-item">
                            <Link to="/song-form" className="nav-link">
                                Add New
                            </Link>
                        </li>
                    )
                    }
                </ul>

                <span className="navbar-text">

                    {isAuthenticated ? this.renderUser() : <Link to="/login">Sign-in</Link>}

                </span>
            </nav>
        )
    }

}

export default Header;