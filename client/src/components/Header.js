import React from 'react';
import { useNavigate } from "react-router-dom";

function Header({ listActive, setListActive }) {
    const navigate = useNavigate();

    function handleListActive() {
        setListActive(!listActive);
    }

  return (
    <div className='map-header'>
        <div className='map-header__logo-side'>
            <button className='map-header__btn' onClick={handleListActive}>
                <i className="fa-solid fa-bars" aria-label='burger ikonka do otwierania bocznego menu'></i>
            </button>
            <h2 className='map-header__logo'>visitedCities</h2>
        </div>
        <div className="map-header__right-side">
            <button className='map-header__btn-link' onClick={() => navigate("/")}>Wyloguj się</button>
            <button className='map-header__btn map-header__logout-btn' onClick={() => navigate("/")}>
                <i className="fa-solid fa-right-from-bracket" aria-label='ikonka do wylogowania się'></i>
            </button>
        </div>
    </div>
  )
}

export default Header