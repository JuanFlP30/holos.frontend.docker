<script setup>
/** Propiedades */
defineProps({
    id: String,
    title: String,
    required: Boolean
});
</script>

<template>
    <label v-if="title"
        class="block text-sm font-medium text-page-t dark:text-page-dt"
        :for="id"
    >
        {{ $t(title) }}
        <span v-if="required"
            class="text-danger dark:text-danger-d"
        >
            *
        </span>
    </label>
</template>
