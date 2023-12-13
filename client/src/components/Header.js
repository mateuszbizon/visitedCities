import React, { useState } from 'react';
import { useNotification } from '../context/NotifiactionContext';
import * as messages from "../constants/messages";
import { useUser } from '../context/UserContext';

function Header({ listActive, setListActive, setLoginModalActive }) {
    const { showNotification } = useNotification();
    const [isUserModalActive, setIsUserModalActive] = useState(false);
    const { user, logoutUser } = useUser();

    function handleListActive() {
        setListActive(!listActive);
    }

    function logout() {
        logoutUser();
        showNotification(messages.logoutSuccessMessage);
    }

    function showUserModal() {
        setIsUserModalActive(true);
    }

    function closeUserModal() {
        setIsUserModalActive(false);
    }

    function showLoginModal() {
        setLoginModalActive(true);
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
            {user ? (
                <>
                    <button className='map-header__btn-link' onClick={logout}>Wyloguj się</button>
                    <button className='map-header__btn map-header__logout-btn' onClick={logout}>
                        <i className="fa-solid fa-right-from-bracket" aria-label='ikonka do wylogowania się'></i>
                    </button>
                </>
            ) : (
                <>
                    <button className='map-header__btn-link' onClick={showLoginModal}>Zaloguj się</button>
                    <button className='map-header__btn map-header__signin-btn' onClick={showLoginModal}>
                        <i className="fa-solid fa-right-to-bracket" aria-label='ikonka do zalogowania się'></i>
                    </button>
                </>
            )}
            {user && (
                <img 
                className='map-header__user-profile-img' 
                src={user?.user?.profilePictureLink} alt="" 
                onMouseEnter={showUserModal} 
                onMouseLeave={closeUserModal} 
                />
            )}
        </div>
        {isUserModalActive && user && (
            <div className="map-header__user-modal">
                <p>Zalogowany jako:</p>
                {user?.user?.email}
            </div>
        )}
    </div>
  )
}

export default Header