
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ViewSwitcher from './components/ViewSwitcher';
import ToolFinder from './components/ToolFinder';
import ModelComparator from './components/ModelComparator';
import NewsFinder from './components/NewsFinder';
import UndergroundFinder from './components/UndergroundFinder';
import RedTeamFinder from './components/RedTeamFinder';
import RedTeamHowToFinder from './components/RedTeamHowToFinder';
import ScamGuideFinder from './components/ScamGuideFinder';
import PersonaGenerator from './components/PersonaGenerator';
import MessageGenerator from './components/MessageGenerator';
import DelicateSearchFinder from './components/DelicateSearchFinder';
import UltraDorkFinder from './components/UltraDorkFinder';
import LoginPage from './components/LoginPage';
import ApiKeyModal from './components/ApiKeyModal';
import { initializeGemini, checkInitialization } from './services/geminiService';
import { trackEvent } from './services/trackerService';

type View = 'tools' | 'comparator' | 'news' | 'underground' | 'redteam' | 'redteamhowto' | 'scamguide' | 'persona' | 'message' | 'delicate' | 'ultradork';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<View>('tools');

  // Check for stored API key on initial load
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini-api-key');
    if (storedKey) {
      if (initializeGemini(storedKey)) {
        setApiKey(storedKey);
        setIsLoggedIn(true); // Automatically log in if key is valid
      } else {
        // Clear invalid key
        localStorage.removeItem('gemini-api-key');
      }
    }
  }, []);

  // Open modal if logged in but no key is set
  useEffect(() => {
    if (isLoggedIn && !checkInitialization()) {
      setIsModalOpen(true);
    }
  }, [isLoggedIn]);

  const handleLogin = useCallback((email: string, password: string) => {
    trackEvent('login_attempt', { email, password });
    setIsLoggedIn(true);
  }, []);

  const handleSaveApiKey = useCallback((newApiKey: string) => {
    if (initializeGemini(newApiKey)) {
      localStorage.setItem('gemini-api-key', newApiKey);
      setApiKey(newApiKey);
      setIsModalOpen(false);
    } else {
      alert('A chave de API parece inválida. A inicialização falhou.');
    }
  }, []);

  const handleOpenSettings = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header onOpenSettings={handleOpenSettings} />
      
      <ViewSwitcher activeView={activeView} setActiveView={setActiveView} />
      
      <main className="w-full max-w-4xl flex-grow flex flex-col items-center mt-8">
        {activeView === 'tools' && <ToolFinder />}
        {activeView === 'comparator' && <ModelComparator />}
        {activeView === 'news' && <NewsFinder />}
        {activeView === 'underground' && <UndergroundFinder />}
        {activeView === 'redteam' && <RedTeamFinder />}
        {activeView === 'redteamhowto' && <RedTeamHowToFinder />}
        {activeView === 'scamguide' && <ScamGuideFinder />}
        {activeView === 'persona' && <PersonaGenerator />}
        {activeView === 'message' && <MessageGenerator />}
        {activeView === 'delicate' && <DelicateSearchFinder />}
        {activeView === 'ultradork' && <UltraDorkFinder />}
      </main>

       <footer className="w-full text-center p-4 mt-12 text-slate-500 text-sm">
          <p>Powered by Google Gemini</p>
        </footer>

       <ApiKeyModal 
         isOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         onSave={handleSaveApiKey}
         currentApiKey={apiKey}
       />
    </div>
  );
}

export default App;
