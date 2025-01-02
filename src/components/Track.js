const Track = ({ track, name, artist, album, onAdd, onRemove, isRemoval }) => {
    const handleAdd = () => {
        if (onAdd) {
          onAdd(track); // Add the track to the playlist
        }
      };
    
      const handleRemove = () => {
        if (onRemove) {
          onRemove(track); // Remove the track from the playlist
        }
      };
    return (
      <div>
        <h3>{name}</h3>
        <p>{artist}</p>
            <p>{album}</p>
        {isRemoval ? (
          <button onClick={handleRemove}>Remove</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>
    );
  };

export default Track