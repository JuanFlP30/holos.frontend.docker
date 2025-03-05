<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { hasPermission } from '@Plugins/RolePermission';
import { useSearcher } from '@Services/Api';
import { apiTo } from './Module';

import ModalController    from '@Controllers/ModalController.js';

import IconButton    from '@Holos/Button/Icon.vue'
import PrimaryButton from '@Holos/Button/Primary.vue';
import Input         from '@Holos/Form/Input.vue';
import Header        from '@Holos/PageHeader.vue';
import Paginable     from '@Holos/Paginable.vue';
import Item          from '@Holos/Timeline/Item.vue';
import ShowView      from './Modals/Event.vue';

/** Definidores */
const vroute = useRoute();
const router = useRouter();

/** Controladores */
const Modal    = new ModalController();

/** Propiedades */
const showModal    = ref(Modal.showModal);
const modelModal   = ref(Modal.modelModal);

const models = ref([]);

const filters = reactive({
    search: '',
    start_date: '',
    end_date: '',
    user: ''
});

/** Métodos */
const searcher = useSearcher({
    url: apiTo('index'),
    filters,
    onSuccess: (r) => models.value = r.models,
    onError: () => models.value = []
});

const clearFilters = () => {
    filters.search = '';
    filters.start_date = '';
    filters.end_date = '';
    
    searcher.search();
};

const clearUser = () => {
    router.replace({ query: {} });
    filters.user = '';

    searcher.search();
};

/** Ciclos */
onMounted(() => {
    if(vroute.query?.user) {
        filters.user = vroute.query.user;
    }
    
    searcher.search('');
});

</script>  

<template>
    <div>
        <Header :title="$t('admin.activity.title')">
            <RouterLink v-if="filters.user && hasPermission('users.index')" :to="$view({ name: 'admin.users.index' })">
                <IconButton 
                    class="text-white"
                    icon="arrow_back"
                    :title="$t('return')"
                    filled
                />
            </RouterLink>
        </Header>
        <p class="mt-2 text-sm">{{ $t('admin.activity.description') }}</p>

        <div id="filters" class="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
            <Input
                v-model="filters.search"
                title="event"
                @keyup.enter="searcher.search()"
            />
            <Input
                v-model="filters.start_date"
                type="date"
                title="dates.start"
            />
            <Input
                v-model="filters.end_date"
                title="dates.end"
                type="date"
            />
            <div class="flex space-x-2 items-end">
                <PrimaryButton
                    class="!w-full h-12"
                    @click="searcher.search()"
                >
                    {{ $t('search') }}
                </PrimaryButton>
                <PrimaryButton
                    class="!w-full h-12"
                    @click="clearFilters()"
                >
                    {{ $t('clear') }}
                </PrimaryButton>
                <PrimaryButton
                    v-if="filters.user"
                    class="!w-full h-12"
                    @click="clearUser()"
                >
                    {{ $t('users.remove') }}
                </PrimaryButton>
            </div>
        </div>

        <div class="pb-4">
            <Paginable
                :items="models"
                :processing="searcher.processing"
                @send-pagination="(page) => searcher.pagination(page)"
            >
                <template #body="{ items }">
                    <ol class="ml-4">
                        <template v-for="event in items">
                            <Item
                                :event="event"
                                @show="Modal.switchShowModal(event)"
                            />
                        </template>
                    </ol>
                </template>
            </Paginable>
        </div>

        <ShowView 
            :show="showModal"
            :model="modelModal"
            @close="Modal.switchShowModal"
        />
    </div>
</template>
    