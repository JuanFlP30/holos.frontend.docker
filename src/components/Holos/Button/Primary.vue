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
        class="btn btn-primary"
        :type="type"
    >
        <slot />
    </button>
</template>
