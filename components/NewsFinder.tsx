import React, { useState, useCallback } from 'react';
import type { NewsResult } from '../types';
import { getLatestNews } from '../services/geminiService';
import SearchForm from './SearchForm';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import InitialState from './InitialState';
import NewsResultsDisplay from './NewsResultsDisplay';
import NoResults from './NoResults';

const NewsFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [newsResult, setNewsResult] = useState<NewsResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError('Por favor, insira um tópico para buscar notícias.');
      return;
    }

    setIsLoading(true);
    setNewsResult(null);
    setError(null);
    setHasSearched(true);
    setQuery(searchQuery);

    try {
      const results = await getLatestNews(searchQuery);
      setNewsResult(results);
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

  const showNoResults = hasSearched && !isLoading && !error && (!newsResult || !newsResult.summary);

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-center text-lg text-slate-400 mb-6 max-w-2xl">
        Receba as últimas notícias sobre qualquer tópico, com resumo e fontes fornecidos por IA.
      </p>
      <SearchForm 
        query={query} 
        setQuery={setQuery} 
        onSearch={performSearch} 
        isLoading={isLoading} 
        placeholder="Ex: Android RAT ou atualizações de IA"
        buttonText="Buscar Notícias"
      />
      
      <div className="w-full mt-10">
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {showNoResults && <NoResults />}
        {!isLoading && !error && newsResult && <NewsResultsDisplay result={newsResult} />}
        {!hasSearched && !isLoading && !error && <InitialState />}
      </div>
    </div>
  );
};

export default NewsFinder;