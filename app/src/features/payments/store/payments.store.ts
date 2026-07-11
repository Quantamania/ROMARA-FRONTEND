import { defineStore } from 'pinia'
export const usePaymentsStore = defineStore('payments', { state: () => ({ status: 'idle' as string }) })
