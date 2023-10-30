import React, { useState } from 'react';
import { getLocationsBySearch } from '../api';

function SearchCities() {
    const [searchValue, setSearchValue] = useState("");
    const [searchedCities, setSearchedCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);

    function handleGetLocationsBySearch() {
        if (searchValue === "") return;

        setIsLoading(true);
        getLocationsBySearch(searchValue)
            .then(data => {
                setSearchedCities([...data.content]);
                setIsLoading(false);
            })
    }

  return (
    <div className='search-cities'>
        <input className='search-cities__input' type='text' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} placeholder='Szukaj miasta' />
        <button className='search-cities__search-btn' onClick={handleGetLocationsBySearch} disabled={isLoading}>Szukaj</button>
        <div className='search-cities__content'>
            {searchedCities.map((city, index) => (
                <div className='search-cities__city' key={index}>{city.name}</div>
            ))}
        </div>
        <button className='search-cities__new-city-btn' disabled={!selectedCity}>Dodaj miasto</button>
    </div>
  )
}

export default SearchCities