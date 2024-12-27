<script setup>
import { computed, nextTick, onUpdated } from 'vue';
import { getDateTime } from '@Controllers/DateController';
import useNotifier from '@Stores/Notifier';

import Header     from '@Holos/Modal/Elements/Header.vue';
import ShowModal  from '@Holos/Modal/Show.vue';
import GoogleIcon from '@Shared/GoogleIcon.vue';

/** Definidores */
const notifier = useNotifier();

/** Eventos */
const emit = defineEmits([
    'close',
    'reload'
]);

/** Propiedades */
const props = defineProps({
    show: Boolean,
    model: Object
});

onUpdated(() => {
    if(!props.model.read_at && props.show) {
        notifier.readNotification(props.model.id);
    }

    if(!props.model.read_at && !props.show) {
        emit('reload');
    }
});
</script>
<template>
    <ShowModal
        :show="show"
        @close="$emit('close')"
    >
        <Header
            :title="model.data.title"
        >
        </Header>
        <div class="py-2 border-b">
            <div class="flex w-full px-4 py-2">
                <GoogleIcon 
                    class="text-xl text-success"
                    name="contact_mail"
                />
                <div class="pl-3">
                    <p class="font-bold text-lg leading-none pb-2">
                        {{ $t('details') }}
                    </p>
                    <div class="flex flex-col">
                        <b>{{ $t('description') }}: </b>
                        {{ model.data.description }}
                    </div>
                    <div v-if="model.data.message" class="flex flex-col">
                        <b>{{ $t('message') }}: </b>
                        {{ model.data.message }}
                    </div>
                    <p>
                        <b>{{ $t('created_at') }}: </b>
                        {{ getDateTime(model.created_at) }}
                    </p>
                    <p v-if="model.read_at">
                        <b>{{ $t('read_at') }}: </b>
                        {{ getDateTime(model.read_at) }}
                    </p>
                </div>
            </div>
        </div>
    </ShowModal>
</template>