
import React from 'react';

type View = 'tools' | 'comparator' | 'news' | 'underground' | 'redteam' | 'redteamhowto' | 'scamguide' | 'persona' | 'message' | 'delicate' | 'ultradork';

interface ViewSwitcherProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ activeView, setActiveView }) => {
  const baseClasses = "flex-grow sm:flex-grow-0 px-2 py-2 text-sm sm:text-base sm:px-4 sm:py-2.5 font-semibold rounded-full focus:outline-none transition-all duration-300 whitespace-nowrap";
  const activeClasses = "bg-slate-200 text-slate-900 shadow-md";
  const inactiveClasses = "bg-slate-800 text-slate-300 hover:bg-slate-700";
  
  const views = [
    { id: 'tools', label: 'Buscar Ferramentas', style: '' },
    { id: 'comparator', label: 'Comparar Modelos', style: '' },
    { id: 'news', label: 'Últimas Notícias', style: '' },
    { id: 'underground', label: 'Busca Underground', style: 'bg-amber-600' },
    { id: 'delicate', label: 'Busca Delicada', style: 'bg-sky-800' },
    { id: 'ultradork', label: 'Ultra Dorks', style: 'bg-green-600' },
    { id: 'redteam', label: 'Modo Red Team', style: 'bg-red-600' },
    { id: 'redteamhowto', label: 'Modo How-To', style: 'bg-orange-600' },
    { id: 'persona', label: 'Gerador de Persona', style: 'bg-yellow-500' },
    { id: 'message', label: 'Gerar Mensagens', style: 'bg-teal-600' },
    { id: 'scamguide', label: 'Guia de Fraudes', style: 'bg-purple-600' },
  ] as const;

  const isActive = (viewId: View) => activeView === viewId;

  return (
    <div className="w-full max-w-6xl mx-auto my-6 p-1.5 bg-slate-800/70 rounded-full flex flex-wrap items-center justify-center gap-2">
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => setActiveView(view.id)}
          className={`${baseClasses} ${isActive(view.id) ? (view.style ? `${view.style} text-white shadow-lg` : activeClasses) : inactiveClasses}`}
          aria-pressed={isActive(view.id)}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
};

export default ViewSwitcher;
