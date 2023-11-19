import React, { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      console.log('Token received:', credentialResponse);

      const token = credentialResponse?.credentials?.accessToken;

      const response = await fetch('https://visitedcitiesapi.azurewebsites.net/api/Account/GoogleExternalLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('accessToken', token);
        console.log('Token saved to local storage');

        // Redirect to the Map page after successful login
        navigate('/map');
      } else {
        console.log('Token validation failed on the server');
      }
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



