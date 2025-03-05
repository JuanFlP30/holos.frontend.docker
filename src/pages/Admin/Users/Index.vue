<script setup>
import { onMounted, ref } from 'vue';
import { can, apiTo, viewTo } from './Module'
import { useSearcher } from '@Services/Api';
import { hasPermission } from '@Plugins/RolePermission';

import ModalController    from '@Controllers/ModalController.js';

import IconButton   from '@Holos/Button/Icon.vue'
import DestroyView  from '@Holos/Modal/Template/Destroy.vue';
import SearcherHead from '@Holos/Searcher.vue';
import Table        from '@Holos/Table.vue';
import ShowView     from './Modals/Show.vue';

/** Controladores */
const Modal    = new ModalController();

/** Propiedades */
const destroyModal = ref(Modal.destroyModal);
const showModal    = ref(Modal.showModal);
const modelModal   = ref(Modal.modelModal);

const models = ref([]);

/** Métodos */
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
            :title="$t('users.title')"
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
                :processing="searcher.processing"
                @send-pagination="(page) => searcher.pagination(page)"
            >
                <template #head>
                    <th v-text="$t('user')" />
                    <th v-text="$t('contact')" />
                    <th
                        v-text="$t('actions')"
                        class="w-32 text-center"
                    />
                </template>
                <template #body="{items}">
                    <tr
                        v-for="model in items"
                        class="table-row"
                    >
                        <td class="table-cell">
                            {{ `${model.name} ${model.paternal}` }}
                        </td>
                        <td class="table-cell">
                            <p>
                                <a 
                                    class="hover:underline"
                                    target="_blank"
                                    :href="`mailto:${model.email}`"
                                >
                                    {{ model.email }}
                                </a>
                            </p>
                            <p v-if="model.phone" class="font-semibold text-xs">
                                <b>Teléfono: </b>
                                <span
                                    class="hover:underline"
                                    target="_blank"
                                    :href="`tel:${model.phone}`"
                                >
                                    {{ model.phone }}
                                </span>
                            </p>
                        </td>
                        <td class="table-cell">
                            <div class="table-actions">
                                <IconButton
                                    icon="visibility"
                                    :title="$t('crud.show')"
                                    @click="Modal.switchShowModal(model)"
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
                                    v-if="can('destroy')"
                                    icon="delete"
                                    :title="$t('crud.destroy')"
                                    @click="Modal.switchDestroyModal(model)"
                                    outline
                                />
                                <RouterLink
                                    v-if="can('settings')"
                                    class="h-fit"
                                    :to="viewTo({ name: 'settings', params: { id: model.id } })"
                                >
                                    <IconButton
                                        icon="settings"
                                        :title="$t('setting')"
                                    />
                                </RouterLink>
                                <RouterLink
                                    v-if="hasPermission('activities.index')"
                                    class="h-fit"
                                    :to="$view({ name: 'admin.activities.index', query: { user: model.id } })"
                                >
                                    <IconButton
                                        icon="timeline"
                                        :title="$t('activity')"
                                    />
                                </RouterLink>
                            </div>
                        </td>
                    </tr>
                </template>
                <template #empty>
                    <td class="table-cell">
                        <div class="flex items-center text-sm">
                            <p class="font-semibold">
                                {{ $t('registers.empty') }}
                            </p>
                        </div>
                    </td>
                    <td class="table-cell">-</td>
                    <td class="table-cell">-</td>
                </template>
            </Table>
        </div>
        
        <ShowView 
            v-if="can('index')"
            :show="showModal" 
            :model="modelModal" 
            @close="Modal.switchShowModal"
        />
        <DestroyView
            v-if="can('destroy')"
            :model="modelModal"
            :show="destroyModal"
            :to="(user) => apiTo('destroy', { user })"
            @close="Modal.switchDestroyModal"
            @update="searcher.search()"
        />
    </div>
</template>
    