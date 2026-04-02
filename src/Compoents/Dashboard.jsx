import React, { useEffect, useState } from 'react';
import {
  Code2, GitBranchIcon, Trash2, Eye,
  BarChart3, GitBranch, ExternalLink
} from 'lucide-react';
import { useRepoStore } from '../Store/RepoStore';
import toast from 'react-hot-toast';
import api from '../api/axios';
import {useNavigate} from "react-router-dom"
const DashboardContent = () => {
  const navigate=useNavigate()
  const { repos, isLoading, getRepos } = useRepoStore();
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  useEffect(() => {
    getRepos();
  }, [getRepos]);

  const handleAnalyze = async (repo) => {
    try {
      setIsAnalyzing(true);
      const urlToAnalyze = repo?.url || repoUrl;
      if (!urlToAnalyze) return;

      const regex = /github\.com\/([^/]+)\/([^/]+)/;
      const match = urlToAnalyze.match(regex);
      
      if (!match) {
        toast.error('Invalid GitHub URL');
        setIsAnalyzing(false);
        return;
      }
      const owner = match[1];
      const repoName = match[2].replace('.git', "");
      const response = await api.post('/getTree', {
        owner,
        repo: repoName,
        branch: repo?.defaultBranch || "main"
      });

      if (response.data.success) {
        toast.success('File tree fetched!');
        console.log("Files:", response.data.files);
        navigate('/Analyzer', { state: { files: response.data.files, fullName: `${owner}/${repoName}` } });
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 scroll-y-auto">
      <div className="bg-white dark:bg-black rounded-xl shadow-sm p-6 sm:p-8 relative overflow-hidden transition-colors mb-6 border border-gray-100 dark:border-gray-800">
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Welcome to The Codebase Architect
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 max-w-2xl">
            Transform your codebase understanding with AI-powered insights.
            Analyze your GitHub repositories and get instant architectural clarity.
          </p>
        </div>
        <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10 dark:opacity-5 text-gray-900 dark:text-white">
          <Code2 size={200} className="sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px]" />
        </div>
      </div>
      <div className="bg-white dark:bg-black p-4 sm:p-6 transition-colors mb-6 border border-gray-100 dark:border-gray-800 rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
            Your GitHub Repositories
          </h2>
          {isLoading && <span className="text-sm text-blue-500 animate-pulse">Syncing with GitHub...</span>}
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {repos.length > 0 ? (
            repos.map((repo) => (
              <div key={repo.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all bg-gray-50/30 dark:bg-gray-900/20">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                      >
                        {repo.name}
                        <ExternalLink size={14} />
                      </a>
                      {repo.isPrivate && (
                        <span className="text-[10px] bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                          Private
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                      {repo.description || "No description provided."}
                    </p>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => handleAnalyze(repo)}
                      className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <BarChart3 size={16} />
                      Analyze
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-3">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    {repo.language || "Unknown"}
                  </span>
                  <span>Branch: <span className="text-gray-700 dark:text-gray-300 font-mono">{repo.defaultBranch}</span></span>
                  <span>Updated: {new Date(repo.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          ) : (
            !isLoading && <p className="text-center py-10 text-gray-500">No repositories found. Connect your GitHub to begin.</p>
          )}
        </div>
      </div>
      <div className="bg-white dark:bg-black p-4 sm:p-6 transition-colors border border-gray-100 dark:border-gray-800 rounded-xl">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Direct Analysis
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Paste GitHub repository URL..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={() => handleAnalyze()}
            disabled={isAnalyzing || !repoUrl}
            className="bg-gray-900 dark:bg-white dark:text-black text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isAnalyzing ? "Analyzing..." : "Go"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;