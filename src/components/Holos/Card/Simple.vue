<script setup>
import GoogleIcon from '@Shared/GoogleIcon.vue';

/** Propiedades */
defineProps({
    icon: String,
    title: String
});
</script>

<template>
    <div class="flex flex-col justify-center items-center p-4 bg-primary text-white rounded-md">
        <GoogleIcon
            class="text-4xl"
            :name="icon"
        />
        <h4>{{ title }}</h4>
    </div>
</template>