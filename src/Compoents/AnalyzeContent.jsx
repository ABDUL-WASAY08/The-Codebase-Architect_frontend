import React, { useState } from 'react';

const AnalyzeContent = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const repositories = [
    { id: 1, name: 'ecommerce-platform' },
    { id: 2, name: 'ai-ml-pipeline' },
    { id: 3, name: 'mobile-app-backend' }
  ];

  const handleAnalyze = () => {
    if (!repoUrl.trim()) return;
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setRepoUrl('');
    }, 2000);
  };

  return (
    <div className=" bg-white dark:bg-black p-4 sm:p-6 lg:p-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
          Analyze New Repository
        </h2>
        <div className="space-y-6">
          {/* Input Section */}
          <div className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GitHub Repository URL
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                placeholder="https://github.com/username/repository"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <span>Start Analysis</span>
                )}
              </button>
            </div>
            {repoUrl && !isAnalyzing && (
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Press Enter or click Start Analysis to begin
              </p>
            )}
          </div>

          {/* Recent Analyses Section */}
          <div className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Recent Analyses
            </h3>
            <div className="space-y-2">
              {repositories.map((repo) => (
                <div 
                  key={repo.id} 
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
                >
                  <span className="font-medium text-gray-900 dark:text-gray-100 break-all">
                    {repo.name}
                  </span>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1">
                    <span>View Report</span>
                    <span>→</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Section - Optional */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
              💡 Tips for better analysis
            </h4>
            <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Use public GitHub repository URLs</li>
              <li>• Make sure the repository contains code files</li>
              <li>• Analysis typically takes 30-60 seconds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeContent;