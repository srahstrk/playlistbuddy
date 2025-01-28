import Tracklist from './Tracklist';
import '../track.css'

function Playlist( { playlistName, playlistTracks, onNameChange, onRemove, onAdd, onSave } ) {

    const handleNameChange = (e) => {
        onNameChange(e.target.value); // Update playlist name in parent
      };
    

      return (
        <div className='your-playlist'>
          <h2>Create your Playlist</h2>
          <input
            type="text"
            value={playlistName}
            onChange={handleNameChange}
          />
          <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} onAdd={onAdd} />
          <button onClick={onSave} className='save'>Save To Spotify</button>
        </div>
    )
}

export default Playlist