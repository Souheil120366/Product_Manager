import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const withAuth = (Component) => {
   
  return () => {
    const { token } = useAuth();
    const navigate = useNavigate(); 
    if (!token) {
      navigate('/');
    }

    return <Component />;
  };
};

export default withAuth;
