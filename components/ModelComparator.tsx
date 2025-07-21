import React, { useState, useCallback } from 'react';
import type { ComparisonResult } from '../types';
import { compareAIModels } from '../services/geminiService';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import ComparisonTable from './ComparisonTable';
import InitialState from './InitialState';

const ModelComparator: React.FC = () => {
  const [modelA, setModelA] = useState('');
  const [modelB, setModelB] = useState('');
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const performComparison = useCallback(async () => {
    if (!modelA.trim() || !modelB.trim()) {
      setError('Por favor, insira os nomes dos dois modelos a serem comparados.');
      return;
    }

    setIsLoading(true);
    setComparison(null);
    setError(null);
    setHasSearched(true);

    try {
      const result = await compareAIModels(modelA, modelB);
      setComparison(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado ao comparar os modelos.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [modelA, modelB]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performComparison();
  };
  
  const showInitialState = !hasSearched && !isLoading && !error;

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-center text-lg text-slate-400 mb-6 max-w-2xl">
        Compare dois modelos de IA lado a lado para entender suas forças, fraquezas e melhores casos de uso.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          value={modelA}
          onChange={(e) => setModelA(e.target.value)}
          placeholder="Ex: GPT-4o"
          className="w-full px-5 py-3 bg-slate-800 border-2 border-slate-700 rounded-full text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300"
          disabled={isLoading}
        />
        <span className="text-slate-500 font-bold hidden md:block">VS</span>
        <input
          type="text"
          value={modelB}
          onChange={(e) => setModelB(e.target.value)}
          placeholder="Ex: Gemini 2.5 Flash"
          className="w-full px-5 py-3 bg-slate-800 border-2 border-slate-700 rounded-full text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-all duration-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analisando...
            </>
          ) : (
            'Comparar'
          )}
        </button>
      </form>
      
      <div className="w-full mt-10">
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {showInitialState && <InitialState />}
        {!isLoading && !error && comparison && <ComparisonTable result={comparison} />}
      </div>
    </div>
  );
};

export default ModelComparator;