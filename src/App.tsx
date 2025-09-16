import { useEffect, useState } from 'react'
import CookMode from './components/CookMode'
import HomeView from './components/HomeView'
import Onboarding from './components/Onboarding'
import { SavoraProvider, useSavora } from './context/SavoraContext'
import type { Recipe } from './data/recipes'

const AppShell = () => {
  const { onboardingComplete } = useSavora()
  const [showOnboarding, setShowOnboarding] = useState(!onboardingComplete)
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null)

  useEffect(() => {
    if (!onboardingComplete) {
      setShowOnboarding(true)
    }
  }, [onboardingComplete])

  useEffect(() => {
    const shouldLock = showOnboarding || Boolean(activeRecipe)
    document.body.classList.toggle('overflow-hidden', shouldLock)
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [activeRecipe, showOnboarding])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-aurora-1 opacity-80" aria-hidden />
      <div className="relative z-0 flex min-h-screen flex-col">
        <HomeView
          onCook={(recipe) => setActiveRecipe(recipe)}
          onOpenOnboarding={() => setShowOnboarding(true)}
        />
      </div>
      {showOnboarding ? <Onboarding onClose={() => setShowOnboarding(false)} /> : null}
      {activeRecipe ? (
        <CookMode
          recipe={activeRecipe}
          onClose={() => {
            setActiveRecipe(null)
          }}
        />
      ) : null}
    </div>
  )
}

const App = () => (
  <SavoraProvider>
    <AppShell />
  </SavoraProvider>
)

export default App
