import './css/base.css'

import axios from 'axios';
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { useRoute, ZiggyVue } from 'ziggy-js';
import { i18n, lang } from '@Lang/i18n.js';
import router from '@Router/Index'
import Notify from '@Plugins/Notify'
import { bootPermissions, bootRoles } from '@Plugins/RolePermission';
import TailwindScreen from '@Plugins/TailwindScreen'
import { pagePlugin } from '@Services/Page';
import { defineApp, reloadApp, view } from '@Services/Page';
import { apiURL } from '@Services/Api';

import App      from '@Components/App.vue'
import Error503 from '@Pages/Errors/503.vue'
import { hasToken } from './services/Api';

// Configurar axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Elementos globales
window.axios    = axios;
window.Lang     = lang;
window.Notify   = new Notify();
window.TwScreen = new TailwindScreen();

async function boot() {
    let initRoutes = false;

    // Iniciar rutas
    try {
        const routes = await axios.get(apiURL('resources/routes'));
        const appData = await axios.get(apiURL('resources/app'));

        window.Ziggy = routes.data;
        defineApp(appData.data);
        window.route = useRoute();
        window.view  = view;
        initRoutes   = true;
    } catch (error) {
        window.Notify.error(window.Lang('server.api.noAvailable'));
    }

    if(initRoutes) {
        // Iniciar permisos
        if(hasToken()) {
            await bootPermissions();
            await bootRoles();
        
            // Iniciar broadcast
            if(import.meta.env.VITE_REVERB_ACTIVE === 'true') {
                await import('@Services/Broadcast')
            }
        }
    
        reloadApp();
    
        createApp(App)
            .use(createPinia())
            .use(i18n)
            .use(pagePlugin)
            .use(router)
            .use(ZiggyVue)
            .mount('#app');
    } else {
        createApp(Error503)
            .mount('#app');
    }
}

// Iniciar aplicación
boot();
