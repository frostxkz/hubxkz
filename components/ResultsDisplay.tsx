
import React from 'react';
import type { AITool } from '../types';
import ToolCard from './ToolCard';

interface ResultsDisplayProps {
  tools: AITool[];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ tools }) => {
  if (tools.length === 0) {
    return null; // Don't render anything if there are no tools (e.g., after a search with no results)
  }

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-slate-300 mb-6 text-center">Ferramentas Encontradas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <ToolCard key={`${tool.name}-${index}`} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
