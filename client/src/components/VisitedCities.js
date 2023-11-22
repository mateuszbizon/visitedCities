import React, { useState } from 'react';
import villageImg from "../assets/village.jpg";
import cityImg from "../assets/city.jpg";

function VisitedCities({ allUserLocations}) {
    const [selectedCity, setSelectedCity] = useState({ id: null, index: null });

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

  return (
    <div className='visited-cities'>
        <select className='visited-cities__input'>
            <option value="all" selected>wszystkie województwa</option>
            <option value="dolnośląskie">dolnośląskie</option>
        </select>
        <select className='visited-cities__input'>
            <option value="all" selected>wsie i miasta</option>
            <option value="village">tylko wsie</option>
            <option value="city">tylko miasta</option>
        </select>
        <div className="visited-cities__content">
            {allUserLocations.map((place, index) => (
                <div key={index} className={index === selectedCity.index ? "visited-cities__place visited-cities__place--selected" : "visited-cities__place"} onClick={() => toggleSelectedCity(place, index)}>
                    <img src={place.type === "village" ? villageImg : cityImg} />
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
        <button className="visited-cities__delete-place-btn" disabled={!selectedCity.id}>Usuń miejsce</button>
    </div>
  )
}

export default VisitedCities