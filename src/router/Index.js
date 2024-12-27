import { createRouter, createWebHashHistory } from 'vue-router'
import { hasPermission } from '@Plugins/RolePermission';

function can(next, can) {
    if (!hasPermission(can)) {
        next({ name: '404' });
    } else {
        next();
    }
}

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@Pages/Dashboard/Index.vue')
        }, {
            path: '/profile',
            children: [
                {
                    path: '',
                    name: 'profile.show',
                    component: () => import('@Pages/Profile/Show.vue')
                },
                {
                    path: 'notifications',
                    children: [
                        {
                            path: '',
                            name: 'profile.notifications.index',
                            component: () => import('@Pages/Profile/Notifications/Index.vue')
                        }
                    ]
                },
            ]
        }, {
            path: '/admin',
            children: [
                {
                    path: 'users',
                    children: [
                        {
                            path: '',
                            name: 'admin.users.index',
                            beforeEnter: (to, from, next) => can(next, 'users.index'),
                            component: () => import('@Pages/Admin/Users/Index.vue')
                        },
                        {
                            path: 'online',
                            name: 'admin.users.online',
                            beforeEnter: (to, from, next) => can(next, 'users.online'),
                            component: () => import('@Pages/Admin/Users/Online.vue')
                        },
                        {
                            path: 'create',
                            name: 'admin.users.create',
                            beforeEnter: (to, from, next) => can(next, 'users.create'),
                            component: () => import('@Pages/Admin/Users/Create.vue')
                        }, {
                            path: ':id/edit',
                            name: 'admin.users.edit',
                            beforeEnter: (to, from, next) => can(next, 'users.edit'),
                            component: () => import('@Pages/Admin/Users/Edit.vue')
                        }, {
                            path: ':id/settings',
                            name: 'admin.users.settings',
                            beforeEnter: (to, from, next) => can(next, 'users.settings'),
                            component: () => import('@Pages/Admin/Users/Settings.vue')
                        }
                    ]
                },
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('@Pages/Errors/404.vue')
        }
    ]
})

export default router
