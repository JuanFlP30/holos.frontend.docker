<script setup>
import { onMounted, ref } from 'vue';
import { useSearcher } from '@Services/Api';

import ModalController    from '@Controllers/ModalController.js';
import { getDateTime }    from '@Controllers/DateController.js';

import SearcherHead    from '@Holos/Searcher.vue';
import Table           from '@Holos/Table.vue';
import GoogleIcon      from '@Shared/GoogleIcon.vue';
import IconButton      from '@Holos/Button/Icon.vue';
import ShowView        from '@Holos/Skeleton/Sidebar/Notification/Show.vue';

/** Controladores */
const Modal = new ModalController();

/** Propiedades */
// const destroyModal = ref(Modal.destroyModal);
const showModal    = ref(Modal.showModal);
const modelModal   = ref(Modal.modelModal);

const models = ref([]);

const searcher = useSearcher({
    url: route('system.notifications.all'),
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
            :title="$t('notifications.title')"
            @search="(x) => searcher.search(x)"
        >
            <IconButton
                icon="refresh"
                :title="$t('notifications.unreadClosed')"
                @click="searcher.search()"
            />
        </SearcherHead>
        <div class="pt-2 w-full">
            <Table 
                :items="models"
                @send-pagination="searcher.pagination"
                :processing="searcher.processing"
            >
                <template #head>
                    <th v-text="$t('title')" />
                    <th v-text="$t('description')" />
                    <th
                        v-text="$t('date')"
                        class="w-40 text-center"
                    />
                    <th
                        v-text="$t('status')"
                        class="w-32 text-center"
                    />
                    <th
                        v-text="$t('actions')"
                        class="w-32 text-center"
                    />
                </template>
                <template #body="{items}">
                    <tr v-for="model in items">
                        <td class="table-item border">
                            {{ model.data.title }}
                        </td>
                        <td class="table-item border">
                            {{ model.data.description }}
                        </td>
                        <td class="table-item border">
                            {{ getDateTime(model.created_at) }}
                        </td>
                        <td class="table-item border">
                            <div class="flex items-center justify-center">
                                <div class="w-2 h-2 rounded-full" :class="model.read_at ? 'bg-success' : 'bg-danger'"></div>
                                <span class="ml-2">{{ model.read_at ? $t('readed') : (model.is_closed ? $t('omitted') : $t('unreaded')) }}</span>
                            </div>
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
                                <!-- <GoogleIcon
                                    v-if="can('destroy')"
                                    class="btn-icon"
                                    name="delete"
                                    :title="$t('crud.destroy')"
                                    @click="Modal.switchDestroyModal(model)"
                                    outline
                                /> -->
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
                    <td class="table-item border">-</td>
                    <td class="table-item border">-</td>
                </template>
            </Table>
        </div>
        
        <ShowView 
            :show="showModal" 
            :model="modelModal" 
            @close="Modal.switchShowModal"
            @reload="searcher.search()"
        />
        <!-- <DestroyView
            v-if="can('destroy')"
            :model="modelModal"
            :show="destroyModal"
            :to="(user) => apiTo('destroy', { user })"
            @close="Modal.switchDestroyModal"
            @update="getNotifications"
        /> -->
    </div>
</template>
    