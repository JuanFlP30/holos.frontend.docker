<script setup>
import { Link } from '@inertiajs/vue3';

import GoogleIcon from '@Shared/GoogleIcon.vue';

/** Propiedades */
defineProps({
    to: String,
    title: String,
    value: Number,
    icon: String
});
</script>

<template>
    <Link
        class="relative flex-1 flex flex-col gap-2 p-4 rounded -md bg-gray-200 dark:bg-transparent dark:border"
        :href="to"
    >
        <label class="text-base font-semibold tracking-wider">
            {{ title }}
        </label>
        <label class="text-primary dark:text-primary-dt text-4xl font-bold">
            {{ value }}
        </label>
        <div class="absolute bg-primary dark:bg-primary-d rounded-md font-semibold text-xs text-gray-100 p-2 right-4 bottom-4">
            <GoogleIcon
              class="text-3xl md:text-2xl lg:text-3xl"
              :name="icon"
              filled
            />
        </div>
    </Link>
</template>