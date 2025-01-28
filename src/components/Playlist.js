import Tracklist from "./Tracklist";
import "../track.css";

function Playlist({ playlistName, playlistTracks, onNameChange, onRemove, onAdd, successMessage, onSave }) {

  const handleNameChange = (e) => {
    onNameChange(e.target.value); // Update playlist name
  };

  return (
    <div className="your-playlist">
      <h2>Create your Playlist</h2>
      <input type="text" value={playlistName} onChange={handleNameChange} />
      <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} onAdd={onAdd} />
      <button onClick={onSave} className="save">Save To Spotify</button>
      <p className="success-message">{successMessage}</p>
    </div>
  );
}

export default Playlist;
