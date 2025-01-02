// spotifyAuth.js

export async function getSpotifyToken(clientId, clientSecret) {
    // 1. Combine clientId and clientSecret into a Base64-encoded string
    const credentials = btoa(`${clientId}:${clientSecret}`);
    
    // 2. Define the endpoint for requesting a token
    const tokenUrl = "https://accounts.spotify.com/api/token";
    
    // 3. Prepare the request options
    const requestOptions = {
      method: "POST", // We are sending a POST request as per the Spotify documentation.
      headers: {
        // Authorization header: Pass the encoded client credentials
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded", // Inform Spotify of the data type being sent
      },
      body: "grant_type=client_credentials", // Send 'grant_type=client_credentials' to specify the type of token
    };
  
    try {
      // 4. Make the API request using fetch
      const response = await fetch(tokenUrl, requestOptions);
  
      // 5. Check if the response is successful (status 200)
      if (!response.ok) {
        throw new Error(`Error fetching Spotify token: ${response.status} ${response.statusText}`);
      }
  
      // 6. Parse the JSON response to extract the token
      const data = await response.json();
      
      // 7. Return the access token
      return data.access_token;
    } catch (error) {
      // 8. Handle any errors that occur during the request
      console.error("Failed to fetch Spotify token:", error);
      throw error;
    }
  }
  