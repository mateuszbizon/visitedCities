import React, { useState } from 'react';
import { getLocationsBySearch, addNewLocationById } from '../api';
import { useNotification } from '../context/NotifiactionContext';
import * as messages from "../constants/messages";

function SearchCities({ allUserLocations, setAllUserLocations }) {
    const [searchValue, setSearchValue] = useState("");
    const [exactMatch, setExactMatch] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState({ id: null, index: null, city: null });
    const { showNotification, showErrorNotification } = useNotification();

    function handleGetLocationsBySearch(e) {
        e.preventDefault();

        if (searchValue === "") return;

        setIsLoading(true);
        getLocationsBySearch(searchValue, exactMatch)
            .then(data => {
                setSearchedCities([...data.content]);

                if (!data.content.length) {
                    showNotification(messages.searchCitiesEmpty);
                }

                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                showErrorNotification(messages.searchCitiesFailMessage);
            })
    }

    function clearSelectedCity() {
        setSelectedCity({ ...selectedCity, id: null, index: null, city: null });
    }

    function toggleSelectedCity(cityId, cityIndex, city) {
        if (selectedCity.index === cityIndex) {
            clearSelectedCity();

            return;
        }

        setSelectedCity({ ...selectedCity, id: cityId, index: cityIndex, city: city });
    }

    function handleAddNewLocation() {
        setIsLoading(true);     
        addNewLocationById(selectedCity.id)
            .then(() => {
                setIsLoading(false);

                const updatedSearchedCities = searchedCities.filter(city => city.id !== selectedCity.id);

                setSearchedCities([...updatedSearchedCities]);
                setAllUserLocations([...allUserLocations, selectedCity.city]);
                clearSelectedCity();

                showNotification(messages.newPlaceAddedSuccessMessage);
            })
            .catch(error => {
                setIsLoading(false);

                if (error.response.data.statusCode === 422) {
                    showErrorNotification(messages.newPlaceAlreadyAddedMessage);

                    return;
                }

                showErrorNotification(messages.newPlaceAddedFailMessage)
            })
    }

    function changeCheckbox() {
        setExactMatch(!exactMatch);
    }

  return (
    <div className='search-cities'>
        <form>
            <input className='search-cities__input' type='text' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} placeholder='Szukaj miasta' />
            <div className='search-cities__form-row-checkbox'>
                <input id='exact-match' className='search-cities__checkbox' type='checkbox' checked={exactMatch} onChange={changeCheckbox} />
                <label htmlFor="exact-match">Wyszukiwanie dokładne</label>
            </div>
            <button className='search-cities__search-btn' onClick={handleGetLocationsBySearch} disabled={isLoading || searchValue === ""}>Szukaj</button>
        </form>
        <div className='search-cities__content'>
            {searchedCities.map((city, index) => (
                <div 
                    className={index === selectedCity.index ? 'search-cities__city search-cities__city--selected' : "search-cities__city"} 
                    key={index} 
                    onClick={() => toggleSelectedCity(city.id, index, city)}>
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
        <button className='search-cities__new-city-btn' disabled={!selectedCity.id || isLoading} onClick={handleAddNewLocation}>Dodaj miasto</button>
    </div>
  )
}

export default SearchCities