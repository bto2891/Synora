import { createContext, useContext, useEffect, useState } from 'react'
import { DEMO_USERS, ROLES } from './roles'

const AuthContext = createContext(null)

const STORAGE_KEY = 'synora.auth.user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const loginAs = (roleId) => {
    const u = DEMO_USERS[roleId]
    if (u) setUser(u)
  }

  const logout = () => setUser(null)

  const role = user ? ROLES[user.role] : null

  return (
    <AuthContext.Provider value={{ user, role, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
