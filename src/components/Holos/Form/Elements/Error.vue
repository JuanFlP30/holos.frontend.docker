<script setup>
/** Propiedades */
defineProps({
    onError: String | Array
});
</script>

<template>
    <p v-if="onError"
        class="mt-1 pl-2 text-xs text-red-500 dark:text-red-300"
    >
        {{ Array.isArray(onError) ? onError[0] : onError }}
    </p>
</template>
