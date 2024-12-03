import './css/base.css'

import axios from 'axios';
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { useRoute, ZiggyVue } from 'ziggy-js';
import { i18n, lang } from '@/lang/i18n.js';
import Notify from '@Plugins/Notify'
import TailwindScreen from '@Plugins/TailwindScreen'

import App from './App.vue'

// Configurar axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// Crear instancias globales
window.Lang     = lang;
window.Notify   = new Notify();
window.TwScreen = new TailwindScreen();

async function boot() {
    try {
        const { data } = await axios.get('/api/routes');

        // Iniciar rutas
        window.Ziggy = data;
        window.route = useRoute();
    } catch (error) {
        console.error(error);
        alert('Failed to load routes');
    }

    createApp(App)
        .use(createPinia())
        .use(i18n)
        .use(ZiggyVue)
        .mount('#app');
}

// Iniciar aplicación
boot();
