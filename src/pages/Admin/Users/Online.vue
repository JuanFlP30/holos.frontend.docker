<script setup>
import { ref } from 'vue';
import { can, apiTo, viewTo } from './Module'
import { users } from '@Plugins/AuthUsers'

import ModalController    from '@Controllers/ModalController.js';

import IconButton      from '@Holos/Button/Icon.vue'
import DestroyView     from '@Holos/Modal/Template/Destroy.vue';
import Header          from '@Holos/PageHeader.vue';
import Table           from '@Holos/TableSimple.vue';
import GoogleIcon      from '@Shared/GoogleIcon.vue';
import ShowView        from './Modals/Show.vue';

/** Controladores */
const Modal    = new ModalController();

/** Propiedades */
const destroyModal = ref(Modal.destroyModal);
const showModal    = ref(Modal.showModal);
const modelModal   = ref(Modal.modelModal);

</script>  

<template>
    <div>
        <Header
            :title="$t('users.online.title')"
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
        </Header>
        <p class="mt-2">{{ $t('users.online.description') }} {{ users.length - 1 }} {{ $t('users.online.count') }}</p>
        <div class="w-full -mt-2">
            <Table 
                :items="users"
            >
                <template #head>
                    <th v-text="$t('profile')" class="w-10" />
                    <th v-text="$t('name')" />
                    <th v-text="$t('contact')" />
                    <th
                        v-text="$t('actions')"
                        class="w-32 text-center"
                    />
                </template>
                <template #body="{items}">
                    <template v-for="model in items">
                        <tr v-if="model.id != 1">
                            <td class="table-item border">
                                <img :src="model.profile_photo_url" alt="Profile photo" class="w-10 h-10 rounded-full">
                            </td>
                            <td class="table-item border">
                                {{ `${model.full_name}` }}
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
    