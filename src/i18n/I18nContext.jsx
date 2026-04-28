import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DICT } from './dict'

const I18nContext = createContext(null)

const STORAGE_KEY = 'synora.lang'
const DEFAULT_LANG = 'en'

function getNested(obj, path) {
  return path.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), obj)
}

function format(str, vars) {
  if (typeof str !== 'string' || !vars) return str
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? String(vars[k]) : `{${k}}`))
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANG
    const urlLang = new URLSearchParams(window.location.search).get('lang')
    if (urlLang === 'es' || urlLang === 'en') return urlLang
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved === 'es' || saved === 'en' ? saved : DEFAULT_LANG
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang)
      document.documentElement.lang = lang
    }
  }, [lang])

  const setLang = useCallback((next) => {
    if (next === 'es' || next === 'en') setLangState(next)
  }, [])

  const t = useCallback(
    (key, vars) => {
      const dict = DICT[lang] || DICT[DEFAULT_LANG]
      const fallback = DICT[DEFAULT_LANG]
      const value = getNested(dict, key) ?? getNested(fallback, key) ?? key
      return format(value, vars)
    },
    [lang],
  )

  const tr = useCallback(
    (obj, key) => {
      if (!obj) return ''
      if (lang === 'es') {
        const v = obj[`${key}_es`]
        if (v != null) return v
      }
      return obj[key] ?? ''
    },
    [lang],
  )

  const tz = useCallback(
    (zone) => {
      const dict = DICT[lang]?.zones || {}
      return dict[zone] ?? zone
    },
    [lang],
  )

  const formatDate = useCallback(
    (date = new Date()) => {
      try {
        return new Intl.DateTimeFormat(lang === 'es' ? 'es-MX' : 'en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        }).format(date)
      } catch {
        return date.toDateString()
      }
    },
    [lang],
  )

  const value = useMemo(
    () => ({ lang, setLang, t, tr, tz, formatDate }),
    [lang, setLang, t, tr, tz, formatDate],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
