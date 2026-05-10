/**
 * Applies supabase/migrations/001_initial_schema.sql via the
 * Supabase Management API.
 *
 * Usage:
 *   node scripts/apply-migration.mjs <SUPABASE_ACCESS_TOKEN>
 *
 * Get your Personal Access Token at:
 *   https://supabase.com/dashboard/account/tokens
 */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))

const PROJECT_REF = 'tvfowvxlasrqbebpokrb'
const token = process.argv[2]

if (!token) {
  console.error('\n❌  Missing access token.\n')
  console.error('  Usage: node scripts/apply-migration.mjs <SUPABASE_ACCESS_TOKEN>')
  console.error('  Get one at: https://supabase.com/dashboard/account/tokens\n')
  process.exit(1)
}

const sql = readFileSync(
  join(__dir, '..', 'supabase', 'migrations', '001_initial_schema.sql'),
  'utf8'
)

console.log(`\n🚀  Applying migration to project ${PROJECT_REF}…\n`)

const res = await fetch(
  `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  }
)

const body = await res.json().catch(() => ({}))

if (!res.ok) {
  console.error(`❌  HTTP ${res.status}:`, JSON.stringify(body, null, 2))
  process.exit(1)
}

console.log('✅  Migration applied successfully!\n')
if (Array.isArray(body) && body.length) {
  console.log('Result rows:', body.length)
}

// Verify tables were created
console.log('\n🔍  Verifying tables…\n')
const checkRes = await fetch(
  `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        select table_name
        from information_schema.tables
        where table_schema = 'public'
          and table_type = 'BASE TABLE'
        order by table_name;
      `,
    }),
  }
)
const tables = await checkRes.json().catch(() => [])
if (Array.isArray(tables)) {
  tables.forEach((row) => console.log('  ✓', row.table_name))
}
console.log()
