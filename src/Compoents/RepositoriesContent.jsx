import React from 'react';
import { GitBranchIcon, Eye, Trash2 } from 'lucide-react';

const RepositoriesContent = () => {
  const repositories = [
    {
      id: 1,
      name: 'ecommerce-platform',
      description: 'Modern e-commerce platform with React and Node.js',
      techStack: ['React', 'Node.js', 'MongoDB'],
      githubUrl: 'https://github.com/example/ecommerce-platform'
    },
    {
      id: 2,
      name: 'ai-ml-pipeline',
      description: 'Machine learning pipeline for data processing',
      techStack: ['Python', 'TensorFlow', 'FastAPI'],
      githubUrl: 'https://github.com/example/ai-ml-pipeline'
    },
    {
      id: 3,
      name: 'mobile-app-backend',
      description: 'Backend services for mobile application',
      techStack: ['Go', 'PostgreSQL', 'Redis'],
      githubUrl: 'https://github.com/example/mobile-app-backend'
    }
  ];

  return (
    <div className="min-h-[93vh] bg-white dark:bg-black p-4 sm:p-6 transition-colors">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
        All Repositories
      </h2>
      <div className="space-y-4">
        {repositories.map((repo) => (
          <div key={repo.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
              <div className="flex-1">
                <a 
                  href={repo.githubUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-2"
                >
                  <GitBranchIcon size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="break-all">{repo.name}</span>
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 break-words">
                  {repo.description}
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-start sm:justify-end">
                <button className="px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors flex items-center gap-1">
                  <Eye size={14} />
                  <span>View Analysis</span>
                </button>
                <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors flex items-center gap-1">
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {repo.techStack.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepositoriesContent;