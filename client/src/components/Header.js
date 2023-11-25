import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useNotification } from '../context/NotifiactionContext';
import * as messages from "../constants/messages";

function Header({ listActive, setListActive }) {
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const user = JSON.parse(localStorage.getItem('user')).user;
    const [isUserModalActive, setIsUserModalActive] = useState(false);

    function handleListActive() {
        setListActive(!listActive);
    }

    function logout() {
        localStorage.removeItem("user");
        navigate("/");
        showNotification(messages.logoutSuccessMessage);
    }

    function showUserModal() {
        setIsUserModalActive(true);
    }

    function closeUserModal() {
        setIsUserModalActive(false);
    }

  return (
    <div className='map-header'>
        <div className='map-header__logo-side'>
            <button className='map-header__btn' onClick={handleListActive}>
                <i className="fa-solid fa-bars" aria-label='burger ikonka do otwierania bocznego menu'></i>
            </button>
            <span className='map-header__logo'>visitedCities</span>
        </div>
        <div className="map-header__right-side">
            <button className='map-header__btn-link' onClick={logout}>Wyloguj się</button>
            <button className='map-header__btn map-header__logout-btn' onClick={logout}>
                <i className="fa-solid fa-right-from-bracket" aria-label='ikonka do wylogowania się'></i>
            </button>
            <img 
                className='map-header__user-profile-img' 
                src={user.profilePictureLink} alt="" 
                onMouseEnter={showUserModal} 
                onMouseLeave={closeUserModal} 
            />
        </div>
        {isUserModalActive && (
            <div className="map-header__user-modal">
                <p>Zalogowany jako:</p>
                {user.email}
            </div>
        )}
    </div>
  )
}

export default Header