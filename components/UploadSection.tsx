import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Briefcase, Building2, FileText, X, ChevronRight } from 'lucide-react';
import { UserInput } from '../types';

interface UploadSectionProps {
  onSubmit: (data: UserInput) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [industry, setIndustry] = useState('');
  const [position, setPosition] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      alert("Please upload a PDF file.");
      return;
    }
    setFile(selectedFile);
    
    // Convert to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileBase64(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = () => {
    if (file && fileBase64 && industry && position) {
      onSubmit({ file, fileBase64, industry, position });
    }
  };

  const isReady = file && industry.length > 2 && position.length > 2;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl glass-panel p-8 rounded-3xl shadow-2xl border-t border-white/10 relative overflow-hidden"
      >
        {/* Decorative Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />

        <h2 className="text-3xl font-bold mb-2 text-center">Upload Resume</h2>
        <p className="text-slate-400 text-center mb-8">Upload your PDF and tell us about your target role.</p>

        <div className="space-y-6 relative z-10">
          
          {/* Upload Zone */}
          <div
            className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer ${
              isDragging ? 'border-violet-400 bg-violet-500/10' : 'border-slate-700 hover:border-slate-500 hover:bg-white/5'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="application/pdf"
              onChange={handleFileSelect}
            />

            <AnimatePresence mode="wait">
              {!file ? (
                <motion.div
                  key="upload-prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 mb-4 bg-slate-800 rounded-full flex items-center justify-center text-violet-400">
                    <UploadCloud size={32} />
                  </div>
                  <p className="text-lg font-medium text-slate-200">Click or drag PDF here</p>
                  <p className="text-sm text-slate-500 mt-1">Maximum file size 5MB</p>
                </motion.div>
              ) : (
                <motion.div
                  key="file-preview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex items-center justify-between bg-slate-800/50 p-4 rounded-xl border border-slate-700"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400">
                      <FileText size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-200 truncate max-w-[200px]">{file.name}</p>
                      <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                    className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Building2 size={16} /> Target Industry
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Tech, Finance, Healthcare"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-white placeholder-slate-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Briefcase size={16} /> Target Position
              </label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="e.g. Senior Product Designer"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-white placeholder-slate-600"
              />
            </div>
          </div>

          <motion.button
            onClick={handleSubmit}
            disabled={!isReady}
            className={`w-full mt-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
              isReady 
                ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg hover:shadow-violet-500/25 hover:scale-[1.02]' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
            whileTap={isReady ? { scale: 0.98 } : {}}
          >
            Start AI Analysis
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </motion.div>

      <div className="mt-8 text-center text-slate-600 text-sm">
        <p>Made by CARL BENEDICT ELIPAN</p>
      </div>
    </div>
  );
};

export default UploadSection;