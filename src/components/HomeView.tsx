import { useMemo } from 'react'
import { useSavora } from '../context/SavoraContext'
import { DIET_OPTIONS, GOAL_OPTIONS } from '../data/preferences'
import { RECIPES, type Recipe } from '../data/recipes'
import RecipeCard from './RecipeCard'

interface HomeViewProps {
  onCook: (recipe: Recipe) => void
  onOpenOnboarding: () => void
}

const HomeView = ({ onCook, onOpenOnboarding }: HomeViewProps) => {
  const { preferences, progress, resetExperience, clearRecipeProgress } = useSavora()

  const goalLabel = preferences
    ? GOAL_OPTIONS.find((goal) => goal.value === preferences.goal)?.title
    : null
  const dietLabel = preferences
    ? DIET_OPTIONS.find((diet) => diet.value === preferences.diet)?.title
    : null

  const activeProgressCount = Object.keys(progress).length

  const sortedRecipes = useMemo(() => {
    if (!preferences) {
      return RECIPES
    }

    const scored = RECIPES.map((recipe) => {
      let score = 0
      if (recipe.goalFocus === preferences.goal) {
        score += 2
      }
      if (recipe.dietTags.includes(preferences.diet)) {
        score += 1
      }
      return { recipe, score }
    })

    return scored
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.recipe)
  }, [preferences])

  const handleResetApp = () => {
    resetExperience()
    onOpenOnboarding()
  }

  return (
    <div className="relative flex-1">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-white/15 via-transparent to-transparent" aria-hidden />
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
        <header className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-80" aria-hidden />
          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Savora
              </span>
              <h1 className="mt-4 max-w-xl text-4xl font-semibold text-white sm:text-5xl">
                Cook with ease, one calm step at a time.
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
                Three gentle recipes, guided in Cook Mode so you can focus on the aroma, the sizzle, and the small wins.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenOnboarding}
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white/70 hover:bg-white/10"
            >
              Edit preferences
            </button>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="glass-panel relative overflow-hidden rounded-3xl p-6">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-300/30 via-teal-300/20 to-sky-300/30 opacity-80" aria-hidden />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Your vibe</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{goalLabel ?? 'Set your kitchen goal'}</h2>
              <p className="mt-2 text-sm text-white/75">
                {goalLabel
                  ? 'We will surface recipes that nurture this intention every time you visit.'
                  : 'Finish onboarding to tailor each cooking session to your mood.'}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/80">
                <span className="rounded-full bg-white/10 px-3 py-1">
                  {goalLabel ?? 'No goal yet'}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  {dietLabel ?? 'Diet open'}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-panel relative overflow-hidden rounded-3xl p-6">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-300/30 via-amber-200/30 to-violet-300/20 opacity-80" aria-hidden />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Momentum</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                {activeProgressCount > 0
                  ? `You have ${activeProgressCount} recipe${activeProgressCount > 1 ? 's' : ''} in motion`
                  : 'Start any recipe to begin tracking'}
              </h2>
              <p className="mt-2 text-sm text-white/75">
                Savora remembers the last step you completed so you can pick up right where you paused.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/80">
                <button
                  type="button"
                  onClick={handleResetApp}
                  className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white/70 hover:bg-white/10"
                >
                  Reset app
                </button>
                {activeProgressCount > 0 ? (
                  <span className="rounded-full bg-white/15 px-3 py-1">
                    Progress saved locally
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Recipe Studio</p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Beginner friendly picks</h2>
              <p className="mt-2 max-w-2xl text-sm text-white/75">
                Each recipe is portioned for small wins, with Cook Mode guiding you one thoughtful action at a time.
              </p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {sortedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onCook={onCook}
                recommended={Boolean(
                  preferences &&
                    (recipe.goalFocus === preferences.goal ||
                      recipe.dietTags.includes(preferences.diet)),
                )}
                progressStep={progress[recipe.id]}
                onResetProgress={() => clearRecipeProgress(recipe.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomeView
