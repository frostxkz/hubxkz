import React, { useState, useCallback } from 'react';
import type { MessageResult } from '../types';
import { generateMessage } from '../services/geminiService';
import SearchForm from './SearchForm';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import InitialState from './InitialState';
import MessageResultDisplay from './MessageResultDisplay';
import NoResults from './NoResults';

const MessageGenerator: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<MessageResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError('Por favor, descreva o objetivo da mensagem.');
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);
    setHasSearched(true);
    setQuery(searchQuery);

    try {
      const results = await generateMessage(searchQuery);
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

  const showNoResults = hasSearched && !isLoading && !error && (!result || !result.assunto);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl text-center p-4 mb-4 border border-teal-500/30 bg-teal-500/10 rounded-lg">
        <h2 className="font-bold text-teal-400">GERADOR DE MENSAGENS ATIVADO</h2>
        <p className="text-slate-400 text-sm mt-1">
          Crie mensagens táticas e persuasivas para diversos cenários operacionais.
        </p>
      </div>
      <SearchForm 
        query={query} 
        setQuery={setQuery} 
        onSearch={performSearch} 
        isLoading={isLoading} 
        placeholder="Objetivo... Ex: Phishing em massa para roubar credenciais"
        buttonText="Gerar Mensagem"
      />
      
      <div className="w-full mt-10">
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {showNoResults && <NoResults />}
        {!isLoading && !error && result && <MessageResultDisplay result={result} />}
        {!hasSearched && !isLoading && !error && <InitialState />}
      </div>
    </div>
  );
};

export default MessageGenerator;