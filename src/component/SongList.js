import React, { useEffect, useState } from 'react';
import Search from '../assets/vectors/Vector1_x2.svg';
import SongItem from './SongItem';

const SongList = ({ onSongSelect }) => {
    const [songList, setSongList] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [showTopTracks, setShowTopTracks] = useState(false);

    useEffect(() => {
        const fetchSongList = async () => {
            try {
                const response = await fetch('https://cms.samespace.com/items/songs');
                const responseData = await response.json();
                setSongList(responseData.data);
                setFilteredSongs(responseData.data); // Initialize with all songs
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };
        fetchSongList();
    }, []);

    const handleToggle = (showTopTracks) => {
        setShowTopTracks(showTopTracks);
        if (showTopTracks) {
            setFilteredSongs(songList.filter(song => song.top_track));
        } else {
            setFilteredSongs(songList);
        }
    };

    return (
        <div className="sidebar">
            <div className="frame-33">
                <span 
                    className={`title ${!showTopTracks ? 'active' : ''}`} 
                    onClick={() => handleToggle(false)}
                >
                    For You
                </span>
                <span 
                    className={`title-1 ${showTopTracks ? 'active' : ''}`} 
                    onClick={() => handleToggle(true)}
                >
                    Top Tracks
                </span>
            </div>
            <div className="search">
                <div className="search-song-artist">Search Song, Artist</div>
                <div className="frame">
                    <img className="search-icon" src={Search} alt="search" title="search icon" />
                </div>
            </div>
            <div className="list-view">
                {filteredSongs.map((song) => (
                    <SongItem
                        key={song.id}
                        name={song.name}
                        artist={song.artist}
                        duration="4:00" // Example duration
                        cover={`https://cms.samespace.com/assets/${song.cover}`}
                        onClick={() => onSongSelect(song)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SongList;
