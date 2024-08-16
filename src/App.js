import logo from './logo.svg';
import './NewApp.css';
// import Player1 from './Player1';
import SideBar from "./component/SideBar"
import SongList from './component/SongList';
import Player from './component/Player';
import { useState } from 'react';

function App() {
  const [currentSong,setCurrentSong]= useState(null);
  const [songList,setSongList] = useState([])

  const handleSongSelect = (song) => {
    setCurrentSong(song);
  }
  return (
    // <Player1/>
    <div className='player-1'>
      <SideBar/>
      <SongList onSongSelect={handleSongSelect} songList={songList} setSongList={setSongList} />
      <Player song={currentSong} songs={songList} onSongSelect={handleSongSelect} />
    </div>

  );
}

export default App;
