import React, { useState } from 'react';
import { AISearchInterpreterModal } from '../components/AISearchInterpreterModal';
import { AIInterpretationResult } from '../services/aiService';
import { ImageDoctorFinder } from '../components/ImageDoctorFinder';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
  onApplySearchPreferences: (pref: AIInterpretationResult) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentTab, onApplySearchPreferences }) => {
  const [queryInput, setQueryInput] = useState<string>('');
  const [showInterpreter, setShowInterpreter] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const openProblemAssistant = () => {
    setQueryInput('I have a health problem and need help choosing a doctor.');
    setShowInterpreter(true);
  };

  const samplePrompts = [
    "I need a female dermatologist tomorrow evening.",
    "I have a rash and itchy skin.",
    "My child has a fever and needs a doctor.",
    "I have frequent headaches and need a doctor."
  ];

  const handleMicClick = () => {
    setIsListening(true);
    setQueryInput("Listening for your request...");
    setTimeout(() => {
      setQueryInput("I need a female dermatologist tomorrow evening.");
      setIsListening(false);
    }, 2000);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;
    setShowInterpreter(true);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-gradient-to-b from-teal-50/80 via-white to-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-teal-100/80 text-teal-800 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
            <i className="fa-solid fa-sparkles text-teal-600"></i>
            <span>AI-Assisted Healthcare Navigation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How can we help you today?
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            Find the right care, doctor and time without the long queue.
          </p>

          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto mb-6">
            <div className="flex items-center bg-white rounded-2xl shadow-xl shadow-teal-900/5 border-2 border-teal-500/80 p-2 focus-within:ring-4 focus-within:ring-teal-100 transition-all">
              <div className="pl-4 text-teal-600">
                <i className="fa-solid fa-magnifying-glass text-lg"></i>
              </div>
              <input 
                type="text" 
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Describe what you need e.g., 'I need a female dermatologist tomorrow evening'..." 
                className="w-full px-4 py-3 text-slate-800 placeholder-slate-400 bg-transparent outline-none text-base"
              />
              <div className="flex items-center space-x-2 pr-1">
                <button 
                  type="button" 
                  onClick={handleMicClick}
                  title="Voice input"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isListening ? 'bg-red-500 text-white animate-bounce' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  <i className="fa-solid fa-microphone"></i>
                </button>
                <button 
                  type="submit" 
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md shadow-teal-600/20 text-sm whitespace-nowrap"
                >
                  Find Care
                </button>
              </div>
            </div>
          </form>

          <div className="text-left max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Try asking:</span>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((prompt, idx) => (
                <button 
                  key={idx}
                  onClick={() => setQueryInput(prompt)}
                  className="text-xs bg-slate-100 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-200 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl transition-all"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <ImageDoctorFinder onApply={onApplySearchPreferences} />
        <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div onClick={() => setCurrentTab('doctors')} className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <i className="fa-solid fa-user-doctor text-xl"></i>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Find a Doctor</h3>
            <p className="text-sm text-slate-500">Browse verified specialists, check availability, and book instantly.</p>
          </div>

          <div onClick={() => setCurrentTab('services')} className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <i className="fa-solid fa-stethoscope text-xl"></i>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Find a Service</h3>
            <p className="text-sm text-slate-500">Explore medical checks, diagnostics, therapies, and specialty care.</p>
          </div>

          <div onClick={openProblemAssistant} className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <i className="fa-solid fa-comment-medical text-xl"></i>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Describe My Problem</h3>
            <p className="text-sm text-slate-500">Describe your symptoms and our local NLP assistant will suggest the most relevant specialty.</p>
          </div>

          <div onClick={() => setCurrentTab('hospitals')} className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <i className="fa-solid fa-hospital text-xl"></i>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Find Nearby Hospitals</h3>
            <p className="text-sm text-slate-500">Discover nearby medical centers, distances, and doctors on duty.</p>
          </div>
        </div>
      </div>

      {showInterpreter && (
        <AISearchInterpreterModal 
          initialQuery={queryInput}
          onCancel={() => setShowInterpreter(false)}
          onApplyInterpretation={(pref) => {
            setShowInterpreter(false);
            onApplySearchPreferences(pref);
          }}
        />
      )}
    </div>
  );
};