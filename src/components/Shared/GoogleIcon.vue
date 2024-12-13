<script setup>
import { computed } from 'vue';

/** Propiedades */
const props = defineProps({
    name:  String,
    fill: Boolean,
    style: {
        type: String,
        default: 'rounded' // outlined, rounded, sharp
    },
    title: String
})

/** Propiedades computadas */
const classes = computed(() => {
    return props.fill
        ? `font-google-icon-${props.style}-fill`
        : `font-google-icon-${props.style}`
});
</script>

<template>
    <span
        v-text="name"
        class="material-symbols cursor-pointer"
        :class="classes"
        translate="no"
    />
</template>