import React, { useEffect, useState } from 'react';
import Search from '../assets/vectors/Vector1_x2.svg';
import SongItem from './SongItem';

const SongList = ({ onSongSelect, songList, setSongList }) => {
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [showTopTracks, setShowTopTracks] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchSongList = async () => {
            try {
                const response = await fetch('https://cms.samespace.com/items/songs');
                const responseData = await response.json();
                setSongList(responseData.data);
                setFilteredSongs(responseData.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            } finally {
                setIsLoading(false); // Set loading to false after fetching
            }
        };
        fetchSongList();
    }, [setSongList]);

    const handleToggle = (showTopTracks) => {
        setShowTopTracks(showTopTracks);
        const filtered = showTopTracks ? songList.filter(song => song.top_track) : songList;
        setFilteredSongs(filtered.filter(song =>
            song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = showTopTracks ? songList.filter(song => song.top_track) : songList;
        setFilteredSongs(filtered.filter(song =>
            song.name.toLowerCase().includes(value.toLowerCase()) ||
            song.artist.toLowerCase().includes(value.toLowerCase())
        ));
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
                <input
                    type="text"
                    className="search-song-artist"
                    placeholder="Search Song, Artist"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div className="frame">
                    <img className="search-icon" src={Search} alt="search" title="search icon" />
                </div>
            </div>
            <div className="list-view">
                {isLoading ? (
                    <div className="loader"></div> // Show loader if loading
                ) : (
                    filteredSongs.length > 0 ? (
                        filteredSongs.map((song) => (
                            <SongItem
                                key={song.id}
                                name={song.name}
                                artist={song.artist}
                                duration="4:00" // Example duration
                                cover={`https://cms.samespace.com/assets/${song.cover}`}
                                onClick={() => onSongSelect(song)}
                            />
                        ))
                    ) : (
                        <div className="no-songs">No songs available</div>
                    )
                )}
            </div>
        </div>
    );
};

export default SongList;
