<script setup>
import GoogleIcon from '@Shared/GoogleIcon.vue'

/** Propiedades */
const props = defineProps({
    icon:  String,
    fill: Boolean,
    title: String,
    style: {
        type: String,
        default: 'rounded'
    },
    type: {
        type: String,
        default: 'button'
    }
});
</script>

<template>
    <button
        class="flex justify-center items-center h-7 w-7 rounded-md btn-icon"
        :title="title"
        :type="type"
    >
        <GoogleIcon
            :name="icon"
            :fill="fill"
            :style="style"
        />   
    </button>
</template>