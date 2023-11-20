import React, { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse?.credential;

      const response = await fetch('https://visitedcitiesapi.azurewebsites.net/api/Account/GoogleExternalLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token}),
      });
    
    const data = await response.json();

    localStorage.setItem('user', JSON.stringify({ ...data.content}));
 
     navigate('/map');
     
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="255299074998-i2png2ca07osvp5b3rfa4fq8qi4btte6.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default Login;



