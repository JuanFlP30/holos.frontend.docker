<script setup>
import { ref } from 'vue';

import IconButton from '@Holos/Button/Icon.vue'
import GoogleIcon from '@Shared/GoogleIcon.vue';

/** Eventos */
const emit = defineEmits([
    'search'
]);

/** Propiedades */
const props = defineProps({
    title: String,
    placeholder: {
        default: Lang('search'),
        type: String
    }
})

const query = ref('');

/** Métodos */
const search = () => {
    emit('search', query.value);
}

const clear = () => {
    query.value = '';

    search();
}
</script>
<template>
    <div v-if="title" class="flex w-full justify-center">
        <h2
            class="font-bold text-xl uppercase"
            v-text="title"
        />
    </div>
    <div class="flex w-full justify-between items-center border-y-2 border-page-t dark:border-page-dt">
        <div>
            <div class="relative py-1 z-0">
                <div  @click="search" class="absolute inset-y-0 right-2 flex items-center pl-3 cursor-pointer">
                    <GoogleIcon
                        :title="$t('search')"
                        class="text-xl text-gray-700 hover:scale-110 hover:text-danger"
                        name="search"
                    />
                    <GoogleIcon
                        v-show="query"
                        :title="$t('clear')"
                        class="text-xl text-gray-700 hover:scale-110 hover:text-danger"
                        name="close"
                        @click="clear"
                    />
                </div>
                <input
                    id="search"
                    class="bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-sm outline-0 focus:ring-primary focus:border-primary block sm:w-56 md:w-72 lg:w-80 pr-10 px-2.5 py-1"
                    autocomplete="off"
                    :placeholder="placeholder"
                    required
                    type="text"
                    v-model="query"
                    @keyup.enter="search"
                />
            </div>
        </div>
        <div class="flex items-center space-x-1 text-sm" id="buttons">
            <slot />
            <RouterLink :to="$view({name:'index'})">
                <IconButton
                    :title="$t('home')"
                    class="text-white"
                    icon="home"
                    filled
                />
            </RouterLink>
        </div>
	</div>
</template>