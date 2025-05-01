import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
