import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { DEMO_USERS, ROLES } from './roles'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { SUPER_ADMIN_USER } from '../data/adminSample'

const AuthContext = createContext(null)

const STORAGE_KEY = 'synora.auth.user'

function mapSupabaseUser(row) {
  return {
    id: row.id,
    name: row.name,
    initials: row.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
    role: row.role,
    phone: row.phone,
    email: row.email,
    company_id: row.company_id,
    project: 'Synora Project',
    zone: row.role === 'warehouse_manager' ? 'Warehouse' : 'All zones',
    points: row.points ?? 0,
    isRealUser: true,
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On mount: restore session from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {}
    setLoading(false)
  }, [])

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  // Demo login (always available)
  const loginAs = useCallback((roleId) => {
    const u = DEMO_USERS[roleId]
    if (u) setUser(u)
  }, [])

  // Real login via Supabase (phone + PIN)
  const loginReal = useCallback(async (phone, pin) => {
    if (!isSupabaseConfigured) {
      return { error: 'Supabase is not configured. Use demo mode.' }
    }
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('phone', phone.trim())
      .eq('pin', pin.trim())
      .eq('active', true)
      .single()

    if (error || !data) {
      return { error: 'Invalid phone or PIN. Please try again.' }
    }
    setUser(mapSupabaseUser(data))
    return { error: null }
  }, [])

  // Admin login via Supabase Auth (email + password)
  const loginAdmin = useCallback(async (email, password) => {
    if (!isSupabaseConfigured) {
      // Allow demo admin login without Supabase
      if (email === 'admin@synora.io' && password === 'admin') {
        setUser({ ...SUPER_ADMIN_USER })
        return { error: null }
      }
      return { error: 'Supabase is not configured. Use admin@synora.io / admin for demo.' }
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error: error.message }

    // Look up their record in the users table
    const { data: row } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('role', 'super_admin')
      .single()

    if (!row) {
      await supabase.auth.signOut()
      return { error: 'No super admin account found for this email.' }
    }
    setUser(mapSupabaseUser(row))
    return { error: null }
  }, [])

  const logout = useCallback(async () => {
    if (isSupabaseConfigured && user?.isRealUser) {
      await supabase.auth.signOut().catch(() => {})
    }
    setUser(null)
  }, [user])

  const role = user ? (ROLES[user.role] ?? null) : null

  return (
    <AuthContext.Provider value={{ user, role, loading, loginAs, loginReal, loginAdmin, logout, isSupabaseConfigured }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
