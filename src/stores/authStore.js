import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (userEmail, token) =>
    set({
      user: userEmail,
      token: token,
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
