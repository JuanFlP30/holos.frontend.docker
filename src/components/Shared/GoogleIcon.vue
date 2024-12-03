<script setup>
import { computed } from 'vue';

/**
 * Propiedades
 */
const props = defineProps({
    name:  String,
    fill: Boolean,
    title: String,
    style: {
        type: String,
        default: 'rounded' // outlined, rounded, sharp
    }
})

/**
 * Propiedades computadas
 */
const classes = computed(() => {
    return props.fill
        ? `font-google-icon-${props.style}-fill`
        : `font-google-icon-${props.style}`
});
</script>

<template>
    <span
        class="material-symbols cursor-pointer"
        :class="classes"
        translate="no"
        v-text="name"
    />
</template>