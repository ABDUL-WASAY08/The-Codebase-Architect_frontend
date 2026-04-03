import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, FileCode, Terminal,
  Cpu, Zap, Code, MenuIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRepoStore } from '../Store/RepoStore';
import toast from 'react-hot-toast';
const Analyzer = () => {
  const navigate = useNavigate();
  const { files, owner, repoName, getFileContent, selectedFileContent, isLoading, storeLoading, GroqContent } = useRepoStore();

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openToggle, setOpenToggle] = useState(false);

  const handleFileClick = async (path) => {
    if (isLoading) return;
    setSelectedFile(path);
    setLoading(true);
    if (openToggle) setOpenToggle(false);
    try {
      await getFileContent(path);
    } catch (error) {
      toast.error("Failed to load file content");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white dark:bg-black'>
      <div className="flex h-screen bg-white dark:bg-black text-white overflow-hidden">
        <div className="hidden md:block w-80 border-r border-white/10 flex flex-col bg-[#0d0d0f]">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <span className="text-sm font-semibold truncate ml-2 text-blue-400">
              {repoName || "Project"}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
            <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 px-2 font-bold">
              Project Files
            </h3>
            <div className="space-y-1">
              {files.map((file) => (
                <button
                  key={file.path}
                  onClick={() => handleFileClick(file.path)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all group ${selectedFile === file.path
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                      : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                    }`}
                >
                  <FileCode size={16} className={selectedFile === file.path ? 'text-blue-400' : 'text-gray-500'} />
                  <span className="truncate text-left">{file.path.split('/').pop()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative bg-[#0a0a0c]">
          <AnimatePresence mode="wait">
            {!selectedFile ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mb-6 border border-blue-600/20">
                  <Terminal size={40} className="text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-white">Select a file to start</h2>
                <p className="text-gray-500 max-w-md">
                  Analyzing repository: <b>{owner}/{repoName}</b>. Choose a file to see the source code and AI insights.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedFile}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 overflow-y-auto p-6 lg:p-10"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <Zap size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedFile.split('/').pop()}</h2>
                    <p className="text-sm text-gray-500">{selectedFile}</p>
                  </div>
                </div>

                {loading || storeLoading ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-400 font-mono">Analyzing with Groq LPU...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-8">
                    <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 overflow-hidden">
                      <div className="flex items-center gap-2 mb-4 text-blue-400">
                        <Code size={20} />
                        <span className="text-sm font-bold uppercase tracking-wider">Source Code</span>
                      </div>
                      <pre className="text-xs font-mono text-gray-400 overflow-x-auto p-4 bg-black/50 rounded-lg border border-white/5 shadow-inner">
                        <code className="whitespace-pre">{selectedFileContent || "Code content not loaded."}</code>
                      </pre>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-4 text-emerald-400">
                        <Cpu size={20} />
                        <span className="text-sm font-bold uppercase tracking-wider">AI Analysis</span>
                      </div>
                      <div className="prose prose-invert max-w-none">
                        <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                          {GroqContent ? (
                            GroqContent
                          ) : (
                            <span className="text-gray-500 italic">No analysis available for this file.</span>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Controls for Mobile */}
      <div className="md:hidden fixed top-6 right-6 z-50 flex gap-2">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white border border-white/20"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => setOpenToggle(!openToggle)}
          className="bg-blue-600 p-3 rounded-full text-white shadow-lg flex items-center gap-2 px-4"
        >
          <span className="text-xs font-bold">FILES</span>
          <MenuIcon size={18} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {openToggle && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] w-full h-screen bg-[#0d0d0f] flex flex-col md:hidden"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <span className="text-sm font-semibold text-blue-400">
                {repoName}
              </span>
              <button
                onClick={() => setOpenToggle(false)}
                className="p-2 text-gray-400 hover:text-white font-bold"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 font-bold">
                Project Files
              </h3>
              <div className="space-y-2">
                {files.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => handleFileClick(file.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${selectedFile === file.path
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/5 text-gray-400'
                      }`}
                  >
                    <FileCode size={18} />
                    <span className="truncate">{file.path.split('/').pop()}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Analyzer;