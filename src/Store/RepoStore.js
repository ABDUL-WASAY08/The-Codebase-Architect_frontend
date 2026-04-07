import { create } from "zustand";
import api from "../api/axios";
import toast from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

export const useRepoStore = create(
  persist(
    (set, get) => ({
      isLoading: false,
      repos: [],
      error: null,
      files: [],
      owner: "",
      repoName: "",
      selectedFileContent: null,
      GroqContent: null,
      recentAnalyses: [],
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
          set({ isLoading: true, files: [] });
          const urlToAnalyze = repo?.url || repoUrl;

          if (!urlToAnalyze) {
            set({ isLoading: false });
            return { success: false };
          }
          const match = urlToAnalyze.match(
            /github\.com\/([^/]+)\/([^/]+?)(?:\.git|\/)?$/,
          );

          if (!match) {
            toast.error("Invalid GitHub URL");
            set({ isLoading: false });
            return { success: false };
          }

          const owner = match[1];
          const repoName = match[2];

          const response = await api.post("/getTree", {
            owner,
            repo: repoName,
            branch: repo?.defaultBranch || "main",
          });

          if (response.data.success) {
            set({
              files: response.data.files,
              owner: owner,
              repoName: repoName,
              isLoading: false,
            });
            return { success: true };
          }
        } catch (error) {
          console.error("Tree Fetch Error:", error);
          toast.error("Failed to fetch repository tree");
          set({ files: [], isLoading: false });
          return { success: false };
        }
      },

      getFileContent: async (path) => {
        const { owner, repoName, recentAnalyses } = get();

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
            const newEntry = {
              fileName: path.split("/").pop(),
              path: path,
              analysis: response.data.analysis,
              repoName: repoName,
            };
            const filtered = recentAnalyses.filter(
              (item) => item.path !== path,
            );
            const updatedRecent = [newEntry, ...filtered].slice(0, 1);

            set({
              selectedFileContent: response.data.content,
              GroqContent: response.data.analysis,
              recentAnalyses: updatedRecent,
            });

            return response.data.content;
          }
        } catch (error) {
          toast.error("No data found for analysis");
          set({ GroqContent: null, selectedFileContent: null });
          return null;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "repo-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        files: state.files,
        owner: state.owner,
        repoName: state.repoName,
        selectedFileContent: state.selectedFileContent,
        GroqContent: state.GroqContent,
        recentAnalyses: state.recentAnalyses,
      }),
    },
  ),
);
