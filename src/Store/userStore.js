import { create } from "zustand";
import api from "../api/axios";

const useUserStore = create((set) => ({
  isLoading: true,
  isAuthenticated: false,
  user: null,
  login: async (data) => {
    set({ isLoading: true }); 
    try {
      const backenResponse = await api.post("/Authorization", { data: data });
      if (backenResponse.data.success) {
        set({
          isAuthenticated: true,
          isLoading: false,
          user: backenResponse.data.user,
        });
        return { success: true };
      }
      set({ isLoading: false });
      return { success: false };
    } catch (error) {
      set({ isLoading: false, isAuthenticated: false });
      return { success: false };
    }
  },
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
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      const response = await api.post("/logout");
      if (response.data.success) {
        set({ isLoading: false, isAuthenticated: false, user: null });
        return ({success:true})
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
