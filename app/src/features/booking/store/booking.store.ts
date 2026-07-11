import { defineStore } from 'pinia'
export const useBookingStore = defineStore('booking', { state: () => ({ selectedExperience: null as string | null }) })
