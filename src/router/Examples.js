/**
 * Archivo de rutas de ejemplos.
 * 
 * En producción se debe eliminar o comentar. Las vistas de ejemplo opcionalmente pueden ser eliminadas o
 * dejadas como referencia.
 */

export default [
    {
        path: '/examples',
        name: 'examples.index',
        component: () => import('@Pages/Examples/Index.vue')
    }
]