import React from 'react';

import SideBar from "./component/SideBar"
import SongList from './component/SongList';
import Player from './component/Player';
// import './Player1.css';

// Importing vector assets
// import spotify_logo from './assets/vectors/Vector8_x2.svg';
// import Vector1 from './assets/vectors/Vector1_x2.svg';
// import Vector3 from './assets/vectors/Vector3_x2.svg';
// import VectorX from './assets/vectors/Vector9_x2.svg';
// import Vector11 from './assets/vectors/Vector11_x2.svg';
// import Vector2 from './assets/vectors/Vector2_x2.svg';
// import Vector4 from './assets/vectors/Vector4_x2.svg';


export default function Player1() {
  
  return (
    <div className="player-1">
      <SideBar/>
      <SongList/>
      <Player/>
    </div>
  );
}
