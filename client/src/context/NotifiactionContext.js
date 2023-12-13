import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export function useNotification() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);
    const [error, setError] = useState(false);

    const showNotification = (message) => {
        setNotification(message);
        setError(false);
    };

    const showErrorNotification = (message) => {
      setNotification(message);
      setError(true);
    }

    const hideNotification = () => {
        setNotification(null);
    };

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification, error, showErrorNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}