import logo from './logo.svg';
import './NewApp.css';
// import Player1 from './Player1';
import SideBar from "./component/SideBar"
import SongList from './component/SongList';
import Player from './component/Player';
import Navbar from './component/NavBar';
import { useState,useEffect } from 'react';
import ColorThief from 'colorthief';

function App() {
  const [currentSong,setCurrentSong]= useState(null);
  const [songList,setSongList] = useState([])
  const [bgGradient, setBgGradient] = useState('');

  useEffect(() => {
    if (currentSong) {
        const img = new Image();
        img.src = `https://cms.samespace.com/assets/${currentSong.cover}`;
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const colorThief = new ColorThief();
            const colors = colorThief.getPalette(img, 2);
            const gradient = `linear-gradient(to bottom, rgb(${colors[0].join(',')}), rgb(${colors[1].join(',')}))`;
            setBgGradient(gradient);
        };
    }
  }, [currentSong]);

  const handleSongSelect = (song) => {
    setCurrentSong(song);
  }
  return (
    <div className='app-container' style={{ background: bgGradient }}>
    <Navbar /> {/* Add Navbar component */}
    <div className='player-1' >
      <SideBar />
      <SongList onSongSelect={handleSongSelect} songList={songList} setSongList={setSongList} />
      <Player song={currentSong} songs={songList} onSongSelect={handleSongSelect} />
    </div>
  </div>

  );
}

export default App;
