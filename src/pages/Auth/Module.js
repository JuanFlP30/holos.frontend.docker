
import { lang } from '@Lang/i18n';

// Ruta API
const apiTo = (name, params = {}) => route(`auth.${name}`, params)

// Ruta visual
const viewTo = ({ name = '', params = {}, query = {} }) => view({ name: `auth.${name}`, params, query })

// Obtener traducción del componente
const transl = (str) => lang(`auth.${str}`)

export {
    viewTo,
    apiTo,
    transl
}