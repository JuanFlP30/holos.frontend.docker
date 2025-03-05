<script setup>
import GoogleIcon from '@Shared/GoogleIcon.vue'

/** Propiedades */
const props = defineProps({
    icon:  String,
    fill: Boolean,
    style: {
        type: String,
        default: 'rounded'
    },
    title: String,
    type: {
        type: String,
        default: 'button'
    }
});
</script>

<template>
    <button
        class="flex justify-center items-center h-7 w-7 rounded-sm btn-icon"
        :title="title"
        :type="type"
    >
        <GoogleIcon
            :fill="fill"
            :name="icon"
            :style="style"
        />   
    </button>
</template>