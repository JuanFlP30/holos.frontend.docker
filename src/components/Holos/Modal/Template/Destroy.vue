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
    title: {
        type: String,
        default: 'name'
    },
    subtitle: {
        type: String,
        default: 'description'
    }
});

/** Métodos */
const destroy = (id) => api.delete(props.to(id), {
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
            :title="model[title]"
            :subtitle="model[subtitle]"
        />
    </DestroyModal>
</template>