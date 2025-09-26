import React from 'react';

type Screen = 'welcome' | 'form' | 'diet' | 'history' | 'about';

interface HeaderProps {
  setScreen: (screen: Screen) => void;
}

export const Header: React.FC<HeaderProps> = ({ setScreen }) => {
  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-10 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => setScreen('welcome')}>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.707 13.707a1 1 0 01-1.414-1.414L8.586 11H6a1 1 0 110-2h2.586l-1.293-1.293a1 1 0 011.414-1.414l3 3a1 1 0 010 1.414l-3 3z" />
            </svg>
          <h1 className="text-2xl font-bold text-white">
            Nutri<span className="text-emerald-400">Sangue</span>
          </h1>
        </div>
        <nav className="flex items-center gap-4 text-sm font-medium text-gray-300">
            <button onClick={() => setScreen('form')} className="hover:text-emerald-400 transition-colors">Gerar Plano</button>
            <button onClick={() => setScreen('history')} className="hover:text-emerald-400 transition-colors">Histórico</button>
            <button onClick={() => setScreen('about')} className="hover:text-emerald-400 transition-colors">Sobre</button>
        </nav>
      </div>
    </header>
  );
};