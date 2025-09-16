import type { Recipe } from '../data/recipes'

interface RecipeCardProps {
  recipe: Recipe
  onCook: (recipe: Recipe) => void
  progressStep?: number
  recommended?: boolean
  onResetProgress?: () => void
}

const RecipeCard = ({
  recipe,
  onCook,
  progressStep,
  recommended = false,
  onResetProgress,
}: RecipeCardProps) => {
  const totalSteps = recipe.steps.length
  const currentStep = typeof progressStep === 'number' ? progressStep : undefined
  const progressPercent =
    currentStep !== undefined ? Math.round(((currentStep + 1) / totalSteps) * 100) : 0

  const statusLabel = (() => {
    if (currentStep === undefined) {
      return 'Ready when you are'
    }
    if (currentStep >= totalSteps - 1) {
      return 'Finished once — cook again to keep the rhythm.'
    }
    return `Resume at step ${currentStep + 1}`
  })()

  return (
    <div className="glass-panel relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${recipe.accent} opacity-45`}
        aria-hidden
      />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/70">
          <span>Beginner</span>
          {recommended ? (
            <span className="rounded-full bg-white/25 px-3 py-1 text-[0.65rem] tracking-[0.2em] text-white">
              Recommended
            </span>
          ) : null}
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
          {recipe.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/80">{recipe.description}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/75">
          <span className="rounded-full bg-white/20 px-3 py-1">{recipe.totalTime}</span>
          <span className="rounded-full bg-white/20 px-3 py-1">{recipe.servings}</span>
          {recipe.dietTags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-white/15 px-3 py-1 capitalize">
              {tag.replace('-', ' ')}
            </span>
          ))}
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Progress</p>
          <div className="mt-2 h-2 w-full rounded-full bg-white/10">
            <div
              className={`h-full rounded-full bg-gradient-to-r from-emerald-300/80 via-teal-300/70 to-sky-300/80 transition-all duration-500`}
              style={{ width: `${currentStep !== undefined ? progressPercent : 6}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-white/80">{statusLabel}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onCook(recipe)}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:scale-[1.02] hover:bg-white"
          >
            Open cook mode
          </button>
          {currentStep !== undefined ? (
            <button
              type="button"
              onClick={() => onResetProgress?.()}
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-4 py-3 text-xs font-semibold text-white/80 transition hover:border-white/70 hover:bg-white/10"
            >
              Restart
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
