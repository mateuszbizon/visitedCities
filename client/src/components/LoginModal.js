import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useUser } from '../context/UserContext';
import { googleLogin } from '../api';
import { useNotification } from '../context/NotifiactionContext';
import * as messages from "../constants/messages";
import LinearProgress from '@mui/material/LinearProgress';

function LoginModal({ loginModalActive, setLoginModalActive }) {
    const { saveUser } = useUser();
    const { showErrorNotification } = useNotification();
    const [isLoading, setIsLoading] = useState(false);

    function handleGoogleLogin(credentialResponse) {
      const token = credentialResponse?.credential;

      setIsLoading(true);
      googleLogin(token)
        .then(data => {
          saveUser(data.content);

          setLoginModalActive(false);
          setIsLoading(false);
        })
        .catch(() => {
          showErrorNotification(messages.loginFailMessage);
          setIsLoading(false);
        })
    };

  return (
    <div className={loginModalActive ? "login-modal show-login-modal" : "login-modal"}>
        <h1 className="login-modal__title">Zaloguj się przez</h1>
        <div className="login-modal__box">
            <span>Google</span>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
              console.log('Login Failed');
              }}
              width={"270"}
              shape='pill'
            />
        </div>
        {isLoading && (
          <LinearProgress />
        )}
    </div>
  )
}

export default LoginModal