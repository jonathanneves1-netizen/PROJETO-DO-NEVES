export interface UserData {
  name?: string;
  age: number;
  sex: 'Masculino' | 'Feminino' | 'Outro';
  height: number;
  weight: number;
  activityLevel: 'Sedentário' | 'Leve' | 'Moderado' | 'Intenso';
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  goal: 'Emagrecer' | 'Ganhar Massa' | 'Manter Peso' | 'Saúde Geral';
  restrictions: string[];
}

export interface SupplementRecommendation {
  name: string;
  benefit: string;
  timing: string;
}

export interface DietPlan {
  id: string;
  date: string;
  meals: {
    'Café da manhã': string;
    'Lanche da manhã': string;
    'Almoço': string;
    'Lanche da tarde': string;
    'Jantar': string;
    'Ceia'?: string;
  };
  totalCalories: number;
  macros: {
    proteins: string;
    carbohydrates: string;
    fats: string;
  };
  vitamins: string[];
  supplements: SupplementRecommendation[];
}