<script setup>
import InboxMenuItem from '@Holos/Inbox/Menu/Item.vue';

/** Propiedades */
const props = defineProps({
    counters: Object,
});
</script>

<template>
    <InboxMenuItem
        icon="people"
        title="all"
        to="notifications.index"
        :counter="counters?.all"
    />
    <InboxMenuItem
        icon="local_shipping"
        title="notifications.readed"
        to="notifications.readed"
        :counter="counters?.readed"
    />
    <InboxMenuItem
        icon="replay"
        title="notifications.unreaded"
        to="notifications.unreaded"
        :counter="counters?.unreaded"
    />
</template>