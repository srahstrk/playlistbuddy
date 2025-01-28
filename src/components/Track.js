import '../track.css'

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
      <div className='tracklist'>
                
         <div className='add-remove-buttons'>
         {isRemoval ? (
          <button onClick={handleRemove} className='add-remove'>X</button>
        ) : (
          <button onClick={handleAdd} className='add-remove'>+</button>
        )}
         </div> 
        <h3>{name}</h3>
        <p>{artist}</p>
            <p lassName='album'> {album}</p>
      </div>
    );
  };

export default Track