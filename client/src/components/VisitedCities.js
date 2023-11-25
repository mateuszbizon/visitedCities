import React, { useState, useEffect } from 'react';
import villageImg from "../assets/village.jpg";
import cityImg from "../assets/city.jpg";
import { provinces, types } from '../constants/data';
import { deleteLocationById } from '../api';
import { useNotification } from '../context/NotifiactionContext';
import * as messages from "../constants/messages";

function VisitedCities({ allUserLocations, setAllUserLocations, userLocationsFiltered, setUserLocationsFiltered }) {
    const [selectedCity, setSelectedCity] = useState({ id: null, index: null });
    const [filteredValues, setFilteredValues] = useState({ type: "all", province: "all" });
    const [isLoading, setIsLoading] = useState(false);
    const { showNotification, showErrorNotification } = useNotification();

    function clearSelectedCity() {
        setSelectedCity({ ...selectedCity, id: null, index: null });
    }

    function toggleSelectedCity(city, cityIndex) {
        if (selectedCity.index === cityIndex) {
            clearSelectedCity();

            return;
        }

        setSelectedCity({ ...selectedCity, id: city.id, index: cityIndex });
    }

    function handleDeleteLocation() {
        setIsLoading(true);

        deleteLocationById(selectedCity.id)
            .then(() => {
                setIsLoading(false);

                const updatedAllUserLocations = allUserLocations.filter(location => location.id !== selectedCity.id)

                setAllUserLocations([...updatedAllUserLocations]);
                clearSelectedCity();

                showNotification(messages.deletedLocationSuccessMessage);
            })
            .catch(() => {
                setIsLoading(false);
                showErrorNotification(messages.deletedLocationFailMessage);
            })
    }

    function onChange(e) {
        setFilteredValues({ ...filteredValues, [e.target.name]: e.target.value })
    }

    function filterUserLocations() {
        let updatedUserLocationsFiltered = [...allUserLocations];

        if (filteredValues.type !== "all") {
            updatedUserLocationsFiltered = updatedUserLocationsFiltered.filter(place => place.type === filteredValues.type)
        }

        if (filteredValues.province !== "all") {
            updatedUserLocationsFiltered = updatedUserLocationsFiltered.filter(place => place.province === filteredValues.province)
        }

        setUserLocationsFiltered(updatedUserLocationsFiltered);
    }

    useEffect(() => {
        filterUserLocations();
    }, [filteredValues, allUserLocations])

  return (
    <div className='visited-cities'>
        <select name='province' className='visited-cities__input' value={filteredValues.province} onChange={onChange}>
            {provinces.map((province, index) => (
                <option key={index} value={province.value}>{province.text}</option>
            ))}
        </select>
        <select name='type' className='visited-cities__input' value={filteredValues.type} onChange={onChange}>
            {types.map((type, index) => (
                <option key={index} value={type.value}>{type.text}</option>
            ))}
        </select>
        <div className="visited-cities__content">
            {userLocationsFiltered.map((place, index) => (
                <div key={index} className={index === selectedCity.index ? "visited-cities__place visited-cities__place--selected" : "visited-cities__place"} onClick={() => toggleSelectedCity(place, index)}>
                    <img 
                        src={place.type === "village" ? villageImg : cityImg} 
                        alt={place.type === "village" ? "Zdjęcie ukazujące wieś" : "Zdjęcie ukazujące misato"} 
                    />
                    <div className="visited-cities__text-side">
                        <p className="visited-cities__place-name">{place.name}</p>
                        <p className="visited-cities__place-type">{place.type === "village" ? "Wieś" : "Miasto"}</p>
                        <div className="visited-cities__place-row">
                            <span className="visited-cities__place-text">Gmina</span>
                            <span className="visited-cities__place-text">{place.commune}</span>
                        </div>
                        <div className="visited-cities__place-row">
                            <span className="visited-cities__place-text">Powiat</span>
                            <span className="visited-cities__place-text">{place.district}</span>
                        </div>
                        <div className="visited-cities__place-row">
                            <span className="visited-cities__place-text">Województwo</span>
                            <span className="visited-cities__place-text">{place.province}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <button className="visited-cities__delete-place-btn" disabled={!selectedCity.id || isLoading} onClick={handleDeleteLocation}>Usuń miejsce</button>
    </div>
  )
}

export default VisitedCities