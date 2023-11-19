import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';


function Login(){
  return(
    <GoogleOAuthProvider clientId="255299074998-i2png2ca07osvp5b3rfa4fq8qi4btte6.apps.googleusercontent.com">
    <GoogleLogin
      onSuccess={credentialResponse => {
      console.log(credentialResponse);
  }}
      onError={() => {
      console.log('Login Failed');
  }}
    />
    </GoogleOAuthProvider>
    );
}

export default Login;