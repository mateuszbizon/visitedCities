import React, { useState } from 'react';
import { getLocationsBySearch } from '../api';

function SearchCities() {
    const [searchValue, setSearchValue] = useState("");
    const [searchedCities, setSearchedCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedCityIndex, setSelectedCityIndex] = useState(null);

    function handleGetLocationsBySearch() {
        if (searchValue === "") return;

        setIsLoading(true);
        getLocationsBySearch(searchValue)
            .then(data => {
                setSearchedCities([...data.content]);
                setIsLoading(false);
            })
    }

    function toggleSelectedCity(city, index) {
        if (selectedCityIndex === index) {
            setSelectedCity(null);
            setSelectedCityIndex(null);

            return;
        }

        setSelectedCity(city.id);
        setSelectedCityIndex(index);
    }

    function handleAddNewLocation() {
        setSelectedCity(null);
        setSelectedCityIndex(null);

        const updatedSearchedCities = searchedCities.filter(city => city.id !== selectedCity);

        setSearchedCities([...updatedSearchedCities])
    }

  return (
    <div className='search-cities'>
        <input className='search-cities__input' type='text' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} placeholder='Szukaj miasta' />
        <button className='search-cities__search-btn' onClick={handleGetLocationsBySearch} disabled={isLoading || searchValue === ""}>Szukaj</button>
        <div className='search-cities__content'>
            {searchedCities.map((city, index) => (
                <div 
                    className={index === selectedCityIndex ? 'search-cities__city search-cities__city--selected' : "search-cities__city"} 
                    key={index} 
                    onClick={() => toggleSelectedCity(city, index)}>
                    <span className='search-cities__city-name'>{city.name}</span>
                    <div>
                        <span className='search-cities__city-title'>Gmina:</span>
                        <span>{city.commune}</span>
                    </div>
                    <div>
                        <span className='search-cities__city-title'>Powiat:</span>
                        <span>{city.district}</span>
                    </div>
                    <div>
                        <span className='search-cities__city-title'>Województwo:</span>
                        <span>{city.province}</span>
                    </div>
                </div>
            ))}
        </div>
        <button className='search-cities__new-city-btn' disabled={!selectedCity} onClick={handleAddNewLocation}>Dodaj miasto</button>
    </div>
  )
}

export default SearchCities