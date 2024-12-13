import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@Pages/Dashboard/Index.vue')
        }, {
            path: '/profile',
            name: 'profile.show',
            component: () => import('@Pages/Profile/Show.vue')
        }, {
            path: '/admin',
            children: [
                {
                    path: 'users',
                    children: [
                        {
                            path: '',
                            name: 'admin.users.index',
                            component: () => import('@Pages/Admin/Users/Index.vue')
                        },
                        {
                            path: 'create',
                            name: 'admin.users.create',
                            component: () => import('@Pages/Admin/Users/Create.vue')
                        }, {
                            path: ':id/edit',
                            name: 'admin.users.edit',
                            component: () => import('@Pages/Admin/Users/Edit.vue')
                        }, {
                            path: ':id/settings',
                            name: 'admin.users.settings',
                            component: () => import('@Pages/Admin/Users/Settings.vue')
                        }
                    ]
                },
            ]
        }
    ]
})

export default router
