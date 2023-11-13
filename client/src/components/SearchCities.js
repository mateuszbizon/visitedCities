import React, { useState } from 'react';
import { getLocationsBySearch } from '../api';
import { useNotification } from '../context/NotifiactionContext';
import * as messages from "../constants/messages";

function SearchCities() {
    const [searchValue, setSearchValue] = useState("");
    const [searchedCities, setSearchedCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState({ id: null, index: null });
    const { showNotification } = useNotification();

    function handleGetLocationsBySearch() {
        if (searchValue === "") return;

        setIsLoading(true);
        getLocationsBySearch(searchValue)
            .then(data => {
                setSearchedCities([...data.content]);
                setIsLoading(false);
            })
    }

    function toggleSelectedCity(city, cityIndex) {
        if (selectedCity.index === cityIndex) {
            setSelectedCity({ ...selectedCity, id: null, index: null });

            return;
        }

        setSelectedCity({ ...selectedCity, id: city.id, index: cityIndex });
    }

    function handleAddNewLocation() {
        setSelectedCity({ ...selectedCity, id: null, index: null });

        const updatedSearchedCities = searchedCities.filter(city => city.id !== selectedCity.id);

        setSearchedCities([...updatedSearchedCities]);
        showNotification(messages.newPlaceAddedSuccessMessage);
    }

  return (
    <div className='search-cities'>
        <input className='search-cities__input' type='text' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} placeholder='Szukaj miasta' />
        <button className='search-cities__search-btn' onClick={handleGetLocationsBySearch} disabled={isLoading || searchValue === ""}>Szukaj</button>
        <div className='search-cities__content'>
            {searchedCities.map((city, index) => (
                <div 
                    className={index === selectedCity.index ? 'search-cities__city search-cities__city--selected' : "search-cities__city"} 
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
        <button className='search-cities__new-city-btn' disabled={!selectedCity.id} onClick={handleAddNewLocation}>Dodaj miasto</button>
    </div>
  )
}

export default SearchCities