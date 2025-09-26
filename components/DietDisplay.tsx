import React from 'react';
import type { DietPlan, SupplementRecommendation } from '../types';

interface DietDisplayProps {
  diet: DietPlan;
  onSave: () => void;
  onRegenerate: () => void;
}

const InfoCard: React.FC<{ label: string; value: string | number; unit?: string; color: string }> = ({ label, value, unit, color }) => (
  <div className={`p-4 rounded-lg text-center bg-gray-800 border border-gray-700`}>
    <p className={`text-sm font-semibold ${color}`}>{label}</p>
    <p className="text-2xl font-bold text-white">{value}{unit}</p>
  </div>
);

const MealRow: React.FC<{ mealName: string; description: string; icon: string }> = ({ mealName, description, icon }) => (
    <tr>
        <td className="px-4 py-3 border-b border-gray-700">
            <div className="flex items-center space-x-3">
                <span className="text-2xl">{icon}</span>
                <span className="font-bold text-lg text-gray-100">{mealName}</span>
            </div>
        </td>
        <td className="px-4 py-3 border-b border-gray-700 text-gray-300">{description}</td>
    </tr>
);

const SupplementCard: React.FC<{ item: SupplementRecommendation }> = ({ item }) => (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h4 className="font-bold text-emerald-400">{item.name}</h4>
        <p className="text-sm text-gray-300 mt-1">{item.benefit}</p>
        <p className="text-xs text-amber-400 mt-2 font-mono">Consumir: {item.timing}</p>
    </div>
);

export const DietDisplay: React.FC<DietDisplayProps> = ({ diet, onSave, onRegenerate }) => {
    const mealIcons: { [key: string]: string } = {
        'Café da manhã': '☀️',
        'Lanche da manhã': '🍎',
        'Almoço': '🍲',
        'Lanche da tarde': '☕',
        'Jantar': '🍽️',
        'Ceia': '🌙',
    };

    const shareOnWhatsApp = () => {
        let message = `*Meu Plano de Saúde - NutriSangue*\n\n`;
        message += `*Calorias Totais:* ${diet.totalCalories} kcal\n`;
        message += `*Macros:* P: ${diet.macros.proteins}, C: ${diet.macros.carbohydrates}, G: ${diet.macros.fats}\n\n`;
        message += "*--- Plano Alimentar ---*\n";
        Object.entries(diet.meals).forEach(([mealName, description]) => {
            if(description) message += `*${mealIcons[mealName]} ${mealName}:* ${description}\n`;
        });
        message += "\n*--- Recomendações ---*\n";
        message += `*Vitaminas:* ${diet.vitamins.join(', ')}\n`;
        diet.supplements.forEach(sup => {
            message += `*Suplemento:* ${sup.name} (${sup.benefit})\n`;
        });
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

  return (
    <div className="max-w-5xl mx-auto bg-gray-900 border border-gray-700 p-6 sm:p-8 rounded-lg shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Seu Plano de Saúde Inteligente</h2>
      <p className="text-center text-gray-400 mb-8">Gerado em: {new Date(diet.date).toLocaleDateString('pt-BR')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <InfoCard label="Calorias Totais" value={diet.totalCalories} unit=" kcal" color="text-cyan-400" />
        <InfoCard label="Proteínas" value={diet.macros.proteins} color="text-red-400" />
        <InfoCard label="Carboidratos" value={diet.macros.carbohydrates} color="text-amber-400" />
      </div>

      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-8">
        <h3 className="text-xl font-bold mb-4 text-emerald-400">Plano Alimentar</h3>
        <table className="w-full text-left">
            <tbody>
                {Object.entries(diet.meals).map(([mealName, description]) => 
                  description && <MealRow key={mealName} mealName={mealName} description={description} icon={mealIcons[mealName]} />
                )}
            </tbody>
        </table>
      </div>
      
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                 <h3 className="text-xl font-bold mb-4 text-emerald-400">Vitaminas e Minerais</h3>
                 <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {diet.vitamins.map(vitamin => <li key={vitamin}>{vitamin}</li>)}
                 </ul>
            </div>
             <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                 <h3 className="text-xl font-bold mb-4 text-emerald-400">Suplementação Sugerida</h3>
                 <div className="space-y-3">
                    {diet.supplements.map(sup => <SupplementCard key={sup.name} item={sup} />)}
                 </div>
            </div>
       </div>


      <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
        <button onClick={onSave} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">Salvar Plano</button>
        <button onClick={onRegenerate} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors">Refazer</button>
        <button onClick={shareOnWhatsApp} className="px-6 py-2 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition-colors">Compartilhar</button>
      </div>
    </div>
  );
};