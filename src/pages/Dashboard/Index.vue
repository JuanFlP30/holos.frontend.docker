<script setup>
import PageHeader from '@Holos/PageHeader.vue';

</script>

<template>
    <PageHeader title="Dashboard" />
    <p><b>{{ $t('welcome') }}</b>, {{ $page.user.name }}.</p>
</template>