import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';

// Almacenar estado de las notificaciones
const useNotification = defineStore('notifications', {
    state: () => ({
        notifications: [],
    }),
    getters: {
        getNotifications(state) {
            return state.notifications
        }
    },
    actions: {
        boot() {
            let local = localStorage.getItem('notifications')

            if(local) {
                this.notifications = JSON.parse(localStorage.getItem('notifications'))
            }
        },
        add({
            title = '',
            message = '',
            type = 'info',
            preserve = false
        }) {
            this.notifications.push({
                uuid: uuidv4(),
                title,
                message,
                type,
                preserve
            })

            this.save()
        },
        delete(uuid) {
            this.notifications = this.notifications.filter(x => {
                return x.uuid != uuid
            })
            
            this.save()
        },
        save() {
            localStorage.setItem('notifications', JSON.stringify(this.notifications.filter(x => {
                return x.preserve == true
            } )))
        }
    },
})

export default useNotification