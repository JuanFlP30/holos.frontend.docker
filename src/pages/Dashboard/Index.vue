<script setup>
import PageHeader from '@Holos/PageHeader.vue';

</script>

<template>
    <PageHeader title="Dashboard" />
    <p v-html="$t('welcome', { name: $page.user.name })"></p>
</template>