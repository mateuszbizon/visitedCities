import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    function saveUser(userData) {
        localStorage.setItem('user', JSON.stringify({ ...userData }));
        setUser(userData);
    }

    function logoutUser() {
        localStorage.removeItem("user");
        setUser(null);
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
    }, [])

  return (
    <UserContext.Provider value={{ saveUser, logoutUser, user }}>
      {children}
    </UserContext.Provider>
  );
}