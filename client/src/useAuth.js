import { useState, useEffect } from 'react';

const useAuth = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (token) => {
    setToken(token);
    localStorage.setItem('userToken', token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return { token, login, logout };
};

export default useAuth;