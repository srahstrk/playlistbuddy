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
        <div className='searchbar'>
        <h2>Let's start! Just search your favourite song and start adding it to your playlist.</h2> 
        <input
        type="text"
        placeholder="Search for a song..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>  
        </div>
    )
}


export default Searchbar

  