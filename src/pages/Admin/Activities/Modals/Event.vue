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
        />
        <div class="py-2 border-b">
            <div class="flex w-full px-4 py-2">
                <GoogleIcon
                    class="text-xl text-success"
                    name="contact_mail"
                />
                <div class="pl-3 w-full">
                    <p class="font-bold text-lg leading-none pb-2">
                        {{ $t('details') }}
                    </p>
                    <div class="text-sm">
                        <h4 class="font-semibold">{{ $t('event') }}:</h4>
                        <p>{{ model.event }}</p>
                    </div>
                    <div class="text-sm">
                        <h4 class="font-semibold">{{ $t('description') }}:</h4>
                        <p>{{ model.description }}</p>
                    </div>
                    <div class="flex w-full flex-col">
                        <p class="font-semibold">
                            {{ $t('changes') }}:
                        </p>
                        <div class="w-full text-xs p-2 border rounded-md">
                            <pre>{{ model.data }}</pre>
                        </div>
                    </div>
                    <div class="text-sm">
                        <h4 class="font-semibold">{{ $t('created_at') }}:</h4>
                        <p>{{ getDateTime(model.created_at) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </ShowModal>
</template>