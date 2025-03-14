<script setup>
import { RouterLink } from 'vue-router'

defineProps({
    as: String,
    to: String
});

const style = 'block px-4 py-2 text-sm leading-5 hover:bg-secondary/80 dark:hover:bg-secondary-d/80 focus:outline-hidden focus:bg-gray-100 cursor-pointer transition';
</script>

<template>
    <div>
        <button 
            v-if="as == 'button'"
            class="w-full text-left"
            :class="style"
            type="submit"
        >
            <slot />
        </button>

        <a 
            v-else-if="as =='a'"
            :href="href"
            :class="style"
        >
            <slot />
        </a>

        <RouterLink 
            v-else
            :to="$view({ name: to })"
            :class="style"
        >
            <slot />
        </RouterLink>
    </div>
</template>
