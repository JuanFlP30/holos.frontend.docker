<script setup>
import { ref, onMounted } from 'vue';
import { api } from '@Services/Api';

import Table from '@Holos/TableSimple.vue';

const changelogs = ref([]);

onMounted(() => {
    api.get(route('changelogs'), {
        onSuccess: (response) => {
            changelogs.value = response;
        }
    });
});
</script>

<template>
    <div>
        <h1>{{ $t('changelogs.title') }}</h1>
        <Table :items="changelogs">
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
                                <li v-for="detail in item.changes" v-text="detail" />
                            </ul>
                        </td>
                    </tr>
                </template>
            </template>
        </Table>
    </div>
</template>