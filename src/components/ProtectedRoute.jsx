import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";
import useAuthStore from "../stores/authStore"; // Import useAuthStore

const ProtectedRoute = ({ children }) => {
  const { logout } = useAuthStore(); // Get logout from store
  const localToken = localStorage.getItem("token"); // Get token once

  const { data: userData, isLoading, isError } = useQuery({ // Renamed data to userData
    queryKey: ["userData", localToken], // Include token in queryKey
    queryFn: async () => {
      // No need to check localToken here, 'enabled' handles it
      try {
        const response = await axiosInstance.get("/accounts/me");
        return response.data;
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          logout(); // Clear Zustand store
          return null; // Important to return null for useQuery data
        }
        throw error; // Re-throw other errors
      }
    },
    retry: 1, // Retry once
    enabled: !!localToken, // Only run if localToken exists
  });

  // If query is enabled (localToken exists) and loading
  if (isLoading && localToken) {
    return (
      <div className="text-center text-2xl text-primary mt-10 animate-bounce">
        Loading...
      </div>
    );
  }

  // Conditions for redirecting to login:
  // 1. No localToken (implies query was disabled or token was cleared).
  // 2. Query ran (not loading) but resulted in no userData (e.g., 401 or other issue leading to null).
  // 3. Query resulted in an error.
  if (!localToken || (!isLoading && !userData) || isError) {
    return <Navigate to="/login" replace />;
  }

  // If we have userData and no other redirect condition was met, render children.
  // This implies localToken exists, query is not loading, there is no error, and userData is present.
  if (userData) {
    return children;
  }

  // Fallback redirect, though the conditions above should be comprehensive.
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
