import React, { useState, useEffect } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
  currentApiKey: string | null;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave, currentApiKey }) => {
  const [apiKeyInput, setApiKeyInput] = useState('');

  useEffect(() => {
    if (currentApiKey) {
      setApiKeyInput(currentApiKey);
    }
  }, [currentApiKey]);

  const handleSave = () => {
    if (apiKeyInput.trim()) {
      onSave(apiKeyInput.trim());
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      if(currentApiKey) { // Only allow closing if a key is already set
        onClose();
      }
    }
  };
  
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        onClick={handleOverlayClick}
        aria-modal="true"
        role="dialog"
    >
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-6 w-full max-w-lg mx-auto animate-fade-in-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-100">Configurar Chave de API</h2>
          {currentApiKey && ( // Only show close button if a key is already set
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">&times;</button>
          )}
        </div>
        <p className="text-slate-400 mb-4">
          Para usar este aplicativo, você precisa de uma chave de API do Google Gemini. Você pode obter uma gratuitamente no{' '}
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline hover:text-indigo-300">
            Google AI Studio
          </a>.
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="api-key" className="block text-sm font-medium text-slate-300 mb-2">
              Sua Chave de API do Gemini
            </label>
            <input
              id="api-key"
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Cole sua chave de API aqui"
              className="w-full px-4 py-3 bg-slate-900 border-2 border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300"
            />
          </div>
          <div className="flex justify-end gap-4">
             {currentApiKey && (
                 <button 
                    onClick={onClose}
                    className="px-5 py-2.5 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-500 transition-all"
                    >
                    Cancelar
                </button>
             )}
            <button 
                onClick={handleSave}
                className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/50"
            >
                Salvar Chave
            </button>
          </div>
        </div>
      </div>
       <style>{`
            @keyframes animate-fade-in-up {
                0% { opacity: 0; transform: translateY(20px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up {
                animation: animate-fade-in-up 0.3s ease-out forwards;
            }
        `}</style>
    </div>
  );
};

export default ApiKeyModal;
