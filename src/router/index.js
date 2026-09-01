import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '@/pages/Home.vue'
import Shell from '@/pages/Shell.vue'
import SiteDetail from '@/pages/SiteDetail.vue'

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            component: Shell,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: Home,
                },
                {
                    path: 'site/:key',
                    name: 'site',
                    component: SiteDetail,
                },
            ],
        },
    ],
})

export default router
