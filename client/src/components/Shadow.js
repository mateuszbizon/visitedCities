import React from 'react';
import { useUser } from '../context/UserContext';

function Shadow({loginModalActive, setLoginModalActive}) {
    function closeLoginModal() {
        setLoginModalActive(false);
    }

  return (
    <div className={loginModalActive ? "shadow show-shadow" : "shadow"} onClick={closeLoginModal}></div>
  )
}

export default Shadow