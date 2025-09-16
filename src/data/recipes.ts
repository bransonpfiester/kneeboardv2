import type { DietValue, GoalValue } from './preferences';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  totalTime: string;
  servings: string;
  goalFocus: GoalValue;
  dietTags: DietValue[];
  ingredients: string[];
  steps: string[];
  accent: string;
}

export const RECIPES: Recipe[] = [
  {
    id: 'lemon-herb-chicken',
    title: 'Lemon Herb Skillet Chicken',
    description: 'Bright, tangy chicken with blistered veggies and a silky pan sauce.',
    totalTime: '30 minutes',
    servings: 'Serves 2',
    goalFocus: 'time',
    dietTags: ['standard', 'gluten-free'],
    ingredients: [
      '2 boneless chicken breasts',
      '1 tbsp olive oil',
      '1 lemon',
      '1 cup cherry tomatoes',
      '2 cups baby spinach',
      '2 cloves garlic',
      'Fresh thyme or parsley',
    ],
    steps: [
      'Pat the chicken dry, season generously with salt, pepper, and grated lemon zest.',
      'Heat olive oil in a large skillet over medium heat until shimmering.',
      'Sear chicken for 4 minutes per side until golden; remove to a warm plate.',
      'Add minced garlic and halved tomatoes to the pan. Cook 1 minute until fragrant.',
      'Deglaze with juice from half the lemon and 1/4 cup water, scraping brown bits.',
      'Return chicken and add spinach. Cover for 2 minutes until wilted and chicken is cooked through (165°F).',
      'Finish with a squeeze of remaining lemon, scatter herbs, and serve with the pan juices.',
    ],
    accent: 'from-amber-300/60 via-orange-400/40 to-rose-400/40',
  },
  {
    id: 'garden-pasta',
    title: 'Garden Veggie Pasta',
    description: 'A vibrant bowl of pasta tossed in basil oil with crisp seasonal vegetables.',
    totalTime: '25 minutes',
    servings: 'Serves 2',
    goalFocus: 'health',
    dietTags: ['standard', 'vegetarian'],
    ingredients: [
      '6 oz short-cut pasta',
      '1 zucchini, sliced',
      '1 cup snap peas',
      '1/2 cup frozen peas',
      '2 tbsp pesto or basil oil',
      '1/4 cup grated parmesan (optional)',
      'Zest and juice of 1/2 lemon',
    ],
    steps: [
      'Bring a large pot of salted water to a boil and cook pasta to al dente.',
      'Reserve 1/2 cup pasta water, then drain the pasta.',
      'In a skillet, sauté zucchini and snap peas in 1 tbsp olive oil with a pinch of salt for 3 minutes.',
      'Stir in frozen peas and cook 1 minute until bright green.',
      'Add cooked pasta, pesto or basil oil, and a splash of pasta water to create a glossy sauce.',
      'Finish with lemon zest, juice, and parmesan if using. Toss until silky.',
      'Taste, season with salt and pepper, and plate with extra herbs.',
    ],
    accent: 'from-emerald-300/50 via-teal-300/40 to-cyan-300/40',
  },
  {
    id: 'sunrise-parfait',
    title: 'Sunrise Yogurt Parfait',
    description: 'Layered yogurt, roasted fruit, and crunchy granola for a quick win.',
    totalTime: '10 minutes',
    servings: 'Serves 1-2',
    goalFocus: 'confidence',
    dietTags: ['standard', 'vegetarian'],
    ingredients: [
      '1 cup Greek or coconut yogurt',
      '1 cup mixed berries',
      '1/2 cup granola',
      '1 tbsp honey or maple syrup',
      'Toasted nuts or seeds',
      'Fresh mint leaves',
    ],
    steps: [
      'If desired, warm berries in a small pan with honey for 2 minutes to create a sauce.',
      'Spoon a layer of yogurt into the base of your glass or bowl.',
      'Add a layer of berries followed by a sprinkle of granola.',
      'Repeat the layers until the glass is nearly full.',
      'Finish with nuts, a drizzle of honey, and torn mint leaves.',
      'Serve immediately or chill up to 30 minutes for the granola to soften slightly.',
    ],
    accent: 'from-fuchsia-300/60 via-rose-300/50 to-sky-300/40',
  },
];
