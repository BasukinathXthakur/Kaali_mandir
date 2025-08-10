import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, getToken, loginUser as login, registerUser as register } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const user = getCurrentUser();
    const token = getToken();
    
    if (user && token) {
      setCurrentUser(user);
    }
    
    setLoading(false);
  }, []);

  // Add login function
  const loginUser = async (email, password) => {
    const user = await login(email, password);
    setCurrentUser(user);
    return user;
  };

  // Add register function
  const registerUser = async (name, email, password, phone) => {
    const user = await register(name, email, password, phone);
    setCurrentUser(user);
    return user;
  };

  // Add logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isAdmin: currentUser?.role === 'admin',
    loading,
    loginUser,
    registerUser,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};