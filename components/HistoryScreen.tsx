import React from 'react';
import type { DietPlan } from '../types';

interface HistoryScreenProps {
  history: DietPlan[];
  onView: (diet: DietPlan) => void;
  onDelete: (id: string) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ history, onView, onDelete }) => {
  if (history.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-xl font-medium text-gray-100">Histórico Vazio</h3>
        <p className="mt-1 text-gray-400">Você ainda não salvou nenhum plano de saúde. Gere e salve um para vê-lo aqui!</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Histórico de Planos</h2>
      <div className="space-y-4">
        {history.map(diet => (
          <div key={diet.id} className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-700">
            <div>
              <p className="font-semibold text-emerald-400">Plano de {new Date(diet.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="text-sm text-gray-400">{diet.totalCalories} kcal</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onView(diet)} className="px-3 py-1 text-sm bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors">Visualizar</button>
              <button onClick={() => onDelete(diet.id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};