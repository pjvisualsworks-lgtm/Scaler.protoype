
import React from 'react';

interface EvaluationResultProps {
  evaluation: string;
  onBack: () => void;
}

export const EvaluationResult: React.FC<EvaluationResultProps> = ({ evaluation, onBack }) => {
  const lines = evaluation.split('\n');
  
  const getSection = (marker: string) => {
    const startIndex = lines.findIndex(l => l.trim().toLowerCase().startsWith(marker.toLowerCase()));
    if (startIndex === -1) return null;
    
    let content = [];
    for (let i = startIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('Marks:') || 
          line.startsWith('Correct Points:') || 
          line.startsWith('Missing / Incorrect Points:') || 
          line.startsWith('Suggested Writing Approach:') || 
          line.startsWith('Suggested Model Answer:') || 
          line.startsWith('Examiner Tips:')) {
        break;
      }
      content.push(lines[i]);
    }
    return content.join('\n').trim();
  };

  const marks = evaluation.match(/Marks: (\d\.?\d?\/5)/i)?.[1] || "N/A";
  const correctPoints = getSection('Correct Points:');
  const missingPoints = getSection('Missing / Incorrect Points:');
  const suggestedApproach = getSection('Suggested Writing Approach:');
  const suggestedAnswer = getSection('Suggested Model Answer:');
  const tips = getSection('Examiner Tips:');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-500 hover:text-indigo-600 transition-colors group"
        >
          <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          <span className="text-sm font-bold uppercase tracking-wider">New Evaluation</span>
        </button>
        <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-tighter text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
          <i className="fas fa-shield-halved"></i>
          <span>CBSE Marking Logic Active</span>
        </div>
      </div>

      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border-t-8 border-indigo-900">
        <div className="bg-slate-50 border-b border-slate-200 p-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-2xl font-black text-slate-800 uppercase">Assessment Report</h2>
            <p className="text-slate-500 text-sm font-medium italic">Strict CBSE Class 10 Marking Protocol</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Final Score</span>
            <div className="bg-indigo-900 text-white w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black shadow-lg border-4 border-amber-400">
              {marks}
            </div>
          </div>
        </div>

        <div className="p-8 space-y-10">
          {/* Points Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                  <i className="fas fa-check"></i>
                </div>
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Marks Earned</h3>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">
                {correctPoints || "No credit-worthy points identified."}
              </div>
            </section>

            <section>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center">
                  <i className="fas fa-times"></i>
                </div>
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Deductions (Missing Keywords)</h3>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">
                {missingPoints || "No significant deductions."}
              </div>
            </section>
          </div>

          {/* Suggested Approach */}
          {suggestedApproach && (
            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
                  <i className="fas fa-project-diagram"></i>
                </div>
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Suggested Writing Approach</h3>
              </div>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap text-sm font-medium">
                {suggestedApproach}
              </div>
            </section>
          )}

          {/* Suggested Model Answer */}
          <section className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center">
                <i className="fas fa-medal"></i>
              </div>
              <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Suggested Model Answer</h3>
            </div>
            <div className="bg-white p-6 border-l-4 border-indigo-600 rounded shadow-sm">
              <div className="prose prose-indigo max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap font-serif">
                {suggestedAnswer || "No suggested answer provided."}
              </div>
            </div>
            <p className="mt-4 text-[10px] text-indigo-400 uppercase font-black tracking-widest text-center">Reference this structure for 5/5 in Board Exams</p>
          </section>

          {/* Tips */}
          <section className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Examiner Tips</h3>
            </div>
            <div className="prose prose-slate max-w-none text-amber-900 leading-relaxed whitespace-pre-wrap font-medium italic text-sm">
              {tips || "No additional tips provided."}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
