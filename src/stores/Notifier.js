import { defineStore } from 'pinia'
import { api } from '@Services/Api'
import { page } from '@Services/Page'
import { hasPermission } from '@Plugins/RolePermission'
import { boot as bootAuthUsers, addUser, removeUser } from '@Plugins/AuthUsers'

/** Propiedades */
const hasNotifications = import.meta.env.VITE_REVERB_ACTIVE === 'true';

// Almacenar estado de la barra lateral derecha
const useNotifier = defineStore('notifier', {
    state: () => ({
        counter: 0,
        unreadClosedCounter: 0,
        notifications: [],
        isStarted: false,
        user_id: 0,
    }),
    actions: {
        // Iniciar instancia
        boot() {
            if(!this.isStarted && hasNotifications) {
                this.user_id = page.user.id;

                this.subscribeGLobalNotifications();
                this.subscribeUserNotifications();
                this.suscribeAuthUsers();
                this.isStarted = true;

                this.getUpdates();
            }
        },
        // Detener instancia
        stop() {
            if(this.isStarted) {
              this.unsubscribeUserNotification();
              this.unsubscribeGlobalNotification();
        
              this.started.value = false;
            }
        },
        // Notificaciones Globales
        subscribeGLobalNotifications() {
            Echo.private('Global')
                .listen('Notification', e => {
                    Notify[e.type](e.message, e.title, e.timeout)
                    this.getUpdates()
                });

        },
        unsubscribeGlobalNotifications() {
            Echo.leave('Global');
        },
        // Usuarios logueados
        suscribeAuthUsers() {
            if(hasPermission('users.index')) {
                Echo.join('online')
                .here((users) => {
                    bootAuthUsers(users);
                })
                .joining((user) => {
                    addUser(user);
                })
                .leaving((user) => {
                    removeUser(user);
                });
            } else {
                Echo.join('online');
            }
        },
        // Notificaciones del usuario
        subscribeUserNotifications() {
            Echo.private(`App.Models.User.${this.user_id}`)
                .notification(x => {
                    Notify[x.typeNotification](x.description, x.title, x.timeout)
                    this.getUpdates()
                })
        },
        unsubscribeUserNotification() {
            Echo.leave(`App.Models.User.${this.user_id}`);
        },
        readNotification(id) {
            api.post(route('system.notifications.read'), {
                data: {
                    id
                },
                onSuccess: res => {
                    this.getUpdates();
                },
                onFailed: res => {
                    this.getUpdates();
                }
            })
        },
        closeNotification(id) {
            api.post(route('system.notifications.close'), {
                data: {
                    id
                },
                onSuccess: res => {
                    this.getUpdates();
                },
                onFailed: res => {
                    this.getUpdates();
                }
            })
        },
        getUpdates() {
            api.get(route('system.notifications.all-unread'), {
                onSuccess: res => {
                    this.counter = res.total;
                    this.unreadClosedCounter = res.unread_closed;
                    this.notifications = res.notifications;
                },
                onFailed: res => {
                    console.log('error', res)
                }
            })
        }
    }
})

export default useNotifier