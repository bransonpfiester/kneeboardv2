export type GoalValue = 'confidence' | 'health' | 'time';
export type DietValue = 'standard' | 'vegetarian' | 'vegan' | 'gluten-free';

export interface PreferenceOption<T> {
  value: T;
  title: string;
  description: string;
  emoji: string;
}

export const GOAL_OPTIONS: PreferenceOption<GoalValue>[] = [
  {
    value: 'confidence',
    title: 'Cook with confidence',
    description: 'Learn foundational skills and feel calm in the kitchen.',
    emoji: '🍳',
  },
  {
    value: 'health',
    title: 'Eat more mindfully',
    description: 'Focus on fresh ingredients and balanced meals.',
    emoji: '🥗',
  },
  {
    value: 'time',
    title: 'Save precious time',
    description: 'Choose fast, low-effort recipes for busy days.',
    emoji: '⏱️',
  },
];

export const DIET_OPTIONS: PreferenceOption<DietValue>[] = [
  {
    value: 'standard',
    title: 'No specific diet',
    description: 'I enjoy a flexible plate with room to explore.',
    emoji: '🍽️',
  },
  {
    value: 'vegetarian',
    title: 'Vegetarian',
    description: 'Plant-powered meals with dairy and eggs welcome.',
    emoji: '🥕',
  },
  {
    value: 'vegan',
    title: 'Vegan',
    description: 'No animal products—just vibrant plants.',
    emoji: '🌱',
  },
  {
    value: 'gluten-free',
    title: 'Gluten free',
    description: 'Keep things wheat-free and light.',
    emoji: '🌾',
  },
];
