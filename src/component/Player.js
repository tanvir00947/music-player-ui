import React, { useState,useRef, useEffect } from 'react';

import OptionsButton from '../assets/vectors/Vector3_x2.svg';
import PreviousButton from '../assets/vectors/Vector9_x2.svg';
import PlayButton from '../assets/vectors/Vector11_x2.svg';
import PauseButton from '../assets/vectors/pause.png'
import NextButton from '../assets/vectors/Vector2_x2.svg';
import SoundButton from '../assets/vectors/Vector4_x2.svg';

const Player = ({song}) => {
    const [isPlaying,setIsPlaying] = useState(false)
    const audioRef = useRef(null)

    useEffect(() => {
        if (audioRef.current && song) {
            audioRef.current.src = song.url;
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [song, isPlaying]);

    const togglePlayPause = () =>{
        if(audioRef.current){
            if(isPlaying){
                audioRef.current.pause();
            } else{
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying)
        }
    }

    // DO next and prev functionality


    if(!song){
        return <div className='player'>select a song to play</div>
    }
    return (
        <>
            <div className="player">
                <div className="song-info">
                <div className="viva-la-vida">{song.name} </div>
                <span className="coldplay">{song.artist} </span>
                </div>
                <div className="center">
                <div 
                    className="cover"
                    style={{ backgroundImage: `url(https://cms.samespace.com/assets/${song.cover})` }}
                >
                    {/* image */}
                </div>
                <div className="seeker">
                    <div className="rectangle-7">
                    </div>
                </div>
                </div>
                <div className="controls">
                <div className="group-7">
                    <div className="frame-1">
                    <img className="options-button" src={OptionsButton} alt="options-button" title="More"/>
                    </div>
                </div>
                <div className="frame-91" >
                    <div className="frame-2">
                    <img className="previous-button" src={PreviousButton} alt="previous-button" title='Previous Song' />
                    </div>
                    <div className="frame-3" onClick={togglePlayPause}>
                    {isPlaying ? (
                        <img className="pause-button" src={PauseButton} alt="pause-button" title='Pause' />
                    ) : (
                        <img className="play-button" src={PlayButton} alt="play-button" title='Play' />
                    )}
                    
                    
                    </div>
                    {/* <div className="frame-32">
                    <img className="container" src="assets/vectors/Image_x2.svg" />
                    </div> */}
                    <div className="frame-4">
                    <img className="next-button" src={NextButton} alt="next-button" title='Next Song'/>
                    </div>
                </div>
                <div className="frame-5">
                    <img className="sound-button" src={SoundButton} alt="sound-button" title='Mute' />
                </div>
                </div>
            </div>
            <audio ref={audioRef} />
        </>
    )
}

export default Player