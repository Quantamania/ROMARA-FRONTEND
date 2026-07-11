import { defineStore } from 'pinia'
export const usePackagesStore = defineStore('packages', { state: () => ({ items: [] as unknown[] }), })
