import { supabase, isSupabaseConfigured } from '@/shared/api/supabaseClient'

export interface SubscribeResult {
  ok: boolean
  /** The address was already on the list — still a success for the visitor. */
  alreadySubscribed?: boolean
  /** User-facing message when ok is false. */
  error?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Subscribe an email to the newsletter.
 *
 * Follows the same graceful-degradation pattern as blog.api / packages.api:
 * when Supabase isn't configured (e.g. a static demo deploy) it accepts the
 * address optimistically so the UI still works, but does not pretend a row was
 * written. To make it persist for real, set VITE_SUPABASE_URL /
 * VITE_SUPABASE_ANON_KEY and create the newsletter_subscribers table:
 *
 *   create table if not exists public.newsletter_subscribers (
 *     id uuid primary key default gen_random_uuid(),
 *     email text not null unique,
 *     created_at timestamptz not null default now()
 *   );
 *   alter table public.newsletter_subscribers enable row level security;
 *   -- Allow the public site to add addresses, but never read the list back.
 *   create policy "anon can subscribe"
 *     on public.newsletter_subscribers for insert to anon with check (true);
 *
 * The `source` argument is kept out of the insert so it matches a minimal
 * (email-only) table. To capture where a signup came from, add a
 * `source text` column and include it in the insert below.
 */
export async function subscribeToNewsletter(
  rawEmail: string,
  _source = 'website',
): Promise<SubscribeResult> {
  const email = rawEmail.trim().toLowerCase()

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  if (!isSupabaseConfigured) {
    console.warn('[newsletter] Supabase not configured — subscription not persisted:', email)
    return { ok: true }
  }

  const { error } = await supabase.from('newsletter_subscribers').insert({ email })

  if (error) {
    // 23505 = unique_violation → the address is already subscribed.
    if (error.code === '23505') return { ok: true, alreadySubscribed: true }
    console.error('[newsletter] subscribe failed:', error.message)
    return { ok: false, error: 'Something went wrong. Please try again.' }
  }

  return { ok: true }
}
