import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { vScrollReveal, initScrollReveal } from './directives/vScrollReveal'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.directive('scroll-reveal', vScrollReveal)
app.mount('#app')
initScrollReveal()