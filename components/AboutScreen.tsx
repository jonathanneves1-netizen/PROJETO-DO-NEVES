import React from 'react';

export const AboutScreen: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto text-center bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-emerald-400">Sobre o NutriSangue</h2>
      <p className="text-gray-300 mb-6">
        O NutriSangue é um assistente de saúde que utiliza a inteligência artificial do Google Gemini para criar planos de saúde personalizados. As sugestões são baseadas em dados como tipo sanguíneo, objetivos e perfil físico, visando apoiar seu bem-estar.
      </p>
      <div className="bg-amber-900 bg-opacity-20 border-l-4 border-amber-500 text-amber-300 p-4 rounded-md text-left" role="alert">
        <p className="font-bold">Aviso Médico Importante</p>
        <p>Este aplicativo é uma ferramenta de apoio e não substitui a orientação de um médico ou nutricionista profissional. Sempre consulte um especialista antes de iniciar qualquer nova dieta, plano alimentar ou regime de suplementação.</p>
      </div>
      <footer className="mt-8 text-sm text-gray-500">
        <p>Desenvolvido com Google Gemini. Criado com paixão pela saúde e tecnologia.</p>
      </footer>
    </div>
  );
};