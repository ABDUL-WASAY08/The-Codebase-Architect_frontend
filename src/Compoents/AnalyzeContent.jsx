import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRepoStore } from '../Store/RepoStore';
import toast from 'react-hot-toast';
import { Search, History, Lightbulb, ArrowRight, GitBranch } from 'lucide-react';

const AnalyzeContent = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const navigate = useNavigate();
  const { openRepo, isLoading, repos, recentAnalyses } = useRepoStore();
  const recentRepos = recentAnalyses;

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) {
      toast.error("Please enter a repository URL");
      return;
    }
    const result = await openRepo(null, repoUrl);
    if (result?.success) {
      toast.success('Repository analyzed successfully!');
      setRepoUrl('');
      navigate('/Analyzer');
    }
  };

  return (
    <div className="bg-white dark:bg-black p-4 sm:p-6 lg:p-8 transition-colors min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gary-600 rounded-lg">
            <Search size={24} className="text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Analyze New Repository
          </h2>
        </div>

        <div className="space-y-6">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <GitBranch size={16} /> GitHub Repository URL
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                placeholder="https://github.com/username/repository"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                disabled={isLoading}
              />
              <button
                onClick={handleAnalyze}
                disabled={isLoading || !repoUrl.trim()}
                className="bg-gary-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold flex items-center justify-center gap-2 min-w-[160px]"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <span>Start Analysis</span>
                )}
              </button>
            </div>
          </div>
          {recentRepos.length > 0 && (
            <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-white">
                <History size={18} className="text-blue-500" />
                <h3 className="text-lg font-bold">Recent File History</h3>
              </div>
              <div className="grid gap-3">
                {recentRepos.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 transition-all group"
                    onClick={() => navigate('/Analyzer')}
                  >
                    <div className="flex flex-col"

                    >
                      <span className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-500 transition-colors">
                        {file.fileName}
                      </span>
                      <span className="text-xs text-gray-500 italic">
                        from: {file.repoName}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate('/Analyzer')}
                      className="text-blue-600 dark:text-blue-400 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}


          <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl p-5 border border-blue-100/50 dark:border-blue-900/30">
            <div className="flex items-center gap-2 mb-3 text-blue-900 dark:text-blue-300">
              <Lightbulb size={18} />
              <h4 className="font-bold text-sm uppercase tracking-wider">Analysis Guide</h4>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <li className="text-xs text-blue-800/80 dark:text-blue-200/70 bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                <span className="font-bold block mb-1">Public URLs</span>
                Ensure the repo is accessible without extra auth.
              </li>
              <li className="text-xs text-blue-800/80 dark:text-blue-200/70 bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                <span className="font-bold block mb-1">Structure</span>
                Works best with organized directory structures.
              </li>
              <li className="text-xs text-blue-800/80 dark:text-blue-200/70 bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                <span className="font-bold block mb-1">AI Insights</span>
                Our Groq LPU engine processes files in seconds.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeContent;