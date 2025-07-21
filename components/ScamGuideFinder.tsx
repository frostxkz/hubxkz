import React, { useState, useCallback } from 'react';
import type { ScamGuideResult } from '../types';
import { getScamHowTo } from '../services/geminiService';
import SearchForm from './SearchForm';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import InitialState from './InitialState';
import ScamGuideResultsDisplay from './ScamGuideResultsDisplay';
import NoResults from './NoResults';

const ScamGuideFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<ScamGuideResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError('Por favor, insira uma técnica para gerar o manual.');
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);
    setHasSearched(true);
    setQuery(searchQuery);

    try {
      const results = await getScamHowTo(searchQuery);
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

  const showNoResults = hasSearched && !isLoading && !error && (!result || !result.titulo_da_operacao);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl text-center p-4 mb-4 border border-purple-500/30 bg-purple-500/10 rounded-lg">
        <h2 className="font-bold text-purple-400">MODO GUIA DE FRAUDES ATIVADO</h2>
        <p className="text-slate-400 text-sm mt-1">
          Gere manuais operacionais para diversos tipos de fraudes.
        </p>
      </div>
      <SearchForm 
        query={query} 
        setQuery={setQuery} 
        onSearch={performSearch} 
        isLoading={isLoading} 
        placeholder="Técnica ou alvo... Ex: Fraude de Cartão de Crédito"
        buttonText="Gerar Manual"
      />
      
      <div className="w-full mt-10">
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {showNoResults && <NoResults />}
        {!isLoading && !error && result && <ScamGuideResultsDisplay result={result} />}
        {!hasSearched && !isLoading && !error && <InitialState />}
      </div>
    </div>
  );
};

export default ScamGuideFinder;