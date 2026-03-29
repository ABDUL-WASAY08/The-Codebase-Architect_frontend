import { create } from "zustand";
import api from "../api/axios";

const useUserStore = create((set) => ({
  isLoading: false,
  isAuthenticated: false,
  user: null,
  getMe: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/getMe");
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      console.log(response.data.user);
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      console.error("Failed to fetch user:", error);
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      const response = await api.post("/logout");
      if (response.data.success) {
        set({ isLoading: false, isAuthenticated: false, user: null });
      } else {
        throw new Error("Logout Failed");
        set({ isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },
}));

export default useUserStore;
