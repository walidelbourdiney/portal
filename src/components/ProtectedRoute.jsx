import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) return null;

      try {
        const response = await axiosInstance.get("/accounts/me");
        return response.data;
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          return null;
        }
        throw error;
      }
    },
    retry: false,
  });

  if (!localStorage.getItem("token") || isError || !data) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="text-center text-2xl text-primary mt-10 animate-bounce">
        Loading...
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
