import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await axiosInstance.get("/accounts/me");
      return response.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center text-2xl text-primary mt-10 animate-bounce">
        Loading...
      </div>
    );
  if (isError) return <div>Error loading user data</div>;

  return data ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
