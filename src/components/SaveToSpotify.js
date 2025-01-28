const Spotify = {
    accessToken: null,
    clientId: process.env.REACT_APP_CLIENT_ID,
    redirectUri: 'https://unrivaled-figolla-2936fd.netlify.app/',
  
    getAccessToken() {
      if (this.accessToken) {
        return this.accessToken;
      }
      // Extract the access token from URL
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
  
      if (accessTokenMatch && expiresInMatch) {
        this.accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
  
        // Clear access token after expiration
        window.setTimeout(() => (this.accessToken = ""), expiresIn * 1000);
        window.history.pushState("Access Token", null, "/");
        return this.accessToken;
      } else {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${this.redirectUri}`;
        window.location = accessUrl;
      }
    },
  
    async savePlaylist(playlistName, trackUris) {
      if (!playlistName || !trackUris.length) {
        return;
      }
  
      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
  
      // Get the user's Spotify ID
      const response = await fetch("https://api.spotify.com/v1/me", { headers });
      const userData = await response.json();
      const userId = userData.id;
  
      // Create a new playlist
      const createPlaylistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers,
          method: "POST",
          body: JSON.stringify({
            name: playlistName,
            description: "Custom playlist from Jammming",
          }),
        }
      );
      const playlistData = await createPlaylistResponse.json();
      const playlistId = playlistData.id;
  
      // Add tracks to the playlist
      fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers,
        method: "POST",
        body: JSON.stringify({ uris: trackUris }),
      });
    },
  };
  
  export default Spotify;
  