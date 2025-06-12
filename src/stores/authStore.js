import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (apiResponseData) =>
    set({
      user: apiResponseData.user, // Assuming user details are in apiResponseData.user
      token: apiResponseData.token, // Assuming token is in apiResponseData.token
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    }),

  getCurrentUser: () => {
    return set((state) => state.user);
  },
}));

export default useAuthStore;
