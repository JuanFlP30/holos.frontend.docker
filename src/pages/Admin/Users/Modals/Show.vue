<script setup>
import { getDateTime } from '@Controllers/DateController';

import Header     from '@Holos/Modal/Elements/Header.vue';
import ShowModal  from '@Holos/Modal/Show.vue';
import GoogleIcon from '@Shared/GoogleIcon.vue';
/** Eventos */
defineEmits([
    'close', 
]);

/** Propiedades */
defineProps({
    show: Boolean,
    model: Object
});
</script>
<template>
    <ShowModal
        :show="show"
        @close="$emit('close')"
    >
        <Header
            :title="model.name"
            :subtitle="model.last_name"
        >
            <div class="flex w-full flex-col">
                <div class="flex w-full justify-center items-center">
                    <img :src="model.profile_photo_url" alt="Photo" class="w-24 h-24 rounded-full">
                </div>
            </div>
        </Header>
        <div class="flex w-full p-4">
            <GoogleIcon 
                class="text-xl text-success"
                name="contact_mail"
            />
            <div class="pl-3">
                <p class="font-bold text-lg leading-none pb-2">
                    {{ $t('details') }}
                </p>
                <p>
                    <b>{{ $t('name') }}: </b>
                    {{ model.full_name }}
                </p>
                <p>
                    <b>{{ $t('phone') }}: </b>
                    <a :href="`tel:${model.phone}`" target="_blank" class="hover:text-danger">
                        {{ model.phone ?? '-' }}
                    </a>
                </p>
                <p>
                    <b>{{ $t('email.title') }}: </b>
                    <a :href="`mailto:${model.email}`" target="_blank" class="hover:text-danger">
                        {{ model.email }}
                    </a>
                </p>
                <p>
                    <b>{{ $t('created_at') }}: </b>
                    {{ getDateTime(model.created_at) }}
                </p>
                <p>
                    <b>{{ $t('updated_at') }}: </b>
                    {{ getDateTime(model.updated_at) }}
                </p>
            </div>
        </div>
    </ShowModal>
</template>