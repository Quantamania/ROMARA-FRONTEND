import { ref } from 'vue'
import { supabase } from '@/shared/api/supabaseClient'

const isAdmin = ref(false)
const isLoading = ref(true)
const adminName = ref<string | null>(null)

async function checkAdminStatus() {
  isLoading.value = true
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    isAdmin.value = false
    isLoading.value = false
    return
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin, full_name')
    .eq('id', user.id)
    .single()

  isAdmin.value = profile?.is_admin ?? false
  adminName.value = profile?.full_name ?? user.email ?? null
  isLoading.value = false
}

async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  await checkAdminStatus()
}

async function signOut() {
  await supabase.auth.signOut()
  isAdmin.value = false
  adminName.value = null
}

export function useAdminAuth() {
  return { isAdmin, isLoading, adminName, checkAdminStatus, signIn, signOut }
}
