import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // Redirect to login and store the path they were trying to access
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname, message: "You must log in first to access this page." }} 
        replace 
      />
    );
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
