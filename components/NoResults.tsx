
import React from 'react';

const NoResults: React.FC = () => {
  return (
    <div className="text-center text-slate-500 mt-16 animate-fade-in">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      <h3 className="mt-4 text-xl font-semibold text-slate-500">Nenhuma ferramenta encontrada</h3>
      <p className="mt-1">Tente refinar sua busca com termos diferentes ou mais gerais.</p>
    </div>
  );
};

export default NoResults;
