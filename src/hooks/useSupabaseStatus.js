import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

// Possible values: 'checking' | 'connected' | 'offline' | 'not_configured'
export function useSupabaseStatus() {
  const [status, setStatus] = useState(
    isSupabaseConfigured ? 'checking' : 'not_configured'
  )

  useEffect(() => {
    if (!isSupabaseConfigured) return

    let cancelled = false

    async function check() {
      try {
        // Fetch a single row from companies — lightweight real-data probe.
        // If the table doesn't exist yet (migration not run) we still get an
        // HTTP response, which means the service is reachable → "connected".
        const { error } = await supabase
          .from('companies')
          .select('id')
          .limit(1)

        if (cancelled) return

        // A PostgREST error (wrong table, RLS, etc.) still means we reached
        // Supabase successfully. Only a network/fetch failure means offline.
        const isNetworkError =
          !error ||
          error.message?.toLowerCase().includes('fetch') ||
          error.message?.toLowerCase().includes('network') ||
          error.message?.toLowerCase().includes('failed')

        if (error && isNetworkError && !error.code) {
          setStatus('offline')
        } else {
          setStatus('connected')
        }
      } catch {
        if (!cancelled) setStatus('offline')
      }
    }

    check()
    return () => { cancelled = true }
  }, [])

  return status
}
