
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ condition, redirectTo }) => {
  // Aquí podrías usar cualquier lógica para verificar la condición
  const isAuthenticated = condition; // Puedes verificar el localStorage o cualquier otra lógica

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;