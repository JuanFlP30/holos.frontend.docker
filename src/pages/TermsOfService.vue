<script setup>
import Layout from '@Holos/Layout/TermsLayout.vue';

/** Propiedades */
defineProps({
    terms: String,
});
</script>

<template>
    <Layout title="Terms of Service">
        <div class="w-full overflow-hidden sm:rounded-lg prose" v-html="terms" />
    </Layout>
</template>
