<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import GoogleIcon from '@Shared/GoogleIcon.vue';

/** Propiedades */
const props = defineProps({
    icon: String,
    to: String,
    title: String,
    type: {
        default: 'primary',
        type: String
    }
});

/** Propiedades computadas */
const classes = computed(() => {
    return `inbox-menu-button-${props.type}`;
});
</script>

<template>
    <div class="h-16 flex items-center pr-2">
        <RouterLink 
            :class="classes"
            :to="to"
        >
            <span class="flex items-center space-x-2 ">
                <GoogleIcon 
                    class="text-lg text-white font-bold"
                    :name="icon"
                    outline
                />
                <span>
                    {{ title }}
                </span>
            </span>
        </RouterLink>
    </div>
</template>