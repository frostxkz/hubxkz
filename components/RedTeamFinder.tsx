import React, { useState, useCallback } from 'react';
import type { RedTeamResult } from '../types';
import { getRedTeamBriefing } from '../services/geminiService';
import SearchForm from './SearchForm';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import InitialState from './InitialState';
import RedTeamResultsDisplay from './RedTeamResultsDisplay';
import NoResults from './NoResults';

const RedTeamFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<RedTeamResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError('Por favor, insira um tópico para a análise.');
      return;
    }
    
    setIsLoading(true);
    setResult(null);
    setError(null);
    setHasSearched(true);
    setQuery(searchQuery);

    try {
      const results = await getRedTeamBriefing(searchQuery);
      setResult(results);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const showNoResults = hasSearched && !isLoading && !error && (!result || !result.objetivo);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl text-center p-4 mb-4 border border-red-500/30 bg-red-500/10 rounded-lg">
        <h2 className="font-bold text-red-400">MODO RED TEAM ATIVADO</h2>
        <p className="text-slate-400 text-sm mt-1">
          Análise de vetores de ataque e TTPs para fins de simulação e defesa.
        </p>
      </div>
      <SearchForm 
        query={query} 
        setQuery={setQuery} 
        onSearch={performSearch} 
        isLoading={isLoading} 
        placeholder="Analisar vetor de ataque... Ex: Kerberoasting"
        buttonText="Analisar Vetor"
      />
      
      <div className="w-full mt-10">
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {showNoResults && <NoResults />}
        {!isLoading && !error && result && <RedTeamResultsDisplay result={result} />}
        {!hasSearched && !isLoading && !error && <InitialState />}
      </div>
    </div>
  );
};

export default RedTeamFinder;