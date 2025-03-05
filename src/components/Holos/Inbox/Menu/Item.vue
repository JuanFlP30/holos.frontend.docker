<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import GoogleIcon from '@Shared/GoogleIcon.vue';

/** Propiedades */
const props = defineProps({
    icon: String,
    counter: Number,
    to: String,
    toParam: {
        default: {},
        type: Object 
    },
    title: String,
});

/** Propiedades computadas */
const classes = computed(() => {
    let status = route().current(props.to, props.toParam)
        ? 'bg-secondary/30'
        : 'border-transparent hover:bg-secondary/30';

    return ` text-primary flex items-center justify-between py-1.5 px-4 rounded-sm cursor-pointer ${status} transition`
});
</script>

<template>
    <li>
        <RouterLink 
            v-if="to"
            :class="classes"
            :to="to"
        >
            <span class="flex items-center space-x-2">
                <GoogleIcon 
                    class="text-lg"
                    :name="icon"
                    outline
                />
                <span>
                    {{ title }}
                </span>
            </span>
            <span v-if="counter > 0" class="bg-primary text-gray-100 font-bold px-2 py-0.5 text-xs rounded-sm">
                {{ counter }}
            </span>
        </RouterLink>
    </li>
</template>