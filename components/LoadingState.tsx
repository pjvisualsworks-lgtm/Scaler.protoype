
import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "Analyzing keywords...",
  "Consulting CBSE Marking Scheme...",
  "Scanning for conceptual clarity...",
  "Verifying technical terminology...",
  "Finalizing marks breakdown..."
];

export const LoadingState: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-xl border border-slate-200">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
          <i className="fas fa-pen-nib text-xl"></i>
        </div>
      </div>
      <h3 className="mt-8 text-xl font-bold text-slate-800 uppercase tracking-widest animate-pulse">
        Evaluating Response
      </h3>
      <p className="mt-2 text-slate-500 font-medium">
        {MESSAGES[msgIndex]}
      </p>
    </div>
  );
};
