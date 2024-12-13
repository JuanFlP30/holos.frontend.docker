<script setup>
import { api } from '@Services/Api.js';

import DestroyModal from '../Destroy.vue';
import Header       from '../Elements/Header.vue';

/** Eventos */
const emit = defineEmits([
    'close',
    'update'
]);

/** Propiedades */
const props = defineProps({
    model: Object,
    show: Boolean,
    to: Function,
});

/** Métodos */
const destroy = (id) => api.delete(props.apiTo(id), {
    onSuccess: () => {
        Notify.success(Lang('deleted'));
        emit('close');
        emit('update');
    },
    onError: () => {
        Notify.info(Lang('notFound'));
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
            :subtitle="model.full_last_name"
            :title="model.name"
        />
    </DestroyModal>
</template>