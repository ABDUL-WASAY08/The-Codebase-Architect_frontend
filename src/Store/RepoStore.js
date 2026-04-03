import { create } from "zustand";
import api from "../api/axios";

export const useRepoStore = create((set) => ({
  isLoading: false,
  repos: [],
  error: null,
  files: [],
  owner: "",
  repoName: "",
  getRepos: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/getRepo");
      if (response.data.success) {
        set({
          repos: response.data.repos,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Store Error:", error);
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch repos",
      });
    }
  },

  openRepo: async (repo, repoUrl) => {
    try {
      set({ isLoading: true });
      const urlToAnalyze = repo?.url || repoUrl;

      if (!urlToAnalyze) {
        set({ isLoading: false });
        return { success: false };
      }

      const regex = /github\.com\/([^/]+)\/([^/]+)/;
      const match = urlToAnalyze.match(regex);

      if (!match) {
        toast.error("Invalid GitHub URL");
        set({ isLoading: false });
        return { success: false };
      }

      const owner = match[1];
      const repoName = match[2].replace(".git", "");

      const response = await api.post("/getTree", {
        owner,
        repo: repoName,
        branch: repo?.defaultBranch || "main",
      });

      if (response.data.success) {
        const fetchedFiles = response.data.files;
        set({
          files: fetchedFiles,
          owner: owner,
          repoName: repoName,
          isLoading: false,
        });

        return { success: true };
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Analysis failed");
      return { success: false };
    } finally {
      set({ isLoading: false });
    }
  },
}));
