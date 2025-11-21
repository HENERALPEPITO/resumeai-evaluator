import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileCheck, ArrowRight, UserCheck } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-violet-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <span className="px-4 py-2 rounded-full glass-panel text-sm font-medium text-violet-300 border-violet-500/30 flex items-center gap-2">
            <Sparkles size={16} className="text-yellow-400" />
            Next-Gen Career AI
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-violet-200 tracking-tight"
        >
          Your Resume, <br />
          <span className="text-violet-400">Reinvented by AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Unlock your career potential with ResumeAI Evaluator. Get detailed scoring, 
          ATS analysis, and tailored rewriting suggestions instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={onStart}
            className="group relative px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 neon-glow hover:scale-105 flex items-center gap-2"
          >
            Analyze My Resume
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center gap-6 text-slate-500 mt-4 md:mt-0 md:ml-8">
            <div className="flex items-center gap-2">
              <FileCheck size={18} />
              <span className="text-sm">PDF Supported</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck size={18} />
              <span className="text-sm">ATS Ready</span>
            </div>
          </div>
        </motion.div>

        {/* Signature Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 border-t border-white/5 pt-8"
        >
          <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold">
            Made by
          </p>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-bold text-lg mt-1">
            CARL BENEDICT ELIPAN
          </p>
        </motion.div>
      </div>

      {/* Floating Particles - Decorative */}
      <FloatingIcon icon={<FileCheck />} x="-30vw" y="-20vh" delay={0} />
      <FloatingIcon icon={<Sparkles />} x="35vw" y="10vh" delay={2} />
      <FloatingIcon icon={<UserCheck />} x="-25vw" y="30vh" delay={4} />
    </div>
  );
};

const FloatingIcon = ({ icon, x, y, delay }: { icon: React.ReactNode, x: string, y: string, delay: number }) => (
  <motion.div
    className="absolute text-violet-500/20 z-0"
    initial={{ x, y, opacity: 0 }}
    animate={{ 
      y: [y, `calc(${y} - 20px)`, y],
      opacity: 1 
    }}
    transition={{ 
      y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
      opacity: { duration: 1, delay }
    }}
  >
    {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 48 }) : null}
  </motion.div>
);

export default Hero;