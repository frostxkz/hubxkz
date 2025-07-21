
import React from 'react';

interface ExamplePromptsProps {
  onPromptClick: (prompt: string) => void;
}

const prompts = [
  "IA para criar logos",
  "IA para gerar vídeos a partir de texto",
  "IA para resumir artigos longos",
  "IA para me ajudar a programar",
];

const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onPromptClick }) => {
  return (
    <div className="w-full max-w-2xl mt-4 flex flex-wrap items-center justify-center gap-2 px-4">
        <span className="text-sm text-slate-400 mr-2">Tente por exemplo:</span>
        {prompts.map((prompt) => (
            <button
            key={prompt}
            onClick={() => onPromptClick(prompt)}
            className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm text-slate-300 hover:bg-slate-700 hover:border-indigo-600 transition-all duration-200"
            >
            {prompt}
            </button>
        ))}
    </div>
  );
};

export default ExamplePrompts;
