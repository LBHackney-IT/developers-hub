import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const UserContext = createContext(null);

// Create Usercontext

const parseToken = () => {
    const token = Cookies.get('hackneyToken') || null;

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch(e) {
      return null;
    }
}

export const UserProvider = ({ children }) => {
  // decode cookie value
  const [ user, setUser ]= useState(parseToken())

  const logoutUser = () => {
    setUser(null);
    // delete cookie
    Cookies.remove('hackneyToken');
  };

  return <UserContext.Provider value={{ user, logout: logoutUser, setUser }}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  return useContext(UserContext);
}

/* eslint-disable no-unused-vars */
const SignOut = () => {
  const { logout } = useContext(UserContext);
  return <button onClick={logout}>Logout</button>;
}

export default UserContext
