import React from 'react';
import spotify_logo from '../assets/vectors/Vector8_x2.svg';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__profile">
                <div className="profile-pic"></div>
            </div>
            <div className="navbar__logo">
                <img className="spotify-logo" src={spotify_logo} alt="spotify logo" title="spotify logo"/>
            </div>
            <div className="navbar__menu">
                <button className="menu-button">Songs</button>
            </div>
        </nav>
    );
}

export default Navbar;
