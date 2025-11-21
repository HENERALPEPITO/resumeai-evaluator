import React from 'react';
import { motion } from 'framer-motion';
import { ScanLine, Cpu } from 'lucide-react';

const LoadingScanner: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Matrix-like grid background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="z-10 flex flex-col items-center">
        <div className="relative w-64 h-80 bg-slate-900/80 border border-slate-700 rounded-lg overflow-hidden shadow-2xl">
          
          {/* Resume document mock */}
          <div className="p-6 space-y-4 opacity-30">
            <div className="w-20 h-20 bg-slate-700 rounded-full mb-4" />
            <div className="h-4 bg-slate-700 w-3/4 rounded" />
            <div className="h-4 bg-slate-700 w-1/2 rounded" />
            <div className="h-2 bg-slate-700 w-full rounded mt-8" />
            <div className="h-2 bg-slate-700 w-full rounded" />
            <div className="h-2 bg-slate-700 w-5/6 rounded" />
            <div className="h-2 bg-slate-700 w-full rounded mt-4" />
            <div className="h-2 bg-slate-700 w-4/5 rounded" />
          </div>

          {/* Scanning Beam */}
          <motion.div
            className="absolute top-0 left-0 w-full h-2 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] z-20"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
          />
          
          {/* Scanning Overlay Gradient */}
          <motion.div 
             className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-transparent z-10"
             animate={{ height: ["0%", "100%", "0%"] }}
             transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
          />
        </div>

        <div className="mt-10 text-center space-y-3">
          <div className="flex items-center justify-center gap-3 text-cyan-400">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Cpu size={24} />
            </motion.div>
            <h3 className="text-xl font-bold font-mono tracking-wider">AI ANALYZING</h3>
          </div>
          <p className="text-slate-400 text-sm">Extracting keywords • Scoring structure • Calculating ATS match</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScanner;