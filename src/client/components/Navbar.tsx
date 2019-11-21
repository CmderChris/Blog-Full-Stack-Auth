import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC<INavbarProps> = props => {
    return (
        <nav className="nav justify-content-center p-2 shadow-sm">
            <NavLink exact to="/" className="btn btn-outline-primary mx-2 shadow-sm" activeClassName="btn btn-primary mx-2 shadow-sm text-white">
                Home
            </NavLink>

            <NavLink exact to="/compose" className="btn btn-outline-primary mx-2 shadow-sm" activeClassName="btn btn-primary mx-2 shadow-sm text-white">
                Add Blog
            </NavLink>
        </nav>
    );
}

interface INavbarProps {}

export default Navbar;