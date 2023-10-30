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
            <i className="fa-solid fa-bars map-header__icon map-header__burger-icon" onClick={handleListActive}></i>
            <h2 className='map-header__logo'>visitedCities</h2>
        </div>
        <div className="map-header__right-side">
            <a href='/' className='map-header__link'>Wyloguj się</a>
            <i className="fa-solid fa-right-from-bracket map-header__icon map-header__logout-icon" aria-label='wyloguj się' onClick={() => navigate("/")}></i>
        </div>
    </div>
  )
}

export default Header