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
    }
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
                        <td class="table-item">
                            <span v-text="item.version" />
                        </td>
                        <td class="table-item">
                            <span v-text="item.date" />
                        </td>
                        <td class="table-item">
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