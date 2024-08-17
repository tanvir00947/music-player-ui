import React from 'react';
import spotify_logo from '../assets/vectors/Vector8_x2.svg';

const Navbar = ({toggleView,isSongListVisible}) => {
    return (
        <nav className="navbar">
            <div className="navbar__profile">
                <div className="profile-pic"></div>
            </div>
            <div className="navbar__logo">
                <img className="spotify-logo" src={spotify_logo} alt="spotify logo" title="spotify logo"/>
            </div>
            <div className="navbar__menu">
                <button className="menu-button" onClick={toggleView}>
                    {isSongListVisible ? 'Back' : 'Menu'}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
