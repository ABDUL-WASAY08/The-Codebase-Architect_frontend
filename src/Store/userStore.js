import { create } from "zustand";
import api from "../api/axios";

const useUserStore = create((set) => ({
  isLoading: true,
  isAuthenticated: false,
  user: null,
  getMe: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/getMe");
      const userData = response.data.user || response.data;
      set({
        user: userData,
        isAuthenticated: !!userData,
        isLoading: false,
      });
      console.log(response.data.user)
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
        set({ isLoading: false });
        throw new Error("Logout Failed");
      }
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },
}));

export default useUserStore;
