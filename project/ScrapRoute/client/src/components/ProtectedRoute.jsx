import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // If there is no user, redirect to login page
  // We save the current location so we can redirect them back after login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user exists, render the child component (the protected page)
  return children;
};

export default ProtectedRoute;