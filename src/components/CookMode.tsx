import { useEffect, useMemo, useState } from 'react'
import { useSavora } from '../context/SavoraContext'
import type { Recipe } from '../data/recipes'

interface CookModeProps {
  recipe: Recipe
  onClose: () => void
}

const CookMode = ({ recipe, onClose }: CookModeProps) => {
  const { progress, updateRecipeProgress, clearRecipeProgress } = useSavora()
  const [stepIndex, setStepIndex] = useState(progress[recipe.id] ?? 0)

  useEffect(() => {
    setStepIndex(progress[recipe.id] ?? 0)
  }, [progress, recipe.id])

  const totalSteps = recipe.steps.length

  const progressPercent = useMemo(
    () => Math.round(((stepIndex + 1) / totalSteps) * 100),
    [stepIndex, totalSteps],
  )

  const goToStep = (index: number) => {
    const next = Math.min(Math.max(index, 0), totalSteps - 1)
    setStepIndex(next)
    updateRecipeProgress(recipe.id, next)
  }

  const handleNext = () => {
    if (stepIndex >= totalSteps - 1) {
      updateRecipeProgress(recipe.id, totalSteps - 1)
      onClose()
      return
    }
    goToStep(stepIndex + 1)
  }

  const handleBack = () => {
    goToStep(stepIndex - 1)
  }

  const handleReset = () => {
    clearRecipeProgress(recipe.id)
    setStepIndex(0)
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl" aria-hidden />
      <div className="glass-panel relative w-full max-w-4xl overflow-hidden rounded-3xl p-6 sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-70" aria-hidden />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Cook mode</p>
                <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                  {recipe.title}
                </h2>
                <p className="mt-2 text-sm text-white/75">{recipe.description}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white/70 hover:bg-white/10"
              >
                Exit
              </button>
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
                <span>
                  Step {stepIndex + 1} of {totalSteps}
                </span>
                <span>{progressPercent}% complete</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-300/90 via-teal-300/80 to-sky-300/90 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-950/40 p-6 text-lg leading-relaxed text-slate-50 shadow-inner shadow-[inset_0_35px_60px_-35px_rgba(15,23,42,0.65)]">
              {recipe.steps[stepIndex]}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={stepIndex === 0}
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/70 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:scale-[1.02] hover:bg-white"
                >
                  {stepIndex === totalSteps - 1 ? 'Finish' : 'Next step'}
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/75 transition hover:border-white/70 hover:bg-white/10"
                >
                  Reset progress
                </button>
              </div>
            </div>
          </div>

          <aside className="glass-panel relative overflow-hidden rounded-3xl p-6">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-300/20 via-white/10 to-transparent opacity-70" aria-hidden />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Ingredients</p>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                {recipe.ingredients.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-3 text-left"
                  >
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/70" aria-hidden />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default CookMode
