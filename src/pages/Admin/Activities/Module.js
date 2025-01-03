import { lang } from '@Lang/i18n';
import { hasPermission } from '@Plugins/RolePermission.js';

// Ruta API
const apiTo = (name, params = {}) => route(`admin.activities.${name}`, params)

// Ruta visual
const viewTo = ({ name = '', params = {}, query = {} }) => view({ name: `admin.activities.${name}`, params, query })

// Obtener traducción del componente
const transl = (str) => lang(`activities.${str}`)

// Determina si un usuario puede hacer algo no en base a los permisos
const can = (permission) => hasPermission(`activities.${permission}`)

export {
    can,
    viewTo,
    apiTo,
    transl
}