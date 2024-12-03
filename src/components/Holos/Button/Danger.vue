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
        class="btn bg-danger"
        :type="type"
    >
        <slot />
    </button>
</template>
