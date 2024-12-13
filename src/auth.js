import './css/base.css'

import axios from 'axios';
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { useRoute, ZiggyVue } from 'ziggy-js';
import { i18n, lang } from '@/lang/i18n.js';
import router from '@Router/Auth'
import Notify from '@Plugins/Notify'
import TailwindScreen from '@Plugins/TailwindScreen'
import { pagePlugin } from '@Services/Page';

import Auth from '@Holos/Layout/Auth.vue'

// Configurar axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Crear instancias globales
window.Lang     = lang;
window.Notify   = new Notify();
window.TwScreen = new TailwindScreen();

async function boot() {
    try {
        const { data } = await axios.get(import.meta.env.VITE_API_URL + '/api/routes');

        // Iniciar rutas
        window.Ziggy = data;
        window.route = useRoute();
    } catch (error) {
        console.error(error);
        alert('Failed to load routes');
    }

    createApp(Auth)
        .use(createPinia())
        .use(i18n)
        .use(pagePlugin)
        .use(router)
        .use(ZiggyVue)
        .mount('#app');
}

// Iniciar aplicación
boot();
