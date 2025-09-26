import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center py-16 animate-fade-in">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white">
        Bem-vindo ao <span className="text-emerald-400">NutriSangue</span>
      </h2>
      <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
        Sua saúde começa aqui: nutrição inteligente, personalizada e moderna.
      </p>
      <div className="mt-8">
        <button
          onClick={onStart}
          className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50 shadow-lg"
        >
          Começar
        </button>
      </div>
    </div>
  );
};