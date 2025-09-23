import { createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // No token / login logic anymore
  const login = () => {};
  const logout = () => {};

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated: true }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
