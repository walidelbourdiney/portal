import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (userData) =>
    set({
      ...userData,
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
