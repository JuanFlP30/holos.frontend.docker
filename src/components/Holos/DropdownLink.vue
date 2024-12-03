<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    as: String,
    href: String
});

const style = 'block px-4 py-2 text-sm leading-5 hover:bg-secondary/80 dark:hover:bg-secondary-d/80 focus:outline-none focus:bg-gray-100 transition';
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

        <Link 
            v-else
            :href="href"
            :class="style"
        >
            <slot />
        </Link>
    </div>
</template>
