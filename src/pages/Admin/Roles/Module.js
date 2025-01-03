import { lang } from '@Lang/i18n';
import { hasPermission } from '@Plugins/RolePermission.js';

// Ruta API
const apiTo = (name, params = {}) => route(`admin.roles.${name}`, params)

// Ruta visual
const viewTo = ({ name = '', params = {}, query = {} }) => view({ name: `admin.roles.${name}`, params, query })

// Obtener traducción del componente
const transl = (str) => lang(`roles.${str}`)

// Determina si un usuario puede hacer algo no en base a los permisos
const can = (permission) => hasPermission(`roles.${permission}`)

export {
    can,
    viewTo,
    apiTo,
    transl
}