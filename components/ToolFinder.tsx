import React, { useState, useCallback } from 'react';
import type { AITool } from '../types';
import { findAITools } from '../services/geminiService';
import SearchForm from './SearchForm';
import ResultsDisplay from './ResultsDisplay';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import InitialState from './InitialState';
import ExamplePrompts from './ExamplePrompts';
import NoResults from './NoResults';

const ToolFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [aiTools, setAITools] = useState<AITool[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError('Por favor, insira um termo de busca.');
      return;
    }

    setIsLoading(true);
    setAITools([]);
    setError(null);
    setHasSearched(true);
    setQuery(searchQuery);

    try {
      const results = await findAITools(searchQuery);
      setAITools(results);
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

  const showNoResults = hasSearched && !isLoading && !error && aiTools.length === 0;

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-center text-lg text-slate-400 mb-6 max-w-2xl">
        Encontre as ferramentas de Inteligência Artificial perfeitas para suas necessidades. Basta descrever o que você procura.
      </p>
      <SearchForm 
        query={query} 
        setQuery={setQuery} 
        onSearch={performSearch} 
        isLoading={isLoading}
        placeholder="Ex: Uma IA para criar logos ou resumir textos"
        buttonText="Buscar Ferramentas"
      />
      <ExamplePrompts onPromptClick={performSearch} />
      
      <div className="w-full mt-10">
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {showNoResults && <NoResults />}
        {!isLoading && !error && aiTools.length > 0 && <ResultsDisplay tools={aiTools} />}
        {!hasSearched && !isLoading && !error && <InitialState />}
      </div>
    </div>
  );
};

export default ToolFinder;