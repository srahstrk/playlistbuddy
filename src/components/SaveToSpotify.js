const Spotify = {
  accessToken: null,
  clientId: process.env.REACT_APP_CLIENT_ID,
  redirectUri: "https://unrivaled-figolla-2936fd.netlify.app",

  getAccessToken() {
    if (this.accessToken) {
      return this.accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      this.accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => (this.accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return this.accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${this.redirectUri}`;
      window.location = accessUrl;
    }
  },

  async savePlaylist(playlistName, trackUris, onSuccess) {
    if (!playlistName || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    try {
      const response = await fetch("https://api.spotify.com/v1/me", { headers });
      const userData = await response.json();
      const userId = userData.id;

      const createPlaylistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers,
          method: "POST",
          body: JSON.stringify({ name: playlistName, description: "Custom playlist from PlaylistBuddy" }),
        }
      );
      const playlistData = await createPlaylistResponse.json();
      const playlistId = playlistData.id;

      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers,
        method: "POST",
        body: JSON.stringify({ uris: trackUris }),
      });

      // Call success function
      if (onSuccess) {
        onSuccess("Playlist saved successfully!");
      }
    } catch (error) {
      console.error("Error saving playlist:", error);
    }
  },
};

export default Spotify;
