import { createContext, useContext, useState, useCallback } from 'react'
import { GAMIFICATION_SEED } from '../data/sample'
import { POINTS } from './pointsConfig'
import { BADGE_DEFS } from './badges'

const CTX = createContext(null)

const STORAGE_KEY = 'synora.gamification'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { ...GAMIFICATION_SEED }
  } catch {
    return { ...GAMIFICATION_SEED }
  }
}

function saveState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch {}
}

export function GamificationProvider({ children }) {
  const [state, setState] = useState(loadState)

  const awardPoints = useCallback((userId, action, label) => {
    setState((prev) => {
      const pts = POINTS[action] ?? 0
      const user = prev[userId] ?? { points: 0, streak: 0, badges: [], history: [] }
      const updated = {
        ...prev,
        [userId]: {
          ...user,
          points: user.points + pts,
          history: [
            { action, points: pts, label, at: new Date().toISOString() },
            ...user.history.slice(0, 19),
          ],
        },
      }
      saveState(updated)
      return updated
    })
  }, [])

  const getUser = useCallback((userId) => {
    return state[userId] ?? { points: 0, streak: 0, badges: [], history: [] }
  }, [state])

  const teamSummary = Object.entries(state).map(([id, data]) => ({
    id,
    points: data.points,
    streak: data.streak,
    badges: data.badges,
  }))

  const badgeDefs = BADGE_DEFS

  return (
    <CTX.Provider value={{ awardPoints, getUser, teamSummary, badgeDefs }}>
      {children}
    </CTX.Provider>
  )
}

export function useGamification() {
  const ctx = useContext(CTX)
  if (!ctx) throw new Error('useGamification must be inside GamificationProvider')
  return ctx
}
