import React, { useContext, Component } from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';

const Navbar = props => {
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);

    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        })
    }

    const unauthenticatedNavBar = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-tem nav-link">
                        NoobCoder
                    </li>
                </Link>
                <Link to="/login">
                    <li className="nav-tem nav-link">
                        Login
                    </li>
                </Link>
                <Link to="/register">
                    <li className="nav-tem nav-link">
                        Register
                    </li>
                </Link>
            </>
        )
    }

    const authenticatedNavBar = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-tem nav-link">
                        Home
                    </li>
                </Link>
                <Link to="/todos">
                    <li className="nav-tem nav-link">
                        Todos
                    </li>
                </Link>

                {
                    user.role === "admin" ?
                    <Link to="/admin">
                        <li className="nav-tem nav-link">
                            Admin
                        </li>
                    </Link> : null
                }
                <button type="button" className="btn btn-link nav-item nav-link"
                onClick={onClickLogoutHandler}
                >
                    Logout
                </button>
            </>
        )
    }


    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/">
                    <div className="navbar-brand">
                        NoobCoder
                    </div>
                </Link>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        { !isAuthenticated ? unauthenticatedNavBar(): authenticatedNavBar() }
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Navbar;