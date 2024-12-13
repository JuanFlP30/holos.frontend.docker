<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import useLeftSidebar from '@Stores/LeftSidebar';
import GoogleIcon     from '@Shared/GoogleIcon.vue';

/** Definidores */
const leftSidebar = useLeftSidebar();
const vroute      = useRoute();

/** Propiedades */
const props = defineProps({
    icon: String,
    name: String,
    to: String
});

const classes = computed(() => {
    let status = props.to === vroute.name
        ? 'bg-secondary/30 dark:bg-secondary-d/30 border-secondary dark:border-secondary-d'
        : 'border-transparent';

    return `flex items-center h-11 focus:outline-none hover:bg-secondary/30 dark:hover:bg-secondary-d/30 border-l-4 hover:border-secondary dark:hover:border-secondary-d pr-6 ${status} transition`
});

const closeSidebar = () => {
    if(TwScreen.isDevice('phone') || TwScreen.isDevice('tablet')) {
        leftSidebar.close();
    }
};
</script>

<template>
    <li @click="closeSidebar()">
        <RouterLink
            :class="classes"
            :to="$view({name:to})"
        >
            <span
                v-if="icon"
                class="inline-flex justify-center items-center ml-4 mr-2"
            >
                <GoogleIcon 
                    class="text-xl"
                    :name="icon"
                    outline
                />
            </span>
            <span 
                v-if="name"
                v-text="$t(name)"
                class="text-sm tracking-wide truncate"
            />
            <slot />
        </RouterLink>
    </li>
</template>
