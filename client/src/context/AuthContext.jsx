import { createContext, useContext, useState } from "react";
import { login as loginApi } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (emailAddress, password) => {
    const response = await loginApi(emailAddress, password);

    localStorage.setItem("token", response.token);
    localStorage.setItem("emailAddress", response.user.emailAddress);
    localStorage.setItem("displayName", response.user.username);

    setUser(response.user);

    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("emailAddress");
    localStorage.removeItem("displayName");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);