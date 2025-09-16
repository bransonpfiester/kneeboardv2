import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { DietValue, GoalValue } from '../data/preferences'

interface Preferences {
  goal: GoalValue
  diet: DietValue
}

interface SavoraContextValue {
  preferences: Preferences | null
  onboardingComplete: boolean
  setPreferences: (preferences: Preferences) => void
  resetExperience: () => void
  progress: Record<string, number>
  updateRecipeProgress: (recipeId: string, stepIndex: number) => void
  clearRecipeProgress: (recipeId: string) => void
}

const SavoraContext = createContext<SavoraContextValue | undefined>(undefined)

const PREFERENCES_KEY = 'savora.preferences'
const PROGRESS_KEY = 'savora.progress'

const readPreferences = (): Preferences | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const stored = window.localStorage.getItem(PREFERENCES_KEY)
  if (!stored) {
    return null
  }

  try {
    const parsed = JSON.parse(stored) as Preferences
    if (parsed.goal && parsed.diet) {
      return parsed
    }
  } catch (error) {
    console.warn('Unable to read stored preferences', error)
  }

  return null
}

const readProgress = (): Record<string, number> => {
  if (typeof window === 'undefined') {
    return {}
  }

  const stored = window.localStorage.getItem(PROGRESS_KEY)
  if (!stored) {
    return {}
  }

  try {
    const parsed = JSON.parse(stored) as Record<string, number>
    return parsed
  } catch (error) {
    console.warn('Unable to read stored progress', error)
  }

  return {}
}

export const SavoraProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferencesState] = useState<Preferences | null>(() =>
    readPreferences(),
  )
  const [progress, setProgress] = useState<Record<string, number>>(() =>
    readProgress(),
  )

  const persistPreferences = useCallback((next: Preferences | null) => {
    if (typeof window === 'undefined') {
      return
    }

    if (next) {
      window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(next))
    } else {
      window.localStorage.removeItem(PREFERENCES_KEY)
    }
  }, [])

  const persistProgress = useCallback((next: Record<string, number>) => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next))
  }, [])

  const setPreferences = useCallback(
    (next: Preferences) => {
      setPreferencesState(next)
      persistPreferences(next)
    },
    [persistPreferences],
  )

  const resetExperience = useCallback(() => {
    setPreferencesState(null)
    setProgress({})
    persistPreferences(null)
    persistProgress({})
  }, [persistPreferences, persistProgress])

  const updateRecipeProgress = useCallback(
    (recipeId: string, stepIndex: number) => {
      setProgress((previous) => {
        const updated = { ...previous, [recipeId]: stepIndex }
        persistProgress(updated)
        return updated
      })
    },
    [persistProgress],
  )

  const clearRecipeProgress = useCallback(
    (recipeId: string) => {
      setProgress((previous) => {
        const updated = { ...previous }
        delete updated[recipeId]
        persistProgress(updated)
        return updated
      })
    },
    [persistProgress],
  )

  const value = useMemo(
    () => ({
      preferences,
      onboardingComplete: Boolean(preferences),
      setPreferences,
      resetExperience,
      progress,
      updateRecipeProgress,
      clearRecipeProgress,
    }),
    [preferences, progress, setPreferences, resetExperience, updateRecipeProgress, clearRecipeProgress],
  )

  return <SavoraContext.Provider value={value}>{children}</SavoraContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSavora = () => {
  const context = useContext(SavoraContext)
  if (!context) {
    throw new Error('useSavora must be used within a SavoraProvider')
  }

  return context
}
