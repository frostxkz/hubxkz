
import React from 'react';
import type { UltraDorkExecutionResult, FoundDataPoint } from '../types';

const SourceLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const DataPointCard: React.FC<{ point: FoundDataPoint }> = ({ point }) => (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 transition-all duration-300 hover:border-green-600/70 hover:shadow-lg">
        <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs font-semibold rounded-full">
                {point.tipo_de_dado}
            </span>
            {point.fonte?.uri && (
                 <a 
                  href={point.fonte.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors duration-200 text-sm"
                >
                  <SourceLinkIcon />
                  <span className="group-hover:underline">{point.fonte.title || 'Ver fonte'}</span>
                </a>
            )}
        </div>
        <div>
            <pre className="bg-slate-900 p-4 rounded-md text-sm text-slate-300 overflow-x-auto whitespace-pre-wrap">
                <code>{point.conteudo}</code>
            </pre>
        </div>
    </div>
);


const UltraDorkResultsDisplay: React.FC<{ result: UltraDorkExecutionResult }> = ({ result }) => {
  return (
    <div className="w-full max-w-3xl animate-fade-in bg-slate-900/50 border border-green-700/50 rounded-xl shadow-lg p-6 sm:p-8">
      
      {/* Header Section */}
      <div className="mb-8 text-center border-b border-green-700/30 pb-6">
         <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400">
            Relatório da Investigação
         </h2>
         <div className="text-left bg-slate-800/70 p-3 rounded-md mt-4">
            <p className="text-sm text-slate-400">Dork Utilizado:</p>
            <p className="font-mono text-green-300">{result.final_dork_used}</p>
         </div>
         <p className="text-slate-300 max-w-3xl mx-auto mt-4">{result.investigation_summary}</p>
      </div>

      {/* Data Points Section */}
      <div className="pt-6">
        <h3 className="text-2xl font-bold text-slate-100 mb-5 text-center sm:text-left">Dados Encontrados:</h3>
        {result.data_points && result.data_points.length > 0 ? (
            <div className="space-y-6">
                {result.data_points.map((point, index) => (
                    <DataPointCard key={index} point={point} />
                ))}
            </div>
        ) : (
            <div className="text-center text-slate-500 py-10">
                <p>Nenhum ponto de dado específico foi extraído para esta consulta.</p>
                 <p className="text-sm mt-1">Tente refinar o dork ou o objetivo da busca.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default UltraDorkResultsDisplay;
