export async function fetchSpotifyData(endpoint, token) {
    const baseUrl = "https://api.spotify.com/v1";
    const url = `${baseUrl}${endpoint}`;
    
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
    }
  
    return await response.json(); // Parse the JSON response here
  }
  