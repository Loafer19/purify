import '@/assets/main.css'
import { createApp } from 'vue'
import Skeleton from '@/pop-up/App.vue'
import router from '@/router'

createApp(Skeleton).use(router).mount('#app')
