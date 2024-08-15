import React from 'react';

import spotify_logo from '../assets/vectors/Vector8_x2.svg';

const SideBar = () => {
    return (
        <>
        <div className="container">
            <div className="logo">
            <img className="spotify-logo" src={spotify_logo} alt="spotify logo" title="spotify logo"/>
            </div>
            <div className="profile">
            </div>
        </div>
        </>
    )
}

export default SideBar;