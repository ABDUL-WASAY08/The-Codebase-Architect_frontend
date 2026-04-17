import React, { useEffect } from 'react';
import { GitBranchIcon, Eye, ExternalLink, LockIcon, Globe } from 'lucide-react';
import { useRepoStore } from '../Store/RepoStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const RepositoriesContent = () => {
  const navigate = useNavigate();
  const { repos, isLoading, getRepos, openRepo } = useRepoStore();
  useEffect(() => {
    if (repos.length === 0) {
      getRepos();
    }
  }, [getRepos, repos.length]);
  const handleAnalyze = async (repo) => {
    const result = await openRepo(repo);

    if (result?.success) {
      toast.success('File tree fetched!');
      navigate('/Analyzer');
    }
  };
  if (isLoading) {
    return (
      <div className="min-h-[93vh] flex items-center justify-center bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 dark:text-gray-400 animate-pulse font-medium">
            Fetching your repositories...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-[93vh] bg-white dark:bg-black p-4 sm:p-6 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
          All Repositories ({repos.length})
        </h2>
        <button
          onClick={() => getRepos()}
          className="text-xs font-medium text-black dark:text-black hover:underline bg-gary-50 dark:bg-gray-900/20 px-3 py-1.5 rounded-full transition-colors"
        >
          Refresh List
        </button>
      </div>
      <div className="space-y-4">
        {repos.length > 0 ? (
          repos.map((repo) => (
            <div key={repo.id} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-blue-500/50 transition-all bg-white dark:bg-gray-950 shadow-sm group">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-bold text-black dark:text-white hover:text-gary-800 flex items-center gap-2"
                    >
                      <GitBranchIcon size={18} />
                      <span className="break-all">{repo.name}</span>
                      <ExternalLink size={14} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                    </a>
                    {repo.isPrivate ? (
                      <span className="flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full border border-amber-500/20">
                        <LockIcon size={10} /> Private
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <Globe size={10} /> Public
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                    {repo.description || "No description provided for this repository."}
                  </p>
                </div>
                <button
                  onClick={() => handleAnalyze(repo)}
                  className="whitespace-nowrap px-5 py-2.5 bg-gray-900 text-white hover:bg-gray-800 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-900/10 active:scale-95"
                >
                  <Eye size={16} />
                  <span>Start Analysis</span>
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-4 border-t border-gray-100 dark:border-gray-900 pt-3">
                <div className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)] ${repo.language ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {repo.language || "Misc"}
                  </span>
                </div>
                <span className="text-[11px] text-gray-400 dark:text-gray-500">
                  Default Branch: <span className="font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{repo.defaultBranch}</span>
                </span>
                <span className="text-[11px] text-gray-400 dark:text-gray-500 ml-auto italic">
                  Updated {new Date(repo.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-gray-900/10">
            <p className="text-gray-500 dark:text-gray-400">No repositories found. Try refreshing the list.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default RepositoriesContent;