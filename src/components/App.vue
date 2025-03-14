<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useLoader from '@Stores/Loader';
import { hasToken } from '@Services/Api';

/** Definidores */
const router = useRouter();
const loader = useLoader();

/** Ciclos */
onMounted(() => {
    if(!hasToken()) {
        return router.push({ name: 'auth.index' })
    }

    loader.boot()
})
</script>

<template>
    <router-view />
</template>