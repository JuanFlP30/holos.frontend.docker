<script setup>
import { RouterLink } from 'vue-router';

import IconButton from '@Holos/Button/Icon.vue'

defineProps({
    title: String
});

</script>

<template>
    <div v-if="title" class="flex w-full justify-center">
        <h2
            class="font-bold text-xl uppercase"
            v-text="title"
        />
    </div>
    <div class="flex w-full justify-end py-[0.31rem] mb-2 border-y-2 border-page-t dark:border-page-dt">
        <div id="buttons" class="flex items-center space-x-1 text-sm">
            <slot />
            <RouterLink :to="$view({ name: 'index' })">
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