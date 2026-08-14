import { ref } from 'vue'
import { supabase } from '@/shared/api/supabaseClient'

const isAdmin = ref(false)
const isLoading = ref(true)
const adminName = ref<string | null>(null)
const adminRole = ref<string | null>(null)

/**
 * The router guard awaits checkAdminStatus() before every admin navigation, so
 * what it does dominates how fast the panel feels.
 *
 * It used to call supabase.auth.getUser(), which asks the auth server over the
 * network, and then query profiles — two round trips (~380ms against the hosted
 * project) blocking every single click.
 *
 * Now it reads the session locally and remembers the profile lookup for the
 * user it verified, so navigating between admin pages costs no network at all.
 * This is a UX cache only: RLS still enforces every read and write server-side,
 * so a stale flag here cannot grant access to anything.
 */
let verifiedUserId: string | null = null
let inFlight: Promise<void> | null = null

async function loadProfile(userId: string, fallbackEmail: string | null) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin, full_name, role')
    .eq('id', userId)
    .maybeSingle()

  isAdmin.value = profile?.is_admin ?? false
  adminRole.value = profile?.role ?? null
  adminName.value = profile?.full_name ?? fallbackEmail
  // Only cache a positive result; a failed check should be retried.
  verifiedUserId = isAdmin.value ? userId : null
}

async function checkAdminStatus(force = false) {
  // getSession() reads the persisted session from local storage and refreshes
  // it only when it has actually expired — no request on the happy path.
  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user ?? null

  if (!user) {
    isAdmin.value = false
    adminName.value = null
    adminRole.value = null
    verifiedUserId = null
    isLoading.value = false
    return
  }

  if (!force && verifiedUserId === user.id) {
    isLoading.value = false
    return
  }

  // Collapse concurrent callers (guard + layout mounting together) into one request.
  if (inFlight) {
    await inFlight
    return
  }

  isLoading.value = true
  inFlight = loadProfile(user.id, user.email ?? null).finally(() => {
    isLoading.value = false
    inFlight = null
  })
  await inFlight
}

async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  verifiedUserId = null
  await checkAdminStatus(true)
}

async function signOut() {
  await supabase.auth.signOut()
  isAdmin.value = false
  adminName.value = null
  adminRole.value = null
  verifiedUserId = null
}

/**
 * Convenience for hiding UI a role cannot use. Not a security boundary — every
 * privileged action is re-checked in the database, which is what actually
 * stops an editor confirming a payment.
 */
function canAny(...roles: string[]) {
  return adminRole.value !== null && roles.includes(adminRole.value)
}

export function useAdminAuth() {
  return { isAdmin, isLoading, adminName, adminRole, canAny, checkAdminStatus, signIn, signOut }
}
