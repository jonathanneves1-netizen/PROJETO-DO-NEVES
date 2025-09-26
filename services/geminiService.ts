import { GoogleGenAI, Type } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';
import type { UserData, DietPlan } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const dietPlanSchema = {
  type: Type.OBJECT,
  properties: {
    meals: {
      type: Type.OBJECT,
      properties: {
        'Café da manhã': { type: Type.STRING, description: "Plano detalhado para o café da manhã." },
        'Lanche da manhã': { type: Type.STRING, description: "Plano detalhado para o lanche da manhã." },
        'Almoço': { type: Type.STRING, description: "Plano detalhado para o almoço." },
        'Lanche da tarde': { type: Type.STRING, description: "Plano detalhado para o lanche da tarde." },
        'Jantar': { type: Type.STRING, description: "Plano detalhado para o jantar." },
        'Ceia': { type: Type.STRING, description: "Plano opcional para a ceia." },
      },
      required: ["Café da manhã", "Lanche da manhã", "Almoço", "Lanche da tarde", "Jantar"]
    },
    totalCalories: { type: Type.NUMBER, description: "Estimativa de calorias totais para o dia." },
    macros: {
      type: Type.OBJECT,
      properties: {
        proteins: { type: Type.STRING, description: "Estimativa de proteínas em gramas, ex: '150g'." },
        carbohydrates: { type: Type.STRING, description: "Estimativa de carboidratos em gramas, ex: '200g'." },
        fats: { type: Type.STRING, description: "Estimativa de gorduras boas em gramas, ex: '70g'." },
      },
      required: ["proteins", "carbohydrates", "fats"]
    },
    vitamins: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de vitaminas e minerais importantes para o usuário. Ex: ['Vitamina D', 'Ferro', 'Zinco']"
    },
    supplements: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Nome do suplemento. Ex: 'Whey Protein'" },
          benefit: { type: Type.STRING, description: "Principal benefício do suplemento." },
          timing: { type: Type.STRING, description: "Melhor horário para consumo. Ex: 'Pós-treino'" }
        },
        required: ["name", "benefit", "timing"]
      },
      description: "Lista de suplementos recomendados com base no objetivo."
    }
  },
  required: ["meals", "totalCalories", "macros", "vitamins", "supplements"],
};

const getPrompt = (userData: UserData): string => {
  return `
    Você é um nutricionista especialista em IA e cientista de dados. Sua tarefa é criar um plano de saúde completo e personalizado em português, com base nos dados do usuário, usando um tom moderno e encorajador.

    **Dados do Usuário:**
    - Idade: ${userData.age}
    - Sexo: ${userData.sex}
    - Altura: ${userData.height} cm
    - Peso: ${userData.weight} kg
    - Nível de Atividade: ${userData.activityLevel}
    - Tipo Sanguíneo: ${userData.bloodType}
    - Objetivo: ${userData.goal}
    - Restrições Alimentares: ${userData.restrictions.join(', ') || 'Nenhuma'}

    **Instruções para Geração do Plano de Saúde:**

    1.  **Cálculo de Calorias (TDEE - Gasto Energético Diário Total):**
        - Primeiro, estime a Taxa Metabólica Basal (TMB) usando a fórmula de Mifflin-St Jeor.
        - TMB Homens: (10 * peso em kg) + (6.25 * altura em cm) - (5 * idade) + 5
        - TMB Mulheres: (10 * peso em kg) + (6.25 * altura em cm) - (5 * idade) - 161
        - Em seguida, multiplique a TMB pelo fator de atividade para obter o TDEE de manutenção:
            - Sedentário: 1.2
            - Leve: 1.375
            - Moderado: 1.55
            - Intenso: 1.725
        - Finalmente, ajuste o TDEE com base no objetivo:
            - Emagrecer: Reduza o TDEE em 20%.
            - Ganhar Massa: Aumente o TDEE em 15%.
            - Manter Peso / Saúde Geral: Use o TDEE de manutenção.
        - O valor final será o 'totalCalories'.

    2.  **Distribuição das Refeições:**
        - Distribua as calorias totais de forma equilibrada entre as refeições, com sugestões de alimentos culturalmente acessíveis no Brasil (arroz, feijão, frango, peixe, frutas tropicais, etc.).

    3.  **Regras por Tipo Sanguíneo (essencial seguir):**
        - Tipo O: Dieta rica em proteínas (carnes magras, peixes). Evite trigo, milho e laticínios.
        - Tipo A: Dieta primariamente vegetariana (leguminosas, verduras, grãos). Evite carne vermelha.
        - Tipo B: Dieta variada e equilibrada. Pode incluir carnes (exceto frango), laticínios e grãos. Evite milho e tomate.
        - Tipo AB: Uma mistura das dietas A e B. Foco em peixes, verduras e laticínios. Modere carne vermelha.

    4.  **Recomendações de Vitaminas e Suplementos:**
        - Com base no objetivo e nos dados gerais, sugira 2-3 vitaminas/minerais essenciais e 2-3 suplementos.
        - Para 'Ganhar Massa', sugira Whey Protein e Creatina.
        - Para 'Emagrecer', sugira um termogênico natural como chá verde e fibras.
        - Para 'Saúde Geral', sugira Ômega 3 e um Multivitamínico.
        - Para cada suplemento, forneça o nome, o principal benefício e o melhor horário para consumo.

    5.  **Restrições Alimentares:**
        - Aplique rigorosamente as restrições. Se 'Cetogênica', minimize carboidratos. Se 'Low Carb', limite-os. Se 'Vegano', elimine todos os produtos de origem animal.

    **Formato de Saída:**
    - Gere um plano completo para um dia, com sugestões de alimentos e quantidades.
    - O resultado DEVE ser um JSON válido que corresponda ao schema fornecido.
  `;
};

export const generateDiet = async (userData: UserData): Promise<Omit<DietPlan, 'id' | 'date'>> => {
  const prompt = getPrompt(userData);

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: dietPlanSchema,
        temperature: 0.6,
      },
    });
    
    const jsonText = response.text.trim();
    const dietData: Omit<DietPlan, 'id' | 'date'> = JSON.parse(jsonText);

    return dietData;

  } catch (error) {
    console.error("Error generating diet:", error);
    throw new Error("Falha ao gerar o plano de saúde. A IA pode estar sobrecarregada. Por favor, verifique seus dados e tente novamente em alguns instantes.");
  }
};