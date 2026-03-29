import React, { useState } from 'react';
import {
  Code2,
  Home,
  GitBranch,
  BarChart3,
  Settings,
  User,
  ChevronDown,
  LogOut,
  GitBranchIcon,
  FolderGit2,
  Trash2,
  Eye,
  Send,
  Bot,
  Download,
  TrendingUp,
  Sparkles,
  Database,
  Zap
} from 'lucide-react';
import useUserStore from '../Store/userStore';
import {useNavigate} from "react-router-dom"
import {toast} from "react-hot-toast"
const MainScreen = () => {
  const navigate=useNavigate();
  const [activeSidebar, setActiveSidebar] = useState('Dashboard');
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {logout}=useUserStore();
  //functions
  const hanndleLogout =()=>{
    logout();
    navigate('/')
    toast.success('Logout successfully')
  }
  // Sample repositories data
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

  // Sample chat messages
  const [chatMessages] = useState([
    {
      id: 1,
      type: 'user',
      message: 'Where is the payment logic implemented?',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      type: 'ai',
      message: 'Based on the code analysis, the payment logic is primarily located in:\n\n• src/services/payment/PaymentService.ts (handles payment processing)\n• src/controllers/PaymentController.js (API endpoints)\n• src/models/Transaction.js (data models)\n\nThe payment integration uses Stripe SDK and includes validation, error handling, and webhook listeners for payment events.',
      timestamp: '10:31 AM'
    }
  ]);

  const sidebarItems = [
    { name: 'Dashboard', icon: Home },
    { name: 'Repositories', icon: FolderGit2 },
    { name: 'Analyze', icon: BarChart3 },
    { name: 'Settings', icon: Settings }
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

  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to The Codebase Architect
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl">
            Transform your codebase understanding with AI-powered insights. 
            Analyze repositories, get instant answers, and optimize your development workflow.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center gap-2">
              <TrendingUp size={20} />
              Get Started
            </button>
            <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
              Watch Demo
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
          <Code2 size={300} />
        </div>
      </div>

      {/* Repository List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Connected Repositories</h2>
          <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center gap-2">
            <GitBranchIcon size={18} />
            Add Repository
          </button>
        </div>
        <div className="space-y-4">
          {repositories.map((repo) => (
            <div key={repo.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <a 
                    href={repo.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-2"
                  >
                    <GitBranchIcon size={18} />
                    {repo.name}
                  </a>
                  <p className="text-gray-600 text-sm mt-1">{repo.description}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex gap-2">
                  {repo.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-gray-500">📁 {repo.files} files</div>
                <div className="text-gray-500">📝 {repo.linesOfCode} lines</div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-100 transition-colors">
                  View Analysis
                </button>
                <button className="text-sm text-red-600 hover:bg-red-50 px-3 py-1 rounded-md transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analyze Repository</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Paste GitHub repository URL..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center gap-2 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Analyzing...
              </>
            ) : (
              <>
                <BarChart3 size={18} />
                Analyze Repo
              </>
            )}
          </button>
          <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center gap-2">
            <GitBranch size={18} />
            Select from List
          </button>
        </div>
        {isAnalyzing && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
              <span className="text-blue-700">Processing repository data...</span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ask About Your Codebase</h2>
        <div className="bg-gray-50 rounded-lg p-4 mb-4 h-80 overflow-y-auto">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 mb-4 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.type === 'ai' && (
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={18} className="text-white" />
                </div>
              )}
              <div className={`max-w-[70%] ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'} rounded-lg p-3`}>
                <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                <span className={`text-xs mt-1 block ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
              {msg.type === 'user' && (
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={18} className="text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about your codebase..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center gap-2"
          >
            <Send size={18} />
            Send
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Enhance Your Experience</h3>
            <p className="text-blue-100 mb-4">
              Install our Chrome Extension for seamless GitHub integration and real-time code insights
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center gap-2">
              <Download size={20} />
              Download Chrome Extension
            </button>
          </div>
          <div className="flex gap-4">
            <Zap size={48} className="text-blue-200" />
            <Sparkles size={48} className="text-blue-200" />
            <Database size={48} className="text-blue-200" />
          </div>
        </div>
      </div>
    </div>
  );

  const RepositoriesContent = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">All Repositories</h2>
      <div className="space-y-4">
        {repositories.map((repo) => (
          <div key={repo.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <a href={repo.githubUrl} className="text-lg font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  <GitBranchIcon size={18} />
                  {repo.name}
                </a>
                <p className="text-gray-600 text-sm mt-1">{repo.description}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">View Analysis</button>
                <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg">Delete</button>
              </div>
            </div>
            <div className="flex gap-2">
              {repo.techStack.map((tech, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AnalyzeContent = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analyze New Repository</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Repository URL</label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="https://github.com/username/repository"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Start Analysis</button>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Recent Analyses</h3>
          <div className="space-y-2">
            {repositories.map((repo) => (
              <div key={repo.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{repo.name}</span>
                <button className="text-blue-600 hover:text-blue-700">View Report →</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsContent = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Settings</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Theme Preference</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Light</option>
            <option>Dark</option>
            <option>System Default</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notification Preferences</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span>Email notifications for analysis completion</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span>Weekly summary of repository insights</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">API Key Management</label>
          <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Regenerate API Key
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeSidebar) {
      case 'Dashboard':
        return <DashboardContent />;
      case 'Repositories':
        return <RepositoriesContent />;
      case 'Analyze':
        return <AnalyzeContent />;
      case 'Settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Code2 className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">The Codebase Architect</span>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <User size={16} />
                    Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <Settings size={16} />
                    Settings
                  </button>
                  <hr className="my-1" />
                  <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50 flex items-center gap-2" onClick={hanndleLogout}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-16">
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSidebar === item.name;
              return (
                <div
                  key={item.name}
                  onClick={() => setActiveSidebar(item.name)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainScreen;