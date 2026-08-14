<script setup lang="ts">
/**
 * Owner-only. Everything here goes through SECURITY DEFINER functions that
 * check is_owner() themselves, so hiding this page is convenience, not
 * security — the database refuses these calls regardless of what the UI shows.
 */
import { ref, onMounted } from 'vue'
import { supabase } from '@/shared/api/supabaseClient'
import DataTable from '@/admin/components/DataTable.vue'
import SlideOver from '@/admin/components/SlideOver.vue'

const admins = ref<any[]>([])
const invitations = ref<any[]>([])
const error = ref('')
const notice = ref('')
const working = ref(false)
const loading = ref(true)

const drawerOpen = ref(false)
const active = ref<any>(null)

const inviteOpen = ref(false)
const inviteEmail = ref('')
const inviteRole = ref('editor')

const ROLES = [
  { value: 'owner', label: 'Owner', blurb: 'Everything, including managing this team.' },
  { value: 'manager', label: 'Manager', blurb: 'Everything except managing this team.' },
  { value: 'finance', label: 'Finance', blurb: 'Bookings and payments. Can confirm payments.' },
  { value: 'editor', label: 'Editor', blurb: 'Website content only — tours, blog, testimonials, promotions.' },
]

const columns = [
  { key: 'display_name', label: 'Person', primary: true },
  { key: 'email', label: 'Email' },
  { key: 'role_label', label: 'Role' },
]

function roleLabel(role: string) {
  return ROLES.find((r) => r.value === role)?.label ?? role
}

async function load() {
  loading.value = true
  const [team, invites] = await Promise.all([
    supabase.rpc('list_admins'),
    supabase.from('admin_invitations').select('*').is('accepted_at', null).order('created_at', { ascending: false }),
  ])
  loading.value = false

  if (team.error) {
    error.value = team.error.message
    return
  }
  error.value = ''
  admins.value = (team.data || []).map((a: any) => ({
    ...a,
    display_name: a.full_name || a.email?.split('@')[0] || 'Unnamed',
    role_label: roleLabel(a.role) + (a.is_self ? ' (you)' : ''),
  }))
  invitations.value = invites.data || []
}
onMounted(load)

function openRow(row: any) {
  active.value = { ...row }
  error.value = ''
  drawerOpen.value = true
}

async function call(fn: string, args: Record<string, unknown>, successMsg: string) {
  working.value = true
  const { data, error: err } = await supabase.rpc(fn, args)
  working.value = false

  if (err) {
    error.value = err.message
    return false
  }
  if (data && data.ok === false) {
    error.value = data.message || 'That did not work.'
    return false
  }
  error.value = ''
  notice.value = (data && data.message) || successMsg
  await load()
  return true
}

async function changeRole(role: string) {
  if (await call('set_admin_role', { p_user_id: active.value.id, p_role: role }, 'Role updated.')) {
    active.value.role = role
  }
}

async function removeAdmin() {
  if (!confirm(`Remove admin access for ${active.value.email}? Their account stays, they just lose the panel.`)) return
  if (await call('revoke_admin', { p_user_id: active.value.id }, 'Admin access removed.')) {
    drawerOpen.value = false
  }
}

async function sendInvite() {
  if (!inviteEmail.value.trim()) return
  if (await call('invite_admin', { p_email: inviteEmail.value, p_role: inviteRole.value }, 'Invitation created.')) {
    inviteEmail.value = ''
    inviteOpen.value = false
  }
}

async function cancelInvitation(id: number) {
  const { error: err } = await supabase.from('admin_invitations').delete().eq('id', id)
  if (err) { error.value = err.message; return }
  load()
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="admin-eyebrow">Settings</p>
        <h1 class="admin-title">Admin Team</h1>
      </div>
      <button class="admin-btn shrink-0" @click="inviteOpen = true">+ Add admin</button>
    </div>

    <p v-if="error" class="mb-4 admin-notice">{{ error }}</p>
    <p v-if="notice" class="mb-4 admin-notice">{{ notice }}</p>

    <div class="admin-card overflow-hidden">
      <DataTable
        :columns="columns"
        :rows="admins"
        :empty-label="loading ? 'Loading…' : 'No administrators yet.'"
        @row-click="openRow"
      />
    </div>

    <div v-if="invitations.length" class="mt-8">
      <p class="admin-eyebrow mb-2">Pending invitations</p>
      <div class="admin-card divide-y divide-romara-ink/[0.07]">
        <div
          v-for="inv in invitations"
          :key="inv.id"
          class="flex items-center justify-between gap-4 px-4 py-3"
        >
          <div>
            <p class="text-sm text-romara-ink">{{ inv.email }}</p>
            <p class="text-xs text-romara-ink-soft">
              Becomes {{ roleLabel(inv.role) }} when they sign up with this email.
            </p>
          </div>
          <button class="text-sm text-romara-amber hover:underline" @click="cancelInvitation(inv.id)">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Edit an existing admin -->
    <SlideOver :open="drawerOpen" title="Administrator" @close="drawerOpen = false">
      <div v-if="active" class="space-y-5">
        <div>
          <p class="admin-eyebrow">Person</p>
          <p class="text-romara-ink font-medium">{{ active.display_name }}</p>
          <a :href="`mailto:${active.email}`" class="text-romara-amber hover:underline">{{ active.email }}</a>
        </div>

        <div>
          <p class="admin-eyebrow mb-2">Role</p>
          <div class="space-y-2">
            <label
              v-for="r in ROLES"
              :key="r.value"
              class="flex gap-3 items-start p-3 rounded-card border cursor-pointer transition-colors"
              :class="active.role === r.value
                ? 'border-romara-amber bg-romara-amber-100/40'
                : 'border-romara-ink/10 hover:border-romara-amber/50'"
            >
              <input
                type="radio"
                class="mt-1 accent-romara-amber"
                :value="r.value"
                :checked="active.role === r.value"
                :disabled="working"
                @change="changeRole(r.value)"
              />
              <span>
                <span class="block text-sm font-medium text-romara-ink">{{ r.label }}</span>
                <span class="block text-xs text-romara-ink-soft">{{ r.blurb }}</span>
              </span>
            </label>
          </div>
        </div>

        <div v-if="!active.is_self" class="pt-3 border-t border-romara-ink/10">
          <button class="text-sm text-romara-amber hover:underline" :disabled="working" @click="removeAdmin">
            Remove admin access
          </button>
        </div>
        <p v-else class="text-xs text-romara-ink-soft pt-3 border-t border-romara-ink/10">
          This is you. Another owner has to change or remove your access.
        </p>
      </div>
    </SlideOver>

    <!-- Add a new admin -->
    <SlideOver :open="inviteOpen" title="Add an administrator" @close="inviteOpen = false">
      <form class="space-y-5" @submit.prevent="sendInvite">
        <div>
          <label class="admin-label" for="invite-email">Email address</label>
          <input id="invite-email" v-model="inviteEmail" type="email" required class="admin-input" />
          <p class="text-xs text-romara-ink-soft mt-1.5">
            If they already have an account they get the role immediately. If not, they get it
            automatically the first time they sign up with this address — you never handle
            anyone else's password.
          </p>
        </div>

        <div>
          <p class="admin-label">Role</p>
          <div class="space-y-2">
            <label
              v-for="r in ROLES"
              :key="r.value"
              class="flex gap-3 items-start p-3 rounded-card border cursor-pointer transition-colors"
              :class="inviteRole === r.value
                ? 'border-romara-amber bg-romara-amber-100/40'
                : 'border-romara-ink/10 hover:border-romara-amber/50'"
            >
              <input v-model="inviteRole" type="radio" class="mt-1 accent-romara-amber" :value="r.value" />
              <span>
                <span class="block text-sm font-medium text-romara-ink">{{ r.label }}</span>
                <span class="block text-xs text-romara-ink-soft">{{ r.blurb }}</span>
              </span>
            </label>
          </div>
        </div>

        <button type="submit" class="admin-btn w-full" :disabled="working">
          {{ working ? 'Working…' : 'Add administrator' }}
        </button>
      </form>
    </SlideOver>
  </div>
</template>
