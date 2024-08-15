import React, { useEffect, useState } from 'react';
import Search from '../assets/vectors/Vector1_x2.svg';
import SongItem from './SongItem';

const SongList = ({onSongSelect}) => {
    const [songList, setSongList] = useState([]);

    useEffect(() => {
        const fetchSongList = async () => {
            try {
                const response = await fetch('https://cms.samespace.com/items/songs');
                const responseData = await response.json();
                setSongList(responseData.data); // Assuming 'data' contains the array of songs
                console.log(responseData)
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };
        fetchSongList();
    }, []);

    return (
        <div className="sidebar">
            <div className="frame-33">
                <span className="title">For You</span>
                <span className="title-1">Top Tracks</span>
            </div>
            <div className="search">
                <div className="search-song-artist">Search Song, Artist</div>
                <div className="frame">
                    <img className="search-icon" src={Search} alt="search" title="search icon" />
                </div>
            </div>
            <div className="list-view">
                {songList.map((song) => (
                    <SongItem
                        key={song.id}
                        name={song.name}
                        artist={song.artist}
                        duration="4:00" // Example duration; you can calculate or fetch the real duration if available
                        cover={`https://cms.samespace.com/assets/${song.cover}`} // Assuming cover is an image ID
                        onClick={()=>onSongSelect(song)} // Call the handler with the clicked song
                    />
                ))}
            </div>
        </div>
    );
};

export default SongList;
