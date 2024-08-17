import React, { useState, useRef, useEffect } from 'react';

import spotify_logo from '../assets/vectors/Vector8_x2.svg';

import OptionsButton from '../assets/vectors/Vector3_x2.svg';
import PreviousButton from '../assets/vectors/Vector9_x2.svg';
import PlayButton from '../assets/vectors/Vector11_x2.svg';
import PauseButton from '../assets/vectors/pause.png';
import NextButton from '../assets/vectors/Vector2_x2.svg';
import SoundButton from '../assets/vectors/Vector4_x2.svg';

const Player = ({ song, songs, onSongSelect }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false); // New state for tracking if the audio is loaded

    const audioRef = useRef(null);

    // Set the audio source when the song changes
    useEffect(() => {
        if (audioRef.current && song) {
            setIsLoaded(false); // Reset loading state when a new song is selected
            audioRef.current.src = song.url;
            audioRef.current.load(); // Load the new song

            // Attach an event listener to detect when the audio is fully loaded
            audioRef.current.addEventListener('canplaythrough', () => {
                setIsLoaded(true); // Set loading state to true when the audio is ready to play
                setIsPlaying(true); // Automatically start playing the audio once it's loaded
                audioRef.current.play().catch(error => {
                    console.error("Error trying to play the audio:", error);
                });
            });

            // Optionally, handle errors during loading
            audioRef.current.addEventListener('error', (error) => {
                console.error("Error trying to load the audio:", error);
            });

            return () => {
                // Cleanup event listeners when the component unmounts or the song changes
                audioRef.current.removeEventListener('canplaythrough', () => {});
                audioRef.current.removeEventListener('error', () => {});
            };
        }
    }, [song]);

    // Handle play/pause functionality
    useEffect(() => {
        if (audioRef.current && isLoaded) {
            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.error("Error trying to play the audio:", error);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, isLoaded]);

    // Update current time and duration as the song plays
    useEffect(() => {
        const audio = audioRef.current;

        const updateProgress = () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration);
        };

        if (audio) {
            audio.addEventListener('timeupdate', updateProgress);
            audio.addEventListener('loadedmetadata', updateProgress);
            audio.addEventListener('ended', handleNext);
        }

        return () => {
            if (audio) {
                audio.removeEventListener('timeupdate', updateProgress);
                audio.removeEventListener('loadedmetadata', updateProgress);
                audio.removeEventListener('ended', handleNext);
            }
        };
    }, [song]);

    const togglePlayPause = () => {
        if (audioRef.current && isLoaded) {
            setIsPlaying(!isPlaying);
        }
    };

    const handleNext = () => {
        if (songs && song) {
            const currentIndex = songs.findIndex((s) => s.id === song.id);
            const nextSong = songs[(currentIndex + 1) % songs.length];
            onSongSelect(nextSong);
        }
    };

    const handlePrevious = () => {
        if (songs && song) {
            const currentIndex = songs.findIndex((s) => s.id === song.id);
            const prevSong = songs[(currentIndex - 1 + songs.length) % songs.length];
            onSongSelect(prevSong);
        }
    };

    const handleSeekerChange = (e) => {
        const newTime = (e.target.value / 100) * duration;
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    if (!song) {
        return (
            <div className='player'>
                <div className='center'>
                <img className="no-song-spotify-logo" src={spotify_logo} alt="Spotify logo" title="Spotify logo" />
                <div className="song-info">
                    <div className="viva-la-vida" style={{textAlign:'center'}}>Select a Song From Menu</div>
                </div>
                </div>
            </div>
        );
    }

    // Calculate progress bar fill percentage
    const progressBarFill = (currentTime / duration) * 100 || 0;

    return (
        <>
            <div className="player">
                <div className="song-info">
                    <div className="viva-la-vida">{song.name}</div>
                    <span className="coldplay">{song.artist}</span>
                </div>
                <div className="center">
                    <div
                        className="cover"
                        style={{ backgroundImage: `url(https://cms.samespace.com/assets/${song.cover})` }}
                    >
                        {/* image */}
                    </div>
                    <div className="seeker">
                        <input
                            type="range"
                            className="rectangle-7"
                            value={(currentTime / duration) * 100 || 0}
                            onChange={handleSeekerChange}
                            style={{
                                background: `linear-gradient(to right, #FFFFFF ${progressBarFill}%, #555 ${progressBarFill}%)`
                            }}
                            disabled={!isLoaded} // Disable the seeker until the song is loaded
                        />
                    </div>
                </div>
                <div className="controls">
                    <div className="group-7">
                        <div className="frame-1">
                            <img className="options-button" src={OptionsButton} alt="options-button" title="More" />
                        </div>
                    </div>
                    <div className="frame-91">
                        <div className="frame-2" onClick={handlePrevious}>
                            <img className="previous-button" src={PreviousButton} alt="previous-button" title='Previous Song' />
                        </div>
                        <div className="frame-3" onClick={togglePlayPause}>
                            {isPlaying && isLoaded ? (
                                <img className="pause-button" src={PauseButton} alt="pause-button" title='Pause' />
                            ) : (
                                <img className="play-button" src={PlayButton} alt="play-button" title='Play' />
                            )}
                        </div>
                        <div className="frame-4" onClick={handleNext}>
                            <img className="next-button" src={NextButton} alt="next-button" title='Next Song' />
                        </div>
                    </div>
                    <div className="frame-5">
                        <img className="sound-button" src={SoundButton} alt="sound-button" title='Mute' />
                    </div>
                </div>
            </div>
            <audio ref={audioRef} />
        </>
    );
};

export default Player;
