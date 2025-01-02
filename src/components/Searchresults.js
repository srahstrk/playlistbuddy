import Track from './Track'

const Searchresult = ({ tracks, onAdd, onRemove, isRemoval }) => {
  if (tracks.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div>
      {tracks.map((track) => (
        <Track 
        track={track}  
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


export default Searchresult;