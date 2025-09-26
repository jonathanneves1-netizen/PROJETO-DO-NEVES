import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { RegistrationForm } from './components/RegistrationForm';
import { DietDisplay } from './components/DietDisplay';
import { HistoryScreen } from './components/HistoryScreen';
import { AboutScreen } from './components/AboutScreen';
import { Spinner } from './components/Spinner';
import { ErrorMessage } from './components/ErrorMessage';
import { generateDiet } from './services/geminiService';
import type { UserData, DietPlan } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

type Screen = 'welcome' | 'form' | 'diet' | 'history' | 'about';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [currentUserData, setCurrentUserData] = useState<UserData | null>(null);
  const [currentDiet, setCurrentDiet] = useState<DietPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useLocalStorage<DietPlan[]>('dietHistory', []);

  const handleGenerateDiet = useCallback(async (userData: UserData) => {
    setCurrentUserData(userData);
    setIsLoading(true);
    setError(null);
    setCurrentDiet(null);
    setCurrentScreen('diet');

    try {
      const diet = await generateDiet(userData);
      const dietWithDate = { ...diet, date: new Date().toISOString(), id: Date.now().toString() };
      setCurrentDiet(dietWithDate);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSaveDiet = useCallback(() => {
    if (currentDiet && !history.some(item => item.id === currentDiet.id)) {
      setHistory([currentDiet, ...history]);
      alert('Plano de saúde salvo no histórico!');
    }
  }, [currentDiet, history, setHistory]);
  
  const handleDeleteDiet = useCallback((id: string) => {
    setHistory(history.filter(diet => diet.id !== id));
  }, [history, setHistory]);

  const handleViewDiet = useCallback((diet: DietPlan) => {
    setCurrentDiet(diet);
    setCurrentScreen('diet');
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStart={() => setCurrentScreen('form')} />;
      case 'form':
        return <RegistrationForm onSubmit={handleGenerateDiet} />;
      case 'diet':
        if (isLoading) return <Spinner message="Gerando seu plano de saúde inteligente..." />;
        if (error) return <ErrorMessage message={error} onRetry={() => currentUserData && handleGenerateDiet(currentUserData)} />;
        if (currentDiet) return <DietDisplay diet={currentDiet} onSave={handleSaveDiet} onRegenerate={() => currentUserData && handleGenerateDiet(currentUserData)} />;
        return null;
      case 'history':
        return <HistoryScreen history={history} onView={handleViewDiet} onDelete={handleDeleteDiet} />;
      case 'about':
        return <AboutScreen />;
      default:
        return <WelcomeScreen onStart={() => setCurrentScreen('form')} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-900 text-gray-200">
      <Header setScreen={setCurrentScreen} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;