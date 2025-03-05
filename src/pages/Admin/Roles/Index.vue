<script setup>
import { onMounted, ref } from 'vue';
import { can, apiTo, viewTo } from './Module'
import { useSearcher } from '@Services/Api';

import ModalController    from '@Controllers/ModalController.js';

import IconButton      from '@Holos/Button/Icon.vue'
import DestroyView     from '@Holos/Modal/Template/Destroy.vue';
import SearcherHead    from '@Holos/Searcher.vue';
import Table           from '@Holos/Table.vue';
import Permissions     from './Modals/Permissions.vue';

/** Controladores */
const Modal    = new ModalController();

/** Propiedades */
const destroyModal = ref(Modal.destroyModal);
const editModal    = ref(Modal.editModal);
const modelModal   = ref(Modal.modelModal);

const models = ref([]);

const searcher = useSearcher({
    url: apiTo('index'),
    onSuccess: (r) => models.value = r.models,
    onError: () => models.value = []
});

/** Ciclos */
onMounted(() => {
    searcher.search();
});
</script>  

<template>
    <div>
        <SearcherHead
            :title="$t('roles.title')"
            @search="(x) => searcher.search(x)"
        >
            <RouterLink
                v-if="can('create')"
                :to="viewTo({ name: 'create' })"
            >
                <IconButton
                    class="text-white"
                    icon="add"
                    :title="$t('crud.create')"
                    filled
                />
            </RouterLink>
            <IconButton
                icon="refresh"
                :title="$t('refresh')"
                @click="searcher.search()"
            />
        </SearcherHead>
        <div class="pt-2 w-full">
            <Table 
                :items="models"
                @send-pagination="(page) => searcher.pagination(page)"
                :processing="searcher.processing"
            >
                <template #head>
                    <th v-text="$t('name')" />
                    <th
                        v-text="$t('actions')"
                        class="w-32 text-center"
                    />
                </template>
                <template #body="{items}">
                    <tr v-for="model in items" class="table-row">
                        <td class="table-cell border">
                            {{ model.description }}
                        </td>
                        <td class="table-cell">
                            <div class="table-actions">
                                <IconButton
                                    v-if="can('edit') && ![1,2].includes(model.id)"
                                    icon="license"
                                    :title="$t('roles.permissions.title')"
                                    @click="Modal.switchEditModal(model)"
                                    outline
                                />
                                <RouterLink
                                    v-if="can('edit')"
                                    class="h-fit"
                                    :to="viewTo({ name: 'edit', params: { id: model.id } })"
                                >
                                    <IconButton
                                        icon="edit"
                                        :title="$t('crud.edit')"
                                        outline
                                    />
                                </RouterLink>
                                <IconButton
                                    v-if="can('destroy') && ![1,2].includes(model.id)"
                                    icon="delete"
                                    :title="$t('crud.destroy')"
                                    @click="Modal.switchDestroyModal(model)"
                                    outline
                                />
                            </div>
                        </td>
                    </tr>
                </template>
            </Table>
        </div>
        
        <Permissions
            v-if="can('index')"
            :show="editModal" 
            :model="modelModal" 
            @close="Modal.switchEditModal"
        />
        <DestroyView
            v-if="can('destroy')"
            :model="modelModal"
            :show="destroyModal"
            :to="(role) => apiTo('destroy', { role })"
            @close="Modal.switchDestroyModal"
            @update="searcher.search()"
        />
    </div>
</template>
    