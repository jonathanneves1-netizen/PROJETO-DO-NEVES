import React, { useState } from 'react';
import type { UserData } from '../types';

interface RegistrationFormProps {
  onSubmit: (data: UserData) => void;
}

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const goals = ['Emagrecer', 'Ganhar Massa', 'Manter Peso', 'Saúde Geral'];
const activityLevels = ['Sedentário', 'Leve', 'Moderado', 'Intenso'];
const allRestrictions = ['Sem lactose', 'Sem glúten', 'Vegetariano', 'Vegano', 'Cetogênica', 'Low Carb'];

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<UserData>>({
    sex: 'Masculino',
    goal: 'Saúde Geral',
    activityLevel: 'Sedentário',
    restrictions: []
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' || name === 'height' || name === 'weight' ? parseInt(value) || '' : value }));
  };

  const handleRestrictionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentRestrictions = prev.restrictions || [];
      if (checked) {
        return { ...prev, restrictions: [...currentRestrictions, value] };
      } else {
        return { ...prev, restrictions: currentRestrictions.filter(r => r !== value) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.age || !formData.sex || !formData.bloodType || !formData.goal || !formData.height || !formData.weight || !formData.activityLevel) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setError(null);
    onSubmit(formData as UserData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">Crie seu Perfil de Saúde</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome (Opcional)</label>
          <input type="text" name="name" id="name" onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="age" className="block text-sm font-medium">Idade *</label>
            <input type="number" name="age" id="age" onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium">Altura (cm) *</label>
            <input type="number" name="height" id="height" onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium">Peso (kg) *</label>
            <input type="number" name="weight" id="weight" onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
            <label htmlFor="sex" className="block text-sm font-medium">Sexo *</label>
            <select name="sex" id="sex" onChange={handleChange} defaultValue="Masculino" required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
              <option>Masculino</option>
              <option>Feminino</option>
              <option>Outro</option>
            </select>
          </div>
          <div>
            <label htmlFor="bloodType" className="block text-sm font-medium">Tipo Sanguíneo *</label>
            <select name="bloodType" id="bloodType" onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
              <option value="">Selecione...</option>
              {bloodTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="activityLevel" className="block text-sm font-medium">Nível de Atividade Física *</label>
            <select name="activityLevel" id="activityLevel" onChange={handleChange} defaultValue="Sedentário" required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
              {activityLevels.map(level => <option key={level} value={level}>{level}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="goal" className="block text-sm font-medium">Objetivo da Dieta *</label>
            <select name="goal" id="goal" onChange={handleChange} defaultValue="Saúde Geral" required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
              {goals.map(goal => <option key={goal} value={goal}>{goal}</option>)}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium">Restrições Alimentares</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {allRestrictions.map(restriction => (
              <div key={restriction} className="flex items-center">
                <input id={restriction} name="restrictions" type="checkbox" value={restriction} onChange={handleRestrictionChange} className="h-4 w-4 text-emerald-500 bg-gray-600 border-gray-500 rounded focus:ring-emerald-500" />
                <label htmlFor={restriction} className="ml-2 block text-sm">{restriction}</label>
              </div>
            ))}
          </div>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <div className="text-center pt-4">
          <button type="submit" className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Gerar Plano de Saúde
          </button>
        </div>
      </form>
    </div>
  );
};