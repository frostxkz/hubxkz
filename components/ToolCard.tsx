
import React from 'react';
import type { AITool } from '../types';
import AIToolIcon from './AIToolIcon';

interface ToolCardProps {
  tool: AITool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <a 
      href={tool.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <AIToolIcon iconKey={tool.icon} />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 group-hover:text-indigo-400 transition-opacity duration-300 opacity-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      <div className="flex-grow">
        <h3 className="text-xl font-bold text-slate-100 mb-2">{tool.name}</h3>
        <p className="text-slate-400 text-sm mb-4">{tool.summary}</p>
      </div>
      
       <div className="mt-auto pt-4 border-t border-slate-700/50">
          <span className="inline-block bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full">
            {tool.category || 'Geral'}
          </span>
       </div>
    </a>
  );
};

export default ToolCard;
