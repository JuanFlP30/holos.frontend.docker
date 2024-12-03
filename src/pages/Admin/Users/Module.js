import { lang } from '@/Lang/i18n';
import { hasPermission } from '@Plugins/RolePermission.js';

// Obtener ruta
const goTo = (route) => `admin.users.${route}`
// Obtener traducción del componente
const transl = (str) => lang(`users.${str}`)
// Determina si un usuario puede hacer algo no en base a los permisos
const can = (permission) => hasPermission(`users.${permission}`)

export {
    can,
    goTo,
    transl
}