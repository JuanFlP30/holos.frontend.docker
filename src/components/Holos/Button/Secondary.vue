<script setup>
/** Propiedades */
defineProps({
    type: {
        default: 'submit',
        type: String
    }
});
</script>

<template>
    <button 
        class="btn btn-secondary"
        :type="type"
    >
        <slot />
    </button>
</template>
