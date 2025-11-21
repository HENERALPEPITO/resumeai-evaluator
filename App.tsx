import React, { useState } from 'react';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import LoadingScanner from './components/LoadingScanner';
import AnalysisResults from './components/AnalysisResults';
import { analyzeResumeWithGemini } from './services/geminiService';
import { AnalysisResult, UserInput } from './types';

type AppView = 'hero' | 'upload' | 'analyzing' | 'results';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('hero');
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);

  const handleStart = () => {
    setView('upload');
  };

  const handleUploadSubmit = async (data: UserInput) => {
    setView('analyzing');
    try {
      if (!data.fileBase64) throw new Error("File processing failed");
      
      const results = await analyzeResumeWithGemini(
        data.fileBase64,
        data.industry,
        data.position
      );
      
      setAnalysisData(results);
      setView('results');
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Failed to analyze resume. Please try again. ensure you are using a valid PDF.");
      setView('upload');
    }
  };

  const handleReset = () => {
    setAnalysisData(null);
    setView('upload');
  };

  return (
    <div className="antialiased text-slate-100 selection:bg-violet-500 selection:text-white">
      {view === 'hero' && <Hero onStart={handleStart} />}
      {view === 'upload' && <UploadSection onSubmit={handleUploadSubmit} />}
      {view === 'analyzing' && <LoadingScanner />}
      {view === 'results' && analysisData && (
        <AnalysisResults results={analysisData} onReset={handleReset} />
      )}
    </div>
  );
};

export default App;