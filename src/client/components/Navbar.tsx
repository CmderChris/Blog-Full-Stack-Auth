import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC<NavbarProps> = props => {

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
       localStorage.clear();
       window.location.reload();
    };

    return (
        <nav className="nav justify-content-center p-2 shadow-sm">

            <NavLink 
                exact to="/" 
                className="btn btn-outline-primary mx-3 my-2 shadow-sm" 
                activeClassName="btn btn-primary mx-3 my-2 shadow-sm text-white">
                    Home
            </NavLink>

            <NavLink 
                exact to="/compose" 
                className="btn btn-outline-primary mx-3 my-2 shadow-sm" 
                activeClassName="btn btn-primary mx-3 my-2 shadow-sm text-white">
                    Add Blog
            </NavLink>

            <NavLink 
                exact to="/login" 
                className="btn btn-outline-primary mx-3 my-2 shadow-sm" 
                activeClassName="btn btn-primary mx-3 my-2 shadow-sm text-white">
                    Login / Sign Up
            </NavLink>

            <button 
                className="btn btn-outline-primary mx-3 my-2 shadow-sm"
                onClick={handleLogout}>
                    Logout
            </button>

        </nav>
    );
}

interface NavbarProps {}

export default Navbar;