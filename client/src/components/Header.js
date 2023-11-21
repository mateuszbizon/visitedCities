import React from 'react';
import { useNavigate } from "react-router-dom";
import { useNotification } from '../context/NotifiactionContext';
import * as messages from "../constants/messages";

function Header({ listActive, setListActive }) {
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    function handleListActive() {
        setListActive(!listActive);
    }

    function logout() {
        localStorage.removeItem("user");
        navigate("/");
        showNotification(messages.logoutSuccessMessage);
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
            <button className='map-header__btn-link' onClick={logout}>Wyloguj się</button>
            <button className='map-header__btn map-header__logout-btn' onClick={logout}>
                <i className="fa-solid fa-right-from-bracket" aria-label='ikonka do wylogowania się'></i>
            </button>
        </div>
    </div>
  )
}

export default Header