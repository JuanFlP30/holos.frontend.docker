import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@Pages/Auth/Login.vue')
        },
        {
            path: '/forgot-password',
            name: 'forgot-password',
            component: () => import('@Pages/Auth/ForgotPassword.vue')
        },
        {
            path: '/reset-password',
            name: 'reset-password',
            component: () => import('@Pages/Auth/ResetPassword.vue')
        }
    ]
})

export default router
