
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="w-16 h-16 border-4 border-t-4 border-t-indigo-500 border-slate-700 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-400">Analisando o universo das IAs...</p>
    </div>
  );
};

export default Loader;
