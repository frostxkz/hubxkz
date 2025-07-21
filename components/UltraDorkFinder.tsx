import React, { useState, useCallback } from 'react';
import type { UltraDorkSuggestion, UltraDorkExecutionResult } from '../types';
import { generateUltraDorks, executeUltraDork } from '../services/geminiService';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import InitialState from './InitialState';
import UltraDorkResultsDisplay from './UltraDorkResultsDisplay';
import NoResults from './NoResults';

type Stage = 'idle' | 'suggesting' | 'suggested' | 'executing' | 'executed';

const UltraDorkFinder: React.FC = () => {
  const [stage, setStage] = useState<Stage>('idle');
  const [goal, setGoal] = useState('');
  const [activeDork, setActiveDork] = useState('');
  const [suggestions, setSuggestions] = useState<UltraDorkSuggestion[]>([]);
  const [result, setResult] = useState<UltraDorkExecutionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGoalSubmit = useCallback(async (submittedGoal: string) => {
    if (!submittedGoal.trim()) {
      setError('Por favor, defina um objetivo para a investigação.');
      return;
    }
    setGoal(submittedGoal);
    setError(null);
    setSuggestions([]);
    setResult(null);
    setStage('suggesting');

    try {
      const results = await generateUltraDorks(submittedGoal);
      setSuggestions(results);
      if (results.length > 0) {
        setActiveDork(results[0].dork); // Pre-fill with the first suggestion
        setStage('suggested');
      } else {
        setError("A IA não conseguiu gerar sugestões para este objetivo.");
        setStage('idle');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro inesperado.';
      setError(errorMessage);
      setStage('idle');
    }
  }, []);

  const handleDorkExecute = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDork.trim()) {
      setError('O dork não pode estar vazio.');
      return;
    }
    setError(null);
    setStage('executing');

    try {
      const execResult = await executeUltraDork(activeDork, goal);
      setResult(execResult);
      setStage('executed');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro inesperado.';
      setError(errorMessage);
      setStage('suggested'); // Return to suggestion stage on error
    }
  }, [activeDork, goal]);

  const handleSelectSuggestion = (dork: string) => {
    setActiveDork(dork);
  };
  
  const resetSearch = () => {
      setStage('idle');
      setGoal('');
      setActiveDork('');
      setSuggestions([]);
      setResult(null);
      setError(null);
  }

  const isLoading = stage === 'suggesting' || stage === 'executing';
  
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl text-center p-4 mb-4 border border-green-500/30 bg-green-500/10 rounded-lg">
        <h2 className="font-bold text-green-400">MODO ULTRA DORKS ATIVADO</h2>
        <p className="text-slate-400 text-sm mt-1">
          Gere e execute Google Dorks avançados com IA para investigações OSINT.
        </p>
      </div>

      {stage === 'idle' && (
        <form onSubmit={(e) => { e.preventDefault(); handleGoalSubmit(goal); }} className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-4">
            <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Objetivo... Ex: Achar painéis de login da empresa X"
                className="w-full px-5 py-3 bg-slate-800 border-2 border-slate-700 rounded-full text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-300"
            />
            <button type="submit" className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-green-500 transition-all duration-300 shadow-lg hover:shadow-green-500/50">
                Gerar Dorks
            </button>
        </form>
      )}

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {(stage === 'suggested' || stage === 'executed') && (
        <div className="w-full max-w-3xl flex flex-col items-center animate-fade-in">
            <div className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-lg mb-6">
                <p className="text-sm text-slate-400">Objetivo da Investigação:</p>
                <p className="font-semibold text-green-300">{goal}</p>
            </div>

            <h3 className="text-xl font-bold text-slate-200 mb-4">Sugestões de Dorks da IA</h3>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {suggestions.map((s, i) => (
                    <div key={i} className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col justify-between">
                        <div>
                            <span className="inline-block bg-green-500/20 text-green-300 text-xs font-semibold px-2 py-1 rounded-full mb-2">{s.category}</span>
                            <p className="text-sm text-slate-300 mb-2 font-mono">{s.dork}</p>
                            <p className="text-xs text-slate-400">{s.description}</p>
                        </div>
                        <button onClick={() => handleSelectSuggestion(s.dork)} className="mt-3 w-full text-center px-3 py-1.5 bg-slate-700 border border-slate-600 rounded-md text-sm text-slate-200 hover:bg-green-600 hover:border-green-500 transition-all duration-200">
                            Usar este Dork
                        </button>
                    </div>
                ))}
            </div>

            <h3 className="text-xl font-bold text-slate-200 mb-4">Executar Dork</h3>
             <form onSubmit={handleDorkExecute} className="w-full flex flex-col sm:flex-row items-center gap-4">
                <input
                    type="text"
                    value={activeDork}
                    onChange={(e) => setActiveDork(e.target.value)}
                    placeholder="Selecione um dork acima ou digite o seu"
                    className="w-full px-5 py-3 bg-slate-800 border-2 border-slate-700 rounded-full text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300 font-mono"
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading} className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50">
                    {isLoading ? 'Executando...' : 'Investigar'}
                </button>
            </form>
        </div>
      )}

      <div className="w-full mt-10">
        {stage === 'idle' && !error && <InitialState />}
        {stage === 'executed' && result && <UltraDorkResultsDisplay result={result} />}
        {stage === 'executed' && !result && !isLoading && <NoResults />}
      </div>
       
       {(stage !== 'idle') && (
            <button onClick={resetSearch} className="mt-8 text-sm text-slate-400 hover:text-indigo-400 underline">
                Iniciar Nova Investigação
            </button>
       )}
    </div>
  );
};

export default UltraDorkFinder;