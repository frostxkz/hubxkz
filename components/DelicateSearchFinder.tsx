import React, { useState, useCallback } from 'react';
import type { DelicateSearchResult } from '../types';
import { performDelicateSearch } from '../services/geminiService';
import SearchForm from './SearchForm';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import InitialState from './InitialState';
import DelicateSearchResultsDisplay from './DelicateSearchResultsDisplay';
import NoResults from './NoResults';

const DelicateSearchFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<DelicateSearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError('Por favor, insira um termo para a busca delicada.');
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);
    setHasSearched(true);
    setQuery(searchQuery);

    try {
      const results = await performDelicateSearch(searchQuery);
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

  const showNoResults = hasSearched && !isLoading && !error && (!result || !result.titulo_da_investigacao);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl text-center p-4 mb-4 border border-sky-500/30 bg-sky-500/10 rounded-lg">
        <h2 className="font-bold text-sky-400">MODO BUSCA DELICADA ATIVADO</h2>
        <p className="text-slate-400 text-sm mt-1">
          Busca profunda por informações sensíveis e não convencionais.
        </p>
      </div>
      <SearchForm 
        query={query} 
        setQuery={setQuery} 
        onSearch={performSearch} 
        isLoading={isLoading} 
        placeholder="Termo de busca... Ex: Netflix account"
        buttonText="Investigar"
      />
      
      <div className="w-full mt-10">
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {showNoResults && <NoResults />}
        {!isLoading && !error && result && <DelicateSearchResultsDisplay result={result} />}
        {!hasSearched && !isLoading && !error && <InitialState />}
      </div>
    </div>
  );
};

export default DelicateSearchFinder;