import React, { useState, useCallback } from 'react';
import type { UndergroundResult } from '../types';
import { getUndergroundInfo } from '../services/geminiService';
import SearchForm from './SearchForm';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import InitialState from './InitialState';
import UndergroundResultsDisplay from './UndergroundResultsDisplay';
import NoResults from './NoResults';

const UndergroundFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<UndergroundResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError('Por favor, insira um tópico para a pesquisa.');
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);
    setHasSearched(true);
    setQuery(searchQuery);

    try {
      const results = await getUndergroundInfo(searchQuery);
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

  const showNoResults = hasSearched && !isLoading && !error && (!result || !result.summary);

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-center text-lg text-slate-400 mb-6 max-w-2xl">
        Acesse análises técnicas profundas sobre tópicos de cibersegurança e tecnologia.
      </p>
      <SearchForm 
        query={query} 
        setQuery={setQuery} 
        onSearch={performSearch} 
        isLoading={isLoading} 
        placeholder="Ex: vulnerabilidade Log4j ou Android RAT"
        buttonText="Analisar"
      />
      
      <div className="w-full mt-10">
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {showNoResults && <NoResults />}
        {!isLoading && !error && result && <UndergroundResultsDisplay result={result} />}
        {!hasSearched && !isLoading && !error && <InitialState />}
      </div>
    </div>
  );
};

export default UndergroundFinder;