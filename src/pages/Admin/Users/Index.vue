<script setup>
import { ref } from 'vue';
import { Link  } from '@inertiajs/vue3';
import { transl, can, goTo } from './Module'

import ModalController    from '@/Controllers/ModalController.js';
import SearcherController from '@/Controllers/SearcherController.js';

import IconButton      from '@Holos/Button/Icon.vue'
import DestroyView     from '@Holos/Modal/Template/Destroy.vue';
import SearcherHead    from '@Holos/Searcher.vue';
import Table           from '@Holos/Table.vue';
import DashboardLayout from '@Layouts/AppLayout.vue';
import GoogleIcon      from '@Shared/GoogleIcon.vue';
import ShowView        from './Modals/Show.vue';

/** Eventos */
const props = defineProps({
    models: Object
});

/** Controladores */
const Modal    = new ModalController();
const Searcher = new SearcherController(goTo('index'));

/** Propiedades */
const destroyModal = ref(Modal.destroyModal);
const showModal    = ref(Modal.showModal);
const modelModal   = ref(Modal.modelModal);
</script>  

<template>
    <DashboardLayout :title="transl('system')">
        <SearcherHead @search="Searcher.search">
            <Link
            v-if="can('create')"
                :href="route(goTo('create'))"
            >
                <IconButton
                    class="text-white"
                    icon="add"
                    :title="$t('crud.create')"
                    filled
                />
            </Link>
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
                                <Link
                                    v-if="can('edit')"
                                    class="h-fit"
                                    :href="route(goTo('edit'), model.id)"
                                >
                                    <GoogleIcon
                                        class="btn-icon"
                                        name="edit"
                                        :title="$t('crud.edit')"
                                        outline
                                    />
                                </Link>
                                <GoogleIcon
                                    v-if="can('destroy')"
                                    class="btn-icon"
                                    name="delete"
                                    :title="$t('crud.destroy')"
                                    @click="Modal.switchDestroyModal(model)"
                                    outline
                                />
                                <Link
                                    v-if="can('settings')"
                                    class="h-fit"
                                    :href="route('admin.users.settings', model.id)"
                                >
                                    <GoogleIcon
                                        class="btn-icon"
                                        name="settings"
                                        :title="$t('setting')"
                                    />
                                </Link>
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
            :to="(user) => route(goTo('destroy'), {user})"
            @close="Modal.switchDestroyModal"
        />
    </DashboardLayout>
</template>
    