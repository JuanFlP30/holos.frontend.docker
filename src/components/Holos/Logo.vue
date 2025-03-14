<script setup>
import { hasToken } from '@Services/Api';
import { useRouter } from 'vue-router';

/** Definidores */
const router = useRouter();

/** Métodos */
const home = () => {
    if(hasToken()) {
        router.push({ name: 'dashboard.index' });
    } else {
        location.replace('/');
    }
}
</script>
<template>
    <div
        class="flex w-full justify-center items-center space-x-2 cursor-pointer"
        @click="home"
    >
        <img :src="$page.app.logo" class="h-20" />
    </div>
</template>