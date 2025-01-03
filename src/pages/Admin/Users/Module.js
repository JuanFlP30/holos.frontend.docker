import { lang } from '@Lang/i18n';
import { hasPermission } from '@Plugins/RolePermission.js';

// Ruta API
const apiTo = (name, params = {}) => route(`admin.users.${name}`, params)

// Ruta visual
const viewTo = ({ name = '', params = {}, query = {} }) => view({ name: `admin.users.${name}`, params, query })

// Obtener traducción del componente
const transl = (str) => lang(`users.${str}`)

// Determina si un usuario puede hacer algo no en base a los permisos
const can = (permission) => hasPermission(`users.${permission}`)

export {
    can,
    viewTo,
    apiTo,
    transl
}