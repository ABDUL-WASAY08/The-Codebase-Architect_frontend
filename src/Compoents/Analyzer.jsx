import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, FileCode, Folder, 
  ChevronRight, ChevronDown, Terminal,
  Cpu, Zap, Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Analyzer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { files, fullName } = location.state || { files: [], fullName: "" };

  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);

  // File click handler
  const handleFileClick = async (path) => {
    setSelectedFile(path);
    setLoading(true);
    setAnalysisData(null);

    try {
      const [owner, repo] = fullName.split('/');
      const response = await api.post('/analyze-file', { owner, repo, path });
      
      if (response.data.success) {
        setAnalysisData(response.data);
      }
    } catch (error) {
      toast.error("Failed to analyze file");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-white overflow-hidden">
      
      {/* LEFT SIDEBAR: File List (Width: 1/4) */}
      <div className="w-80 border-r border-white/10 flex flex-col bg-[#0d0d0f]">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm font-semibold truncate ml-2 text-blue-400">
            {fullName.split('/')[1]}
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
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all group ${
                  selectedFile === file.path 
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

      {/* RIGHT MAIN SECTION: Analysis View (Width: 3/4) */}
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
                Choose any code file from the sidebar. Our AI will analyze the architecture, logic, and suggest improvements.
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

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-400 font-mono">Groq LPU is thinking...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8">
                  {/* Analysis Content Section */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-4 text-emerald-400">
                      <Cpu size={20} />
                      <span className="text-sm font-bold uppercase tracking-wider">AI Insights</span>
                    </div>
                    <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                      {/* Backend se jo analysis aayegi wo yahan display hogi */}
                      {analysisData?.analysis || "No analysis available for this file."}
                    </div>
                  </div>

                  {/* Code View (Future integration) */}
                  <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 overflow-hidden">
                     <div className="flex items-center gap-2 mb-4 text-blue-400">
                      <Code size={20} />
                      <span className="text-sm font-bold uppercase tracking-wider">Source Code</span>
                    </div>
                    <pre className="text-xs font-mono text-gray-400 overflow-x-auto">
                        {analysisData?.code || "Code content not loaded."}
                    </pre>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Analyzer;