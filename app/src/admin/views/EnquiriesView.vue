<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/shared/api/supabaseClient'
import DataTable from '@/admin/components/DataTable.vue'
import StatusStamp from '@/admin/components/StatusStamp.vue'
import SlideOver from '@/admin/components/SlideOver.vue'

const items = ref<any[]>([])
const drawerOpen = ref(false)
const active = ref<any>(null)

const replies = ref<any[]>([])
const replyBody = ref('')
const sending = ref(false)
const feedback = ref<{ kind: 'ok' | 'error'; text: string } | null>(null)

const columns = [
  { key: 'name', label: 'From', primary: true },
  { key: 'phone', label: 'Phone' },
  { key: 'status', label: 'Status' },
]

async function load() {
  const { data } = await supabase.from('enquiries').select('id, name, email, phone, subject, message, status, created_at').order('created_at', { ascending: false })
  items.value = data || []
}
onMounted(load)

async function loadReplies(enquiryId: number) {
  const { data } = await supabase
    .from('enquiry_replies')
    .select('*')
    .eq('enquiry_id', enquiryId)
    .order('created_at', { ascending: true })
  replies.value = data || []
}

function openRow(row: any) {
  active.value = { ...row }
  replyBody.value = ''
  feedback.value = null
  replies.value = []
  drawerOpen.value = true
  loadReplies(row.id)
}

async function setStatus(status: string) {
  await supabase.from('enquiries').update({ status }).eq('id', active.value.id)
  active.value.status = status
  load()
}

/**
 * reply_to_enquiry stores the reply, queues the customer email and flips the
 * status to 'responded' in one transaction — so the panel can never show a
 * reply that was never actually sent.
 */
async function sendReply() {
  if (!replyBody.value.trim() || sending.value) return
  sending.value = true
  feedback.value = null

  const { data, error } = await supabase.rpc('reply_to_enquiry', {
    p_enquiry_id: active.value.id,
    p_body: replyBody.value,
  })
  sending.value = false

  if (error) {
    feedback.value = { kind: 'error', text: error.message }
    return
  }
  if (!data?.ok) {
    feedback.value = { kind: 'error', text: data?.message || 'The reply could not be sent.' }
    return
  }

  feedback.value = { kind: 'ok', text: `Reply queued for ${data.sent_to}.` }
  replyBody.value = ''
  active.value.status = 'responded'
  await Promise.all([loadReplies(active.value.id), load()])
}

function formatDate(value: string) {
  return new Date(value).toLocaleString()
}
</script>

<template>
  <div>
    <p class="admin-eyebrow">Enquiries & bookings</p>
    <h1 class="admin-title">Enquiries</h1>
    <span class="admin-title-rule" />

    <div class="admin-card overflow-hidden">
      <DataTable :columns="columns" :rows="items" empty-label="No enquiries yet." @row-click="openRow">
        <template #cell-status="{ row }"><StatusStamp :status="row.status" /></template>
      </DataTable>
    </div>

    <SlideOver :open="drawerOpen" title="Enquiry" @close="drawerOpen = false">
      <div v-if="active" class="space-y-4">
        <div>
          <p class="admin-eyebrow">From</p>
          <p class="text-romara-ink font-medium">{{ active.name }}</p>
        </div>
        <div v-if="active.email">
          <p class="admin-eyebrow">Email</p>
          <a :href="`mailto:${active.email}`" class="text-romara-amber hover:underline">{{ active.email }}</a>
        </div>
        <div v-if="active.phone">
          <p class="admin-eyebrow">Phone</p>
          <a :href="`tel:${active.phone}`" class="text-romara-amber hover:underline">{{ active.phone }}</a>
        </div>
        <div>
          <p class="admin-eyebrow">Message</p>
          <p class="text-romara-ink whitespace-pre-wrap">{{ active.message }}</p>
        </div>

        <div v-if="replies.length" class="pt-3 border-t border-romara-ink/10">
          <p class="admin-eyebrow mb-2">
            Replies sent ({{ replies.length }})
          </p>
          <div
            v-for="reply in replies"
            :key="reply.id"
            class="mb-3 bg-romara-bone border border-romara-ink/10 rounded-card p-3"
          >
            <p class="text-romara-ink text-sm whitespace-pre-wrap">{{ reply.body }}</p>
            <p class="text-xs text-romara-ink/50 mt-2">
              to {{ reply.sent_to }} · {{ formatDate(reply.created_at) }}
            </p>
          </div>
        </div>

        <div class="pt-3 border-t border-romara-ink/10">
          <label class="admin-eyebrow block mb-1" for="reply-body">
            Reply to {{ active.name }}
          </label>
          <textarea
            id="reply-body"
            v-model="replyBody"
            rows="5"
            class="admin-input"
            placeholder="Type your reply — this is emailed to the customer."
          />

          <p
            v-if="feedback"
            class="mt-2 text-sm"
            :class="feedback.kind === 'ok' ? 'text-romara-green' : 'text-romara-amber-dark'"
          >
            {{ feedback.text }}
          </p>

          <button
            class="mt-2 w-full bg-romara-amber text-white text-sm font-medium rounded-card py-2.5 disabled:opacity-50"
            :disabled="sending || !replyBody.trim()"
            @click="sendReply"
          >
            {{ sending ? 'Sending…' : 'Send reply' }}
          </button>
          <p class="text-xs text-romara-ink/50 mt-1.5">
            Sending marks this enquiry as responded.
          </p>
        </div>

        <div class="pt-3 border-t border-romara-ink/10 flex gap-2">
          <button
            class="admin-btn-confirm flex-1"
            :disabled="active.status === 'responded'"
            @click="setStatus('responded')"
          >
            Mark responded
          </button>
          <button
            class="admin-btn-ghost flex-1"
            :disabled="active.status === 'closed'"
            @click="setStatus('closed')"
          >
            Close
          </button>
        </div>
      </div>
    </SlideOver>
  </div>
</template>
