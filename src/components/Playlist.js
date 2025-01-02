import Tracklist from './Tracklist';
import React, { useState } from "react";

function Playlist( { playlistName, playlistTracks, onNameChange, onRemove, onAdd, onSave } ) {

    const handleNameChange = (e) => {
        onNameChange(e.target.value); // Update playlist name in parent
      };
    

      return (
        <div>
          <input
            type="text"
            value={playlistName}
            onChange={handleNameChange}
          />
          <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} onAdd={onAdd} />
          <button onClick={onSave}>Save To Spotify</button>
        </div>
    )
}

export default Playlist