import { useMemo, useState } from 'react'
import {
  DIET_OPTIONS,
  GOAL_OPTIONS,
  type DietValue,
  type GoalValue,
} from '../data/preferences'
import { useSavora } from '../context/SavoraContext'

const STEPS = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'goal', label: 'Choose a goal' },
  { id: 'diet', label: 'Pick your diet' },
  { id: 'confirm', label: 'Confirm & save' },
] as const

type StepId = (typeof STEPS)[number]['id']

const onboardingMessages: Record<StepId, { title: string; copy: string }> = {
  welcome: {
    title: 'Welcome to Savora',
    copy: 'A calm space to build cooking confidence with step-by-step guidance.',
  },
  goal: {
    title: 'What brings you to the kitchen?',
    copy: 'Choose the statement that sounds most like you right now.',
  },
  diet: {
    title: 'Any dietary notes?',
    copy: 'We will keep future recipes aligned with how you like to eat.',
  },
  confirm: {
    title: 'Looks delicious!',
    copy: 'We saved your picks. You can always adjust them later.',
  },
}

interface OnboardingProps {
  onClose: () => void
}

const Onboarding = ({ onClose }: OnboardingProps) => {
  const { preferences, onboardingComplete, setPreferences } = useSavora()
  const initialStep = onboardingComplete ? 1 : 0
  const [stepIndex, setStepIndex] = useState(initialStep)
  const [selectedGoal, setSelectedGoal] = useState<GoalValue | null>(
    preferences?.goal ?? null,
  )
  const [selectedDiet, setSelectedDiet] = useState<DietValue | null>(
    preferences?.diet ?? null,
  )

  const currentStep = STEPS[stepIndex]
  const progressPercent = useMemo(
    () => Math.round((stepIndex / (STEPS.length - 1)) * 100),
    [stepIndex],
  )

  const canProceed = useMemo(() => {
    if (currentStep.id === 'goal') {
      return Boolean(selectedGoal)
    }
    if (currentStep.id === 'diet') {
      return Boolean(selectedDiet)
    }
    if (currentStep.id === 'confirm') {
      return Boolean(selectedGoal && selectedDiet)
    }
    return true
  }, [currentStep.id, selectedDiet, selectedGoal])

  const goNext = () => {
    setStepIndex((value) => Math.min(value + 1, STEPS.length - 1))
  }

  const goBack = () => {
    setStepIndex((value) => Math.max(value - 1, 0))
  }

  const handleConfirm = () => {
    if (!selectedGoal || !selectedDiet) {
      return
    }
    setPreferences({ goal: selectedGoal, diet: selectedDiet })
    onClose()
  }

  const message = onboardingMessages[currentStep.id]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl" aria-hidden />
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 shadow-glass backdrop-blur-2xl sm:p-10">
        {onboardingComplete ? (
          <button
            type="button"
            className="absolute right-6 top-6 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 transition hover:bg-white/20"
            onClick={onClose}
          >
            Close
          </button>
        ) : null}

        <div className="flex items-center gap-4 text-xs uppercase tracking-wider text-white/60">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className={`h-2 w-10 rounded-full transition-all duration-500 ${
                  index <= stepIndex ? 'bg-white/80' : 'bg-white/20'
                }`}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/60">
              Step {stepIndex + 1} of {STEPS.length}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
              {message.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
              {message.copy}
            </p>
          </div>
          <div className="hidden h-20 w-20 shrink-0 rounded-full bg-gradient-to-br from-amber-300/40 via-rose-300/40 to-sky-300/40 blur-xl sm:block" />
        </div>

        <div className="mt-8">
          {currentStep.id === 'welcome' ? (
            <div className="grid gap-4 text-sm text-white/70">
              <p>
                Savora remembers your goals so every recipe feels calm, colorful, and
                approachable. Let&apos;s set the tone for your kitchen.
              </p>
              <button
                type="button"
                onClick={goNext}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-300/80 via-rose-300/70 to-sky-300/80 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-rose-400/20 transition hover:scale-[1.02] hover:shadow-rose-400/30"
              >
                Let&apos;s begin
              </button>
            </div>
          ) : null}

          {currentStep.id === 'goal' ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {GOAL_OPTIONS.map((option) => {
                const isActive = option.value === selectedGoal
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedGoal(option.value)}
                    className={`glass-panel flex flex-col gap-3 rounded-2xl p-5 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 ${
                      isActive
                        ? 'scale-[1.02] border-white/60 bg-white/20 text-white shadow-2xl'
                        : 'hover:border-white/30 hover:bg-white/15'
                    }`}
                  >
                    <span className="text-3xl">{option.emoji}</span>
                    <span className="text-base font-semibold text-white">
                      {option.title}
                    </span>
                    <span className="text-sm text-white/70">{option.description}</span>
                  </button>
                )
              })}
            </div>
          ) : null}

          {currentStep.id === 'diet' ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {DIET_OPTIONS.map((option) => {
                const isActive = option.value === selectedDiet
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedDiet(option.value)}
                    className={`glass-panel flex items-start gap-4 rounded-2xl p-5 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 ${
                      isActive
                        ? 'scale-[1.01] border-white/60 bg-white/18 text-white shadow-2xl'
                        : 'hover:border-white/30 hover:bg-white/12'
                    }`}
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <div>
                      <p className="text-base font-semibold text-white">
                        {option.title}
                      </p>
                      <p className="mt-1 text-sm text-white/70">{option.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : null}

          {currentStep.id === 'confirm' && selectedGoal && selectedDiet ? (
            <div className="glass-panel rounded-2xl p-6 text-sm text-white/80">
              <p className="font-medium text-white/90">Here&apos;s your flavor profile:</p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                  <span className="text-white/70">Goal</span>
                  <span className="font-semibold text-white">
                    {GOAL_OPTIONS.find((goal) => goal.value === selectedGoal)?.title}
                  </span>
                </li>
                <li className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                  <span className="text-white/70">Diet</span>
                  <span className="font-semibold text-white">
                    {DIET_OPTIONS.find((diet) => diet.value === selectedDiet)?.title}
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-xs text-white/60">
                We store these in your browser so Savora can open right where you left off.
              </p>
            </div>
          ) : null}
        </div>

        {currentStep.id !== 'welcome' ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-white/60 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={stepIndex === 0 || (stepIndex === 1 && !onboardingComplete)}
              >
                Back
              </button>
            </div>
            <div className="flex gap-3">
              {currentStep.id === 'confirm' ? (
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-300/90 via-teal-300/80 to-cyan-300/90 px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-400/30 transition hover:scale-[1.02] hover:shadow-emerald-400/40 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!canProceed}
                >
                  Save and continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center justify-center rounded-full bg-white/80 px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-lg transition hover:scale-[1.02] hover:bg-white"
                  disabled={!canProceed}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        ) : null}

        <div className="sr-only" aria-hidden>
          Progress {progressPercent} percent
        </div>
      </div>
    </div>
  )
}

export default Onboarding
