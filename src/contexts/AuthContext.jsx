import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, getToken } from '../services/authService';

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

  const value = {
    currentUser,
    isAdmin: currentUser?.role === 'admin',
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};