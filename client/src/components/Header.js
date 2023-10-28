import React from 'react'

function Header({ listActive, setListActive }) {

    function handleListActive() {
        setListActive(!listActive);
    }

  return (
    <div className='map-header'>
        <div className='map-header__logo-side'>
            <i className="fa-solid fa-bars map-header__icon map-header__burger-icon" onClick={handleListActive}></i>
            <h2>visitedCities</h2>
        </div>
        <div className="map-header__right-side">
            <a href='#' className='map-header__link'>Log Out</a>
            <i className="fa-solid fa-right-from-bracket map-header__icon map-header__logout-icon" aria-label='wyloguj się'></i>
        </div>
    </div>
  )
}

export default Header