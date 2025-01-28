import './App.css';
import React, { useState, useEffect } from 'react';
import { getSpotifyToken } from "./spotifyAuth";
import { fetchSpotifyData } from "./spotifyApi";
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import Searchresult from './components/Searchresults';
import Playlist from './components/Playlist';
import Spotify from './components/SaveToSpotify';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [playlistName, setPlaylistName] = useState('New Playlist'); 
const [playlistTracks, setPlaylistTracks] = useState([]); 
const [trackUris, setTrackUris] = useState([]);


const handleSearch = (query) => {
  setSearchQuery(query);
};

const updatePlaylistName = (name) => {
  setPlaylistName(name);
};

const addTrack = (track) => {
  if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) return;

  // Add the track to playlistTracks
  setPlaylistTracks((prevTracks) => [...prevTracks, track]);

  // Add the track URI to trackUris
  setTrackUris((prevUris) => [...prevUris, track.uri]);
};



const removeTrack = (track) => {
  setPlaylistTracks((prevTracks) =>
    prevTracks.filter((savedTrack) => savedTrack.id !== track.id)
  );
};

 useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery) return;

      try {
        // Step 1: Get Spotify API Token
        const token = await getSpotifyToken(process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET);
        // Step 2: Fetch data from Spotify API
        const fetchedSearchData = await fetchSpotifyData(`/search?q=${searchQuery}&type=track`, token);
        const tracks = fetchedSearchData.tracks?.items || [];
        // Step 3: Update state with the fetched data
        setSearchResults(tracks); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      }
    };

    fetchData(); // Call the async function
  }, [searchQuery]); // 

  const clearPlaylist = () => {
    setPlaylistTracks([]);
    setTrackUris([]);
  };

  const savePlaylist = () => {
    if (!playlistName || trackUris.length === 0) {
      alert("Please provide a playlist name and add tracks before saving.");
      return;
    }
  
    Spotify.savePlaylist(playlistName, trackUris)
      .then(() => {
        console.log("Playlist saved successfully!");
        clearPlaylist(); // Clear the playlist after saving
      })
      .catch((error) => {
        console.error("Error saving playlist:", error);
      });
  };



  return (
    <div>
      <Header/>
        <div>
      <Searchbar onSearch={handleSearch} />
    </div>
      <div className='playlist-wrapper'>
      <Searchresult tracks={searchResults} onAdd={addTrack}/>
      <Playlist
        playlistName={playlistName}
        playlistTracks={playlistTracks}
        onNameChange={updatePlaylistName}
        onRemove={removeTrack}
        trackUris={trackUris}
        onSave={savePlaylist}
      />
      </div>
      </div>
  );
}

export default App;
