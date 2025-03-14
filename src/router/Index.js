import { createRouter, createWebHashHistory } from 'vue-router'
import { hasPermission } from '@Plugins/RolePermission';

import examples from './Examples';

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
            component: () => import('@Layouts/AppLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'index',
                    redirect: '/dashboard'
                },
                {
                    path: 'dashboard',
                    name: 'dashboard.index',
                    component: () => import('@Pages/Dashboard/Index.vue')
                },
                {
                    path: 'profile',
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
                },
            ],
        },
        {
            path: '/admin',
            component: () => import('@Layouts/AppLayout.vue'),
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
                {
                    path: 'roles',
                    children: [
                        {
                            path: '',
                            name: 'admin.roles.index',
                            component: () => import('@Pages/Admin/Roles/Index.vue')
                        },
                        {
                            path: 'create',
                            name: 'admin.roles.create',
                            component: () => import('@Pages/Admin/Roles/Create.vue')
                        }, {
                            path: ':id/edit',
                            name: 'admin.roles.edit',
                            component: () => import('@Pages/Admin/Roles/Edit.vue')
                        }
                    ]
                },
                {
                    path: 'activities',
                    children: [
                        {
                            path: '',
                            name: 'admin.activities.index',
                            beforeEnter: (to, from, next) => can(next, 'activities.index'),
                            component: () => import('@Pages/Admin/Activities/Index.vue')
                        }
                    ]
                }
            ]
        },
        {
            path: '/changelogs',
            component: () => import('@Layouts/AppLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'changelogs.app',
                    component: () => import('@Pages/Changelogs/App.vue')
                },
                {
                    path: 'core',
                    name: 'changelogs.core',
                    component: () => import('@Pages/Changelogs/Core.vue')
                }
            ]
        },
        {
            path: '/auth',
            component: () => import('@Holos/Layout/Auth.vue'),
            children: [
                {
                    path: '',
                    name: 'auth.index',
                    component: () => import('@Pages/Auth/Login.vue')
                },
                {
                    path: 'forgot-password',
                    name: 'auth.forgot-password',
                    component: () => import('@Pages/Auth/ForgotPassword.vue')
                },
                {
                    path: 'reset-password',
                    name: 'auth.reset-password',
                    component: () => import('@Pages/Auth/ResetPassword.vue')
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('@Pages/Errors/404.vue')
        },
        ...examples,
    ]
})

export default router
