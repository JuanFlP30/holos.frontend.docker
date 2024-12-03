<script setup>
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
            :subtitle="model.full_last_name"
        >
        </Header>
        <div class="py-2 border-b">
            <div class="px-4 py-2 flex">
                <GoogleIcon 
                    class="text-xl text-success"
                    name="contact_mail"
                />
                <div class="pl-3">
                    <p class="font-bold text-lg leading-none pb-2">
                        {{ $t('contact') }}
                    </p>
                    <p>
                        <b>{{ $t('phone') }}: </b>
                        <a :href="`tel:${model.phone}`" target="_blank" class="hover:text-danger">
                            {{ model.phone }}
                        </a>
                    </p>
                    <p>
                        <b>{{ $t('email') }}: </b>
                        <a :href="`mailto:${model.email}`" target="_blank" class="hover:text-danger">
                            {{ model.email }}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </ShowModal>
</template>