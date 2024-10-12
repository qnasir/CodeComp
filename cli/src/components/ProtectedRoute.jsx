import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" />;
  }

  // If token exists, render the protected content
  return children;
};

export default ProtectedRoute;
