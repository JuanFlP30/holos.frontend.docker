import './css/base.css'

import axios from 'axios';
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { useRoute, ZiggyVue } from 'ziggy-js';
import { i18n, lang } from '@/lang/i18n.js';
import router from '@Router/Index'
import Notify from '@Plugins/Notify'
import TailwindScreen from '@Plugins/TailwindScreen'
import { pagePlugin } from '@Services/Page';
import { reloadApp,view } from '@Services/Page';

import App from '@Layouts/AppLayout.vue'

// Configurar axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Crear instancias globales
window.axios    = axios;
window.Lang     = lang;
window.Notify   = new Notify();
window.TwScreen = new TailwindScreen();

async function boot() {
    try {
        const routes = await axios.get(import.meta.env.VITE_API_URL + '/api/resources/routes');

        // Iniciar rutas
        window.Ziggy = routes.data;
        window.route = useRoute();
        window.view = view;
    } catch (error) {
        console.error(error);
        alert('Failed to load routes');
    }

    if(import.meta.env.VITE_REVERB_ACTIVE === 'true') {
        await import('@Services/Broadcast')
    }

    reloadApp();

    createApp(App)
        .use(createPinia())
        .use(i18n)
        .use(pagePlugin)
        .use(router)
        .use(ZiggyVue)
        .mount('#app');
}

// Iniciar aplicación
boot();
