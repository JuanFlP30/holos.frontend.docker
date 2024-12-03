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
        :for="id"   
        class="block text-sm font-medium text-page-t dark:text-page-dt"
    >
        {{ $t(title) }}
        <span v-if="required"
            class="text-danger dark:text-danger-d"
        >
            *
        </span>
    </label>
</template>
