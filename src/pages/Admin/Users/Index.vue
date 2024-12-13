<script setup>
import { onMounted, ref } from 'vue';
import { can, apiTo, viewTo } from './Module'
import { api } from '@Services/Api';

import ModalController    from '@Controllers/ModalController.js';
import SearcherController from '@Controllers/SearcherController.js';

import IconButton      from '@Holos/Button/Icon.vue'
import DestroyView     from '@Holos/Modal/Template/Destroy.vue';
import SearcherHead    from '@Holos/Searcher.vue';
import Table           from '@Holos/Table.vue';
import GoogleIcon      from '@Shared/GoogleIcon.vue';
import ShowView        from './Modals/Show.vue';

/** Controladores */
const Modal    = new ModalController();

/** Propiedades */
const destroyModal = ref(Modal.destroyModal);
const showModal    = ref(Modal.showModal);
const modelModal   = ref(Modal.modelModal);

const models = ref([]);

const Searcher = new SearcherController({
    route: 'users.index',
    model: models
});

/** Métodos */
function load() {
    api.get(apiTo('index'), {
        onSuccess: (r) => models.value = r.users
    });
}

/** Ciclos */
onMounted(() => load());
</script>  

<template>
    <div>
        <SearcherHead
            :title="$t('users.title')"
            @search="Searcher.search"
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
        </SearcherHead>
        <div class="pt-2 w-full">
            <Table 
                :items="models"
                @send-pagination="Searcher.searchWithPagination"
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
                    <tr v-for="model in items">
                        <td class="table-item border">
                            {{ `${model.name} ${model.paternal}` }}
                        </td>
                        <td class="table-item border">
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
                                <a 
                                    class="hover:underline"
                                    target="_blank"
                                    :href="`tel:${model.phone}`"
                                >
                                    {{ model.phone }}
                                </a>
                            </p>
                        </td>
                        <td class="table-item">
                            <div class="table-actions">
                                <GoogleIcon
                                    class="btn-icon"
                                    name="visibility"
                                    :title="$t('crud.show')"
                                    @click="Modal.switchShowModal(model)"
                                    outline
                                />
                                <RouterLink
                                    v-if="can('edit')"
                                    class="h-fit"
                                    :to="viewTo({ name: 'edit', params: { id: model.id } })"
                                >
                                    <GoogleIcon
                                        class="btn-icon"
                                        name="edit"
                                        :title="$t('crud.edit')"
                                        outline
                                    />
                                </RouterLink>
                                <GoogleIcon
                                    v-if="can('destroy')"
                                    class="btn-icon"
                                    name="delete"
                                    :title="$t('crud.destroy')"
                                    @click="Modal.switchDestroyModal(model)"
                                    outline
                                />
                                <RouterLink
                                    v-if="can('settings')"
                                    class="h-fit"
                                    :to="viewTo({ name: 'settings', params: { id: model.id } })"
                                >
                                    <GoogleIcon
                                        class="btn-icon"
                                        name="settings"
                                        :title="$t('setting')"
                                    />
                                </RouterLink>
                            </div>
                        </td>
                    </tr>
                </template>
                <template #empty>
                    <td class="table-item border">
                        <div class="flex items-center text-sm">
                            <p class="font-semibold">
                                {{ $t('registers.empty') }}
                            </p>
                        </div>
                    </td>
                    <td class="table-item border">-</td>
                    <td class="table-item border">-</td>
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
            @update="load"
        />
    </div>
</template>
    