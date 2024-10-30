import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

// Higher-order component to protect specific components
const AuthProtection = (WrappedComponent) => {
  return (props) => {
    const { user } = useContext(AuthContext());

    if (!user) {
      return <Navigate to="/login" />;  // Redirect to login if not authenticated
    }

    return <WrappedComponent {...props} />;  // Render the protected component
  };
};

export default AuthProtection;
