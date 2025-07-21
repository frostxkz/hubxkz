
import React from 'react';

const InitialState: React.FC = () => {
  return (
    <div className="text-center text-slate-500 mt-16 animate-fade-in">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      <h3 className="mt-4 text-xl font-semibold text-slate-600">Aguardando sua ideia</h3>
      <p className="mt-1">Os resultados da sua busca aparecerão aqui.</p>
    </div>
  );
};

export default InitialState;
