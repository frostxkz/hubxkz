import React from 'react';
import type { RedTeamResult, AttackStep, ToolResource } from '../types';

interface RedTeamResultsDisplayProps {
  result: RedTeamResult;
}

const AttackStepCard: React.FC<{ step: AttackStep; index: number }> = ({ step, index }) => (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 transition-all duration-300 hover:border-red-600/70 hover:shadow-lg">
        <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-900/50 border border-red-700/50 rounded-full flex items-center justify-center font-bold text-xl text-red-300">
                {index + 1}
            </div>
            <div>
                <p className="text-sm font-semibold uppercase text-red-400">{step.tatica}</p>
                <h4 className="text-lg font-bold text-slate-200">{step.tecnica}</h4>
            </div>
        </div>
        <div>
            <h5 className="font-semibold text-slate-300 mb-2">Descrição Operacional:</h5>
            <p className="text-slate-400 whitespace-pre-wrap text-sm leading-relaxed mb-4">{step.descricao_operacional}</p>
            <h5 className="font-semibold text-slate-300 mb-2">Mitigações e Detecção:</h5>
            <p className="text-slate-400 whitespace-pre-wrap text-sm leading-relaxed">{step.mitigacoes}</p>
        </div>
    </div>
);


const RedTeamResultsDisplay: React.FC<RedTeamResultsDisplayProps> = ({ result }) => {
  return (
    <div className="w-full animate-fade-in bg-slate-900/50 border border-red-700/50 rounded-xl shadow-lg p-6 sm:p-8">
      
      {/* Header Section */}
      <div className="mb-8 text-center">
         <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
            Análise da Cadeia de Ataque
         </h2>
         <p className="text-lg text-slate-300 font-semibold">Objetivo: <span className="font-normal">{result.objetivo}</span></p>
      </div>

      {/* Attack Chain Section */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-slate-200 mb-5 text-center sm:text-left">Passos da Campanha:</h3>
        <div className="space-y-6">
            {result.cadeia_de_ataque.map((step, index) => (
                <AttackStepCard key={index} step={step} index={index} />
            ))}
        </div>
      </div>

      {/* Tools and Resources Section */}
       {result.ferramentas_e_recursos.length > 0 && (
        <div className="mb-10 pt-6 border-t border-slate-700">
          <h3 className="text-xl font-semibold text-slate-200 mb-4">Ferramentas e Recursos</h3>
          <ul className="space-y-3">
            {result.ferramentas_e_recursos.map((tool, index) => (
              <li key={index} className="bg-slate-800/50 p-3 rounded-md">
                <p className="font-bold text-red-400">{tool.nome}</p>
                <p className="text-slate-400 text-sm">{tool.descricao}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* References Section */}
      {result.referencias.length > 0 && (
        <div className="pt-6 border-t border-slate-700">
          <h3 className="text-xl font-semibold text-slate-200 mb-4">Referências</h3>
          <ul className="space-y-3">
            {result.referencias.map((ref, index) => (
              <li key={index}>
                <a 
                  href={ref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span className="group-hover:underline text-sm truncate max-w-full">{ref}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RedTeamResultsDisplay;
