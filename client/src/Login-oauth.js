import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from "./routes/Login";

import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="255299074998-i2png2ca07osvp5b3rfa4fq8qi4btte6.apps.googleusercontent.com">
    <Login />
    </GoogleOAuthProvider>
  </React.StrictMode>
);