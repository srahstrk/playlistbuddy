import React, { useState, useEffect } from 'react';
import '../searchbar.css';

const Searchbar = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };
    
      const handleSearch = () => {
        onSearch(inputValue); // Pass the input value back to the parent
      };

    return (
        <div className='searchbarWrapper'>
        <h2>Just search your favourite song, log into Spotify and start adding it to your playlist.</h2> 
        <input
        type="text"
        placeholder="Search for a song..."
        value={inputValue}
        onChange={handleInputChange}
        className='searchbar'
      />
      <button onClick={handleSearch} className='searchbutton'>Search</button>  
        </div>
    )
}


export default Searchbar

  