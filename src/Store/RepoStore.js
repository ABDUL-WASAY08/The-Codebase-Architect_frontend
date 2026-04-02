import { create } from "zustand";
import api from "../api/axios";

export const useRepoStore = create((set) => ({
  isLoading: false,
  repos: [], 
  error: null,
  getRepos: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/getRepo');
      if (response.data.success) {
        set({ 
          repos: response.data.repos,
          isLoading: false 
        });
      }
    } catch (error) {
      console.error("Store Error:", error);
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || "Failed to fetch repos" 
      });
    }
  }
}));
