import React from 'react';
import type { ComparisonResult } from '../types';

interface ComparisonTableProps {
  result: ComparisonResult;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ result }) => {
  return (
    <div className="w-full animate-fade-in bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg p-6 sm:p-8">
      
      {/* Summary Section */}
      <div className="mb-8 p-5 bg-slate-900/50 rounded-lg border border-slate-700">
         <h2 className="text-2xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Resumo da Análise
         </h2>
         <p className="text-slate-300 text-center">{result.summary}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-600">
              <th className="w-1/4 p-4 text-left text-sm font-bold uppercase text-slate-400">Característica</th>
              <th className="w-3/8 p-4 text-left text-sm font-bold uppercase text-indigo-300">{result.model_a_name}</th>
              <th className="w-3/8 p-4 text-left text-sm font-bold uppercase text-cyan-300">{result.model_b_name}</th>
            </tr>
          </thead>
          <tbody>
            {result.comparison.map((criterion, index) => (
              <tr key={index} className="border-b border-slate-700/50 last:border-b-0 hover:bg-slate-800/40 transition-colors duration-200">
                <td className="p-4 font-semibold text-slate-300 align-top">{criterion.feature}</td>
                <td className="p-4 text-slate-400 align-top whitespace-pre-wrap">{criterion.model_a_details}</td>
                <td className="p-4 text-slate-400 align-top whitespace-pre-wrap">{criterion.model_b_details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
