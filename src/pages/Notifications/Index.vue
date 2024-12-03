<script setup>
import { ref } from 'vue';
import { Link  } from '@inertiajs/vue3';
import { transl, can, goTo } from './Module'

import ModalController    from '@Controllers/ModalController.js';
import SearcherController from '@Controllers/SearcherController.js';
import InboxController    from '@Controllers/InboxController.js';

import Inbox           from '@Holos/Inbox.vue';
import InboxItem       from '@Holos/Inbox/Item.vue';
import SearcherHead    from '@Holos/Searcher.vue';
import DashboardLayout from '@Layouts/AppLayout.vue';
import Menu            from './Partials/Menu.vue';
import ItemRow         from './Partials/ItemRow.vue';
import ShowView        from './Modals/Show.vue';
import GoogleIcon from '@/Components/Shared/GoogleIcon.vue';

/** Definidores */
const inboxCtl = new InboxController();
const searcherCtl = new SearcherController(goTo('index'));

/** Eventos */
const props = defineProps({
    models: Object
});

/** Controladores */
const Modal    = new ModalController();

/** Propiedades */
const showModal    = ref(Modal.showModal);
const modelModal   = ref(Modal.modelModal);
</script>  

<template>
    <DashboardLayout :title="transl('system')">
        <SearcherHead @search="searcherCtl.search" />
        <Inbox
            :inboxCtl="inboxCtl"
            :items="models"
            :searcherCtl="searcherCtl"
            withMultiSelection
        >
            <template #menu>
                <Menu
                    :counters="counters"
                />
            </template>

            <template #actions>
                <div class="flex items-center ml-3">
                    <GoogleIcon
                        class="inbox-icon"
                        title="Enviar a almacén"
                        name="warehouse"
                        outline
                        @click="sendToWarehouse()"
                    />
                </div>
            </template>

            <template #head>
                
            </template>

            <template #items="{items}">
                <template v-for="model in items" :key="model.id">
                    <InboxItem
                        :inboxCtl="inboxCtl"
                        :item="model"
                    >
                        <template #item>
                            <ItemRow
                                :model="model"
                            />
                        </template>
    
                        <template #actions="{check}">
                            
                        </template>
    
                        <template #date>
                            <span>{{ model.tracker}}</span>
                        </template>
                    </InboxItem> 
                </template>
            </template>
        </Inbox>
        
        <ShowView 
            v-if="can('index')"
            :show="showModal" 
            :model="modelModal" 
            @close="Modal.switchShowModal"
        />
    </DashboardLayout>
</template>
    