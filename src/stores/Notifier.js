import { defineStore } from 'pinia'
import { usePage } from '@inertiajs/vue3';
import axios from 'axios';

/** Definidores */
const page = usePage();

/** Propiedades */
const hasNotifications = import.meta.env.VITE_REVERB_ACTIVE === 'true';

// Almacenar estado de la barra lateral derecha
const useNotifier = defineStore('notifier', {
    state: () => ({
        counter: 0,
        notifications: [],
        isStarted: false,
        user_id: 0,
    }),
    actions: {
        // Iniciar instancia
        boot() {
            if(!this.isStarted && hasNotifications) {
                this.user_id = page.props.auth.user.id;

                this.subscribeGLobalNotifications();
                this.subscribeUserNotifications();

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
        // Notificaciones del usuario
        subscribeUserNotifications() {
            Echo.private(`App.Models.User.${this.user_id}`)
                .notification(x => {
                    console.log(x)
                    Notify[x.typeNotification](x.description, x.title, x.timeout)
                    this.getUpdates()
                })
        },
        unsubscribeUserNotification() {
            Echo.leave(`App.Models.User.${this.user_id}`);
        },
        readNotification(id) {
            axios.post(route('system.notifications.read'), {
                id,
            }).then(res => {
                Notify.success(lang('notifications.readed'))
                this.getUpdates();
            }).catch(res => {
                Notify.error(lang('error'))
                this.getUpdates();
            })
        },
        getUpdates() {
            axios.get(route('system.notifications.all-unread')).then(res => {
                this.counter = res.data.total;
                this.notifications = res.data.notifications;
            }).catch(res => {
                console.log('error', res)
            })
        }
    }
})

export default useNotifier