<script setup>
import { router } from '@inertiajs/vue3';

import DestroyModal from '../Destroy.vue';
import Header       from '../Elements/Header.vue';

/** Eventos */
const emit = defineEmits([
    'close', 
    'switchModal'
]);

/** Propiedades */
const props = defineProps({
    model: Object,
    show: Boolean,
    to: Function,
});

/** Métodos */
const destroy = (id) => router.delete(props.to(id), {
    preserveScroll: true,
    onSuccess: () => {
        props.model.pop;
        Notify.success(lang('deleted'));
        emit('close');
    },
    onError: () => {
        Notify.info(lang('notFound'));
        emit('close');
    }
});
</script>

<template>
    <DestroyModal
        :show="show"
        @close="$emit('close')"
        @destroy="destroy(model.id)"
    >
        <Header
            :title="model.name"
            :subtitle="model.full_last_name"
        />
    </DestroyModal>
</template>