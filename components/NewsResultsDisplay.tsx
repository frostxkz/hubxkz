import React from 'react';
import type { NewsResult } from '../types';

interface NewsResultsDisplayProps {
  result: NewsResult;
}

const NewsResultsDisplay: React.FC<NewsResultsDisplayProps> = ({ result }) => {
  return (
    <div className="w-full animate-fade-in bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg p-6 sm:p-8">
      
      {/* Summary Section */}
      <div className="mb-8">
         <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Resumo das Notícias
         </h2>
         <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{result.summary}</p>
      </div>

      {/* Sources Section */}
      {result.sources.length > 0 && (
        <div className="pt-6 border-t border-slate-700">
          <h3 className="text-xl font-semibold text-slate-200 mb-4">Fontes</h3>
          <ul className="space-y-3">
            {result.sources.map((source, index) => (
              <li key={index}>
                <a 
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="group-hover:underline">{source.title || source.uri}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NewsResultsDisplay;
