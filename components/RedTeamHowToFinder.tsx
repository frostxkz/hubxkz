import React, { useState, useCallback } from 'react';
import type { RedTeamHowToResult } from '../types';
import { getRedTeamHowTo } from '../services/geminiService';
import SearchForm from './SearchForm';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import InitialState from './InitialState';
import RedTeamHowToResultsDisplay from './RedTeamHowToResultsDisplay';
import NoResults from './NoResults';

const RedTeamHowToFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<RedTeamHowToResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError('Por favor, insira uma técnica para gerar o guia.');
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);
    setHasSearched(true);
    setQuery(searchQuery);

    try {
      const results = await getRedTeamHowTo(searchQuery);
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

  const showNoResults = hasSearched && !isLoading && !error && (!result || !result.tecnica_alvo);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl text-center p-4 mb-4 border border-orange-500/30 bg-orange-500/10 rounded-lg">
        <h2 className="font-bold text-orange-400">MODO HOW-TO ATIVADO</h2>
        <p className="text-slate-400 text-sm mt-1">
          Gere guias operacionais passo a passo para técnicas de Red Team.
        </p>
      </div>
      <SearchForm 
        query={query} 
        setQuery={setQuery} 
        onSearch={performSearch} 
        isLoading={isLoading} 
        placeholder="Técnica (ex: Phishing, Golden Ticket)"
        buttonText="Gerar Guia"
      />
      
      <div className="w-full mt-10">
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {showNoResults && <NoResults />}
        {!isLoading && !error && result && <RedTeamHowToResultsDisplay result={result} />}
        {!hasSearched && !isLoading && !error && <InitialState />}
      </div>
    </div>
  );
};

export default RedTeamHowToFinder;