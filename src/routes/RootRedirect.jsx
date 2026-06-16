import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RootRedirect() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return null;
  }

  return <Navigate to={isAuthenticated ? '/' : '/login'} replace />;
}
