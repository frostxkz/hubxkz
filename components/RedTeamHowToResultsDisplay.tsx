import React from 'react';
import type { RedTeamHowToResult, HowToStep } from '../types';

// Using a custom SVG icon for OPSEC
const OpsecIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
    </svg>
);

const HowToStepCard: React.FC<{ step: HowToStep }> = ({ step }) => (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 transition-all duration-300 hover:border-orange-600/70 hover:shadow-lg">
        <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-900/50 border border-orange-700/50 rounded-full flex items-center justify-center font-bold text-xl text-orange-300">
                {step.passo}
            </div>
            <h4 className="text-xl font-bold text-slate-100">{step.titulo}</h4>
        </div>
        <div className="space-y-4">
            <div>
                <h5 className="font-semibold text-slate-300 mb-2">Descrição Detalhada:</h5>
                <p className="text-slate-400 whitespace-pre-wrap text-sm leading-relaxed">{step.descricao_detalhada}</p>
            </div>
            {step.comandos_exemplos && step.comandos_exemplos.trim() !== "" && step.comandos_exemplos.toLowerCase() !== "n/a" && (
                <div>
                    <h5 className="font-semibold text-slate-300 mb-2">Comandos / Exemplos:</h5>
                    <pre className="bg-slate-900 p-4 rounded-md text-sm text-cyan-300 overflow-x-auto">
                        <code>{step.comandos_exemplos}</code>
                    </pre>
                </div>
            )}
            <div>
                <h5 className="font-semibold text-slate-300 mb-2 flex items-center gap-2">
                    <OpsecIcon />
                    Considerações de OPSEC:
                </h5>
                <p className="text-amber-400/80 whitespace-pre-wrap text-sm leading-relaxed border-l-2 border-amber-500 pl-4">{step.consideracoes_opsec}</p>
            </div>
        </div>
    </div>
);


const RedTeamHowToResultsDisplay: React.FC<{ result: RedTeamHowToResult }> = ({ result }) => {
  return (
    <div className="w-full animate-fade-in bg-slate-900/50 border border-orange-700/50 rounded-xl shadow-lg p-6 sm:p-8">
      
      {/* Header Section */}
      <div className="mb-8 text-center">
         <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
            Guia Operacional: {result.tecnica_alvo}
         </h2>
         <p className="text-lg text-slate-300 max-w-3xl mx-auto">{result.resumo_operacional}</p>
      </div>

       {/* Tools and Resources Section */}
       {result.ferramentas_recomendadas.length > 0 && (
        <div className="mb-10 pt-6 border-t border-slate-700">
          <h3 className="text-xl font-semibold text-slate-200 mb-4">Ferramentas Recomendadas</h3>
          <ul className="space-y-3">
            {result.ferramentas_recomendadas.map((tool, index) => (
              <li key={index} className="bg-slate-800/50 p-3 rounded-md">
                <p className="font-bold text-orange-400">{tool.nome}</p>
                <p className="text-slate-400 text-sm">{tool.descricao}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Step-by-step Section */}
      <div className="mb-10 pt-6 border-t border-slate-700">
        <h3 className="text-2xl font-bold text-slate-100 mb-5 text-center sm:text-left">Passo a Passo:</h3>
        <div className="space-y-6">
            {result.passo_a_passo.map((step) => (
                <HowToStepCard key={step.passo} step={step} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RedTeamHowToResultsDisplay;
