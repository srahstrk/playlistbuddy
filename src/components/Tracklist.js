import React from 'react';
import Track from './Track';

const Tracklist = ({ tracks, onAdd, onRemove, isRemoval }) => {
  return (
    <div>
      {tracks.map((track) => (
        <Track
        track={track}  
       xd
        key={track.id}
        name={track.name} 
          artist={track.artists[0].name} 
          album={track.album.name} 
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={isRemoval}
        />
      ))}
    </div>
  );
};

export default Tracklist