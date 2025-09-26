import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md max-w-2xl mx-auto" role="alert">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">Opa! Algo deu errado.</p>
          <p>{message}</p>
        </div>
        {onRetry && (
           <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Tentar Novamente
          </button>
        )}
      </div>
    </div>
  );
};
