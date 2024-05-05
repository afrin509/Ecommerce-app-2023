import { useState, createContext, useContext, useEffect } from "react";
import React from "react";
// import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  // axios.defaults.headers.common["authorization"] = auth?.token;
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setAuth({
        user: JSON.parse(localStorage.getItem("user")),
        token: localStorage.getItem("token"),
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
