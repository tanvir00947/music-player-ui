import React from 'react';


const SongItem = ({ name, artist, duration, cover, onClick }) => {
  return (
    <div className="list-item-01" onClick={onClick}>
      <div className="frame-41">
        <div 
          className="image-41"
          style={{ backgroundImage: `url(${cover})` }}
          >
          
        </div>
        <div className="frame-31">
          <span className="song-name-style">{name}</span>
          <span className="artist-name-style">{artist}</span>
        </div>
      </div>
      <div className="container-2">
        {duration}
      </div>
    </div>
  );
};

export default SongItem;
