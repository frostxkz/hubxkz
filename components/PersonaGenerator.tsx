import React, { useState, useCallback } from 'react';
import type { PersonaResult } from '../types';
import { getPersona } from '../services/geminiService';
import SearchForm from './SearchForm';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import InitialState from './InitialState';
import PersonaResultsDisplay from './PersonaResultsDisplay';
import NoResults from './NoResults';

const PersonaGenerator: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<PersonaResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError('Por favor, descreva o alvo e o objetivo da operação.');
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);
    setHasSearched(true);
    setQuery(searchQuery);

    try {
      const results = await getPersona(searchQuery);
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

  const showNoResults = hasSearched && !isLoading && !error && (!result || !result.resumo_do_alvo);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl text-center p-4 mb-4 border border-yellow-500/30 bg-yellow-500/10 rounded-lg">
        <h2 className="font-bold text-yellow-400">GERADOR DE PERSONA ATIVADO</h2>
        <p className="text-slate-400 text-sm mt-1">
          Crie identidades falsas detalhadas para operações de engenharia social.
        </p>
      </div>
      <SearchForm 
        query={query} 
        setQuery={setQuery} 
        onSearch={performSearch} 
        isLoading={isLoading} 
        placeholder="Objetivo... Ex: Obter credenciais de rede de um funcionário"
        buttonText="Gerar Dossiê"
      />
      
      <div className="w-full mt-10">
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {showNoResults && <NoResults />}
        {!isLoading && !error && result && <PersonaResultsDisplay result={result} />}
        {!hasSearched && !isLoading && !error && <InitialState />}
      </div>
    </div>
  );
};

export default PersonaGenerator;