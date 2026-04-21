import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ allowedRole }) => {
  const { user } = useAuth();

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required and the user doesn't have it, redirect to their respective dashboard
  if (allowedRole && user.role !== allowedRole) {
    return user.role === 'admin' ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />;
  }

  // Otherwise, render the child routes
  return <Outlet />;
};
