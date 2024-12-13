import { reactive } from "vue";
import { api, closeSession } from '@Services/Api';
import { resetPermissions } from '@Plugins/RolePermission';

/**
 * Cache
 * 
 * Permite cargar los datos una vez para la sesión actual. Se mantienen mientras
 * no se recargue la página.
 */
const page = reactive({
    lang: 'es',
    user: {
        id: 0,
        name: 'public'
    }
})

/**
 * Recarga datos en cache
 */
const reloadApp = () => {
    const user = localStorage.user

    if(user) {
        page.user = JSON.parse(user);
    }
}

/**
 * Limpiar sesión de usuario
 */
const resetPage = () => {
    localStorage.removeItem('user');
}

/**
 * Permite buscar una opcionalmente
 */
const view = ({
    name = '',
    params = {},
    query = {},
}) => ({
    name: name,
    params,
    query,
})

/**
 * Almacenar datos usuario
 */
const defineUser = (user) => {
    localStorage.user = JSON.stringify({
        id: user.id,
        name: user.name,
        lastname: `${user.paternal} ${user?.maternal ?? ''}`,
        email: user.email,
        phone: user.phone,
        profile_photo_url: user.profile_photo_url,
        profile_photo_path: user.profile_photo_path,
    });
}

/**
 * Instalar el componente de forma nativa
 */
const pagePlugin = {
    install: (app, options) => {
        app.config.globalProperties.$page = page;
        app.config.globalProperties.$view = view;
    }
}

/**
 * Reload user
 */
const reloadUser = () => {
    console.log('reloadUser')

    return api.get(route('user.show'), {
        onSuccess: (r) => {
            defineUser(r.user)
            reloadApp()

            return r.user;
        }
    });
}

/**
 * Cerrar sesión
 */
const logout = () => {
    resetPermissions()
    resetPage()
  
    api.post(route('auth.logout'), {
      onSuccess: (r) => {
        if(r.is_revoked === true) {
          closeSession()
        }
      }
    });
};

export {
    pagePlugin,
    page,
    reloadApp,
    reloadUser,
    resetPage,
    defineUser,
    logout,
    view
}