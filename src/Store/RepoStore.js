import { create } from "zustand";
import api from "../api/axios";
import toast from "react-hot-toast";
// import {} from "zustand/middleware"
export const useRepoStore = create((set,get) => ({
  isLoading: false,
  repos: [],
  error: null,
  files: [],
  owner: "",
  repoName: "",
  selectedFileContent: null,
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
  getFileContent: async (path) => {
    const { owner, repoName } = get();
    
    if (!owner || !repoName || !path) {
      toast.error("Missing repository information");
      return null;
    }

    set({ isLoading: true });
    try {
      const response = await api.post("/getFileContent", {
        owner,
        repo: repoName,
        path,
      });

      if (response.data.success) {
        set({ selectedFileContent: response.data.content });
        return response.data.content;
      }
    } catch (error) {
      console.error("File Content Error:", error);
      toast.error(error.response?.data?.message || "Failed to load file content");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
}));
