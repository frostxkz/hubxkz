import React from 'react';
import type { ScamGuideResult, ScamGuideStep } from '../types';

const ToolsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
    </svg>
);

const KeyConsiderationsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a4 4 0 100 8 4 4 0 000-8zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);

const ScamStepCard: React.FC<{ step: ScamGuideStep }> = ({ step }) => (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 transition-all duration-300 hover:border-purple-600/70 hover:shadow-lg">
        <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-900/50 border border-purple-700/50 rounded-full flex items-center justify-center font-bold text-xl text-purple-300">
                {step.passo}
            </div>
            <h4 className="text-xl font-bold text-slate-100 mt-2">{step.titulo}</h4>
        </div>
        <div className="space-y-4 pl-2">
            <div>
                <h5 className="font-semibold text-slate-300 mb-2">Descrição Operacional:</h5>
                <p className="text-slate-400 whitespace-pre-wrap text-sm leading-relaxed border-l-2 border-slate-600 pl-4">{step.descricao_operacional}</p>
            </div>
             {step.ferramentas_necessarias && (
                 <div>
                    <h5 className="font-semibold text-slate-300 mb-2 flex items-center gap-2">
                        <ToolsIcon />
                        Ferramentas Necessárias:
                    </h5>
                    <p className="text-cyan-400/90 whitespace-pre-wrap text-sm leading-relaxed border-l-2 border-cyan-500 pl-4">{step.ferramentas_necessarias}</p>
                </div>
            )}
            {step.consideracoes_chave && (
                <div>
                    <h5 className="font-semibold text-slate-300 mb-2 flex items-center gap-2">
                       <KeyConsiderationsIcon />
                        Considerações Chave:
                    </h5>
                    <p className="text-purple-400/90 whitespace-pre-wrap text-sm leading-relaxed border-l-2 border-purple-500 pl-4">{step.consideracoes_chave}</p>
                </div>
            )}
        </div>
    </div>
);


const ScamGuideResultsDisplay: React.FC<{ result: ScamGuideResult }> = ({ result }) => {
  return (
    <div className="w-full animate-fade-in bg-slate-900/50 border border-purple-700/50 rounded-xl shadow-lg p-6 sm:p-8">
      
      <div className="mb-8 text-center">
         <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-500">
            Manual Operacional: {result.titulo_da_operacao}
         </h2>
         <p className="text-lg text-slate-300 max-w-3xl mx-auto">{result.resumo_executivo}</p>
      </div>

      <div className="mb-10 pt-6 border-t border-slate-700">
        <h3 className="text-2xl font-bold text-slate-100 mb-5 text-center sm:text-left">Procedimento Detalhado:</h3>
        <div className="space-y-6">
            {result.passo_a_passo_detalhado.map((step) => (
                <ScamStepCard key={step.passo} step={step} />
            ))}
        </div>
      </div>

      {result.fontes_e_referencias.length > 0 && (
        <div className="pt-6 border-t border-slate-700">
          <h3 className="text-xl font-semibold text-slate-200 mb-4">Fontes e Referências</h3>
          <ul className="space-y-3">
            {result.fontes_e_referencias.map((source, index) => (
              <li key={index}>
                <a 
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-purple-400 hover:text-purple-300 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="group-hover:underline text-sm truncate max-w-full">{source.title || source.uri}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ScamGuideResultsDisplay;
