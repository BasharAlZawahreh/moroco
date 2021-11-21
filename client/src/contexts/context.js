import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import jwt from "jsonwebtoken";

export const AuthContext = React.createContext();

const LoginProvider = (props) => {
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    saveToken(localStorage.getItem("token"));
  }, []);

  const saveToken = (token) => {
    const user = jwt.decode(token);
    if (user) {
      setToken(token);
      setIsLoggedIn(true);
      setUserId(user.userId);
      localStorage.setItem("token", token);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId("");
    localStorage.clear();
    history.push("/login");
  };

  const validateToken = () => {
    const user = jwt.decode(token);
    if (!user) throw new Error();
  };
  const state = {
    userId,
    token,
    isLoggedIn,
    logout,
    saveToken,
    validateToken,
    setIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export default LoginProvider;
