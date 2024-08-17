import { useState, useEffect } from 'react';
import ColorThief from 'colorthief';
import SideBar from "./component/SideBar";
import SongList from './component/SongList';
import Player from './component/Player';
import Navbar from './component/NavBar';
import './NewApp.css';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [songList, setSongList] = useState([]);
  const [bgGradient, setBgGradient] = useState('');
  const [isSongListVisible, setIsSongListVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate loading data
    const fetchSongs = async () => {
      // Simulate data fetching
      setIsLoading(true); // Set loading to true
      try {
        const response = await fetch('your-api-endpoint-to-fetch-songs');
        const data = await response.json();
        setSongList(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchSongs();
  }, []);

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
    setIsSongListVisible(false);
  };

  const toggleView = () => {
    setIsSongListVisible(!isSongListVisible); // Toggle between SongList and Player
  };

  return (
    <div className='app-container' style={{ background: bgGradient }}>
      <Navbar toggleView={toggleView} isSongListVisible={isSongListVisible} />
      <div className='player-1'>
        <SideBar />
        <div className={`sidebar ${isSongListVisible ? 'visible' : 'disapear'}`}>
          <SongList
            onSongSelect={handleSongSelect}
            songList={songList}
            setSongList={setSongList}
            isLoading={isLoading} // Pass loading state to SongList
          />
        </div>
        <div className={`player ${isSongListVisible ? 'disapear' : 'visible'}`}>
          <Player song={currentSong} songs={songList} onSongSelect={handleSongSelect} />
        </div>
      </div>
    </div>
  );
}

export default App;
