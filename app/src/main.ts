import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { vScrollReveal } from './directives/vScrollReveal'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.directive('scroll-reveal', vScrollReveal)
// Note: the old global initScrollReveal() MutationObserver was removed — it
// re-scanned the whole DOM on every class mutation (major scroll/hover jank in
// production). The v-scroll-reveal directive already handles each element on mount.
app.mount('#app')
// Service worker: registered after the app mounts so it never delays first
// paint. autoUpdate means a new deploy is picked up on the next visit without
// the user having to hard-refresh.
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })
