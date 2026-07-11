import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    appName: 'Romara',
  }),
  getters: {
    welcomeMessage: (state) => `Welcome to ${state.appName}` ,
  },
})
