
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-indigo-900 text-white shadow-lg border-b-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-lg text-indigo-900">
            <i className="fas fa-graduation-cap text-2xl"></i>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase">Board Examiner</h1>
            <p className="text-[10px] sm:text-xs font-medium text-indigo-200 uppercase tracking-widest leading-none">Class 10 CBSE Strict Protocol</p>
          </div>
        </div>
      </div>
    </header>
  );
};
