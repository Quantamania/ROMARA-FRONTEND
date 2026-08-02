import { createClient } from '@supabase/supabase-js'

// Fall back to harmless placeholders so createClient never throws at module load
// when the env vars aren't configured (e.g. a fresh Vercel deploy). The static
// marketing site then still renders; only live DB calls fail — set the real
// VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY in the Vercel project to enable them.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'public-anon-placeholder'

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
