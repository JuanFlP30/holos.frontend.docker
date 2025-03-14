<script setup>
import Table from '@Holos/TableSimple.vue';

const changelogs = [
    {
        version: '0.9.0',
        details: [
            'INIT: Commit inicial',
            'ADD: Generación de plantilla',
        ],
        date: '2024-12-13'
    },
    {
        version: '0.9.1',
        details: [
            'ADD: Script de instalación.',
            'ADD: Versionado de la aplicación.',
            'ADD: Logo administrado en en backend.'
        ],
        date: '2024-12-16'
    },
    {
        version: '0.9.2',
        details: [
            'ADD: Asignación de roles a usuarios.',
            'FIX: Correcciones visuales en Layout.'
        ],
        date: '2024-12-16'
    },
    {
        version: '0.9.3',
        details: [
            'FIX: Creación de usuarios.',
            'ADD: Notificaciones en tiempo real.',
            'ADD: Usuarios conectados en tiempo real.'
        ],
        date: '2024-12-27'
    },
    {
        version: '0.9.4',
        details: [
            'ADD: Creación de nuevos roles con permisos personalizados.',
            'ADD: Recarga de permisos en tiempo real para usuarios en linea.',
            'FIX: Tooltip de botones en tablas.'
        ],
        date: '2024-12-28'
    },
    {
        version: '0.9.5',
        details: [
            'ADD: Historial de acciones general.',
            'ADD: Historial de acciones por usuario.',
            'FIX: Paginación con filtros.',
            'UPDATE: La ruta / ahora redirige a /dashboard en caso de que se desarrolle un frontend publico.',
            'UPDATE: Se agregaron los elementos administrados en /admin',
            'UPDATE: Redirección a dashboard al iniciar sesión.'
        ],
        date: '2025-01-03'
    },
    {
        version: '0.9.6',
        details: [
            'FIX: Historial de acciones, modo responsivo.',
            'ADD: Recuperación de contraseña.'
        ],
        date: '2025-01-06'
    },
    {
        version: '0.9.7',
        details: [
            'ADD: Visualización de historial de cambios del backend.',
        ],
        date: '2025-01-17'
    },
    {
        version: '0.9.8',
        details: [
            'UPDATE: Actualización de dependencias.',
            'UPDATE: TailwindCSS 3 => 4.',
            'UPDATE: Actualización de Diseño, mejoras visuales.',
        ],
        date: '2025-03-04'
    },
    {
        version: '0.9.9',
        details: [
            'FIX: Obtención de recursos de backend mediante `api.resource`.',
            'FIX: Títulos de modal de eliminación ahora son editables.',
            'UPDATE: Simplificación de las rutas de autenticación.',
            'UPDATE: Traducciones modulares faltantes.',
            'UPDATE: Ahora las plantillas se definen en el grupo de rutas, y se heredan en las rutas hijas.',
            'ADD: Función creación de URL a backend fuera de VUEJS.',
        ],
        date: '2025-03-13'
    },
]
</script>

<template>
    <div>
        <h1>{{ $t('changelogs.title') }}</h1>
        <Table :items="changelogs.reverse()">
            <template #head>
                <th 
                    v-text="$t('version')"
                    class="w-10" 
                />
                <th 
                    v-text="$t('date')"
                    class="w-24" 
                />
                <th 
                    v-text="$t('details')"
                />
            </template>
            <template #body="{items}">
                <template v-for="item in items">
                    <tr>
                        <td class="table-cell">
                            <span v-text="item.version" />
                        </td>
                        <td class="table-cell">
                            <span v-text="item.date" />
                        </td>
                        <td class="table-cell">
                            <ul class="list-disc list-inside">
                                <li v-for="detail in item.details.reverse()" v-text="detail" />
                            </ul>
                        </td>
                    </tr>
                </template>
            </template>
        </Table>
    </div>
</template>