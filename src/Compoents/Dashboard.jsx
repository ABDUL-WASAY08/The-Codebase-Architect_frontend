import React, { useState } from 'react';
import { 
  Code2, TrendingUp, GitBranchIcon, Trash2, Eye, Bot, User, 
  Send, Download, Zap, Sparkles, Database, BarChart3, GitBranch 
} from 'lucide-react';

const DashboardContent = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const repositories = [
    {
      id: 1,
      name: 'ecommerce-platform',
      description: 'Modern e-commerce platform with React and Node.js',
      techStack: ['React', 'Node.js', 'MongoDB'],
      files: 245,
      linesOfCode: '12.5k',
      githubUrl: 'https://github.com/example/ecommerce-platform'
    },
    {
      id: 2,
      name: 'ai-ml-pipeline',
      description: 'Machine learning pipeline for data processing',
      techStack: ['Python', 'TensorFlow', 'FastAPI'],
      files: 189,
      linesOfCode: '8.2k',
      githubUrl: 'https://github.com/example/ai-ml-pipeline'
    },
    {
      id: 3,
      name: 'mobile-app-backend',
      description: 'Backend services for mobile application',
      techStack: ['Go', 'PostgreSQL', 'Redis'],
      files: 312,
      linesOfCode: '15.8k',
      githubUrl: 'https://github.com/example/mobile-app-backend'
    }
  ];


  const handleAnalyze = () => {
    if (!repoUrl) return;
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Hero Section */}
      <div className="bg-white dark:bg-black rounded-xl shadow-sm  p-6 sm:p-8 relative overflow-hidden transition-colors mb-6">
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Welcome to The Codebase Architect
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 max-w-2xl">
            Transform your codebase understanding with AI-powered insights.
            Analyze repositories, get instant answers, and optimize your development workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2">
              <TrendingUp size={18} className="sm:w-5 sm:h-5" />
              <span>Get Started</span>
            </button>
            <button className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 font-medium flex items-center justify-center gap-2">
              Watch Demo
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10 dark:opacity-5 text-gray-900 dark:text-white">
          <Code2 size={200} className="sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px]" />
        </div>
      </div>

      {/* Repository List */}
      <div className="bg-white dark:bg-black  p-4 sm:p-6 transition-colors">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
            Connected Repositories
          </h2>
          <button className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 font-medium flex items-center gap-2 w-full sm:w-auto justify-center">
            <GitBranchIcon size={18} />
            <span>Add Repository</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {repositories.map((repo) => (
            <div key={repo.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
                <div className="flex-1">
                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-2"
                  >
                    <GitBranchIcon size={16} className="sm:w-[18px] sm:h-[18px]" />
                    {repo.name}
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{repo.description}</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 text-sm mb-3">
                <div className="flex flex-wrap gap-2">
                  {repo.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-gray-500 dark:text-gray-400">📁 {repo.files} files</div>
                <div className="text-gray-500 dark:text-gray-400">📝 {repo.linesOfCode} lines</div>
              </div>
              
              <div className="flex gap-2">
                <button className="text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                  View Analysis
                </button>
                <button className="text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-md transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Section */}
      <div className="bg-white dark:bg-black  p-4 sm:p-6 transition-colors">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Analyze Repository
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Paste GitHub repository URL..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <BarChart3 size={18} />
                <span>Analyze Repo</span>
              </>
            )}
          </button>
          <button className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 font-medium flex items-center justify-center gap-2">
            <GitBranch size={18} />
            <span>Select from List</span>
          </button>
        </div>
        {isAnalyzing && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
              <span className="text-blue-700 dark:text-blue-300">Processing repository data...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;