import logo from './logo.svg';
import './App.css';
// import Player1 from './Player1';
import SideBar from "./component/SideBar"
import SongList from './component/SongList';
import Player from './component/Player';
import { useState } from 'react';

function App() {
  const [currentSong,setCurrentSong]= useState(null);

  const handleSongSelect = (song) => {
    setCurrentSong(song);
  }
  return (
    // <Player1/>
    <div className='player-1'>
      <SideBar/>
      <SongList onSongSelect={handleSongSelect}/>
      <Player song={currentSong}/>
    </div>

  );
}

export default App;
