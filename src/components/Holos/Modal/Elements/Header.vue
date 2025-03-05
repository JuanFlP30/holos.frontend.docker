<script setup>
/** Propiedades */
defineProps({
    subtitle: String,
    title: String
})
</script>

<template>
    <div class="text-center p-6 bg-primary dark:bg-primary-d">
        <slot />
        <p class="pt-2 text-lg font-bold text-primary-t dark:text-primary-t-d">
            {{ title }}
        </p>
        <p v-if="subtitle"
            class="text-sm text-primary-t dark:text-primary-t-d"
        >
            {{ subtitle }}
        </p>
    </div>
</template>