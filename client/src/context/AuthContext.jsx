import { createContext, useContext, useState } from "react";
import { login as loginApi } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const login = async (username, password) => {

    const response = await loginApi(username, password);

    localStorage.setItem("token", response.token);

    setUser(response.user);

    return response;
  };

  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);