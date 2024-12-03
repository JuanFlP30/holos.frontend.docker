<script setup>
import DangerButton    from '../Button/Danger.vue';
import SecondaryButton from '../Button/Secondary.vue';
import DialogModal     from '../DialogModal.vue';

/** Eventos */
defineEmits([
    'close',
    'destroy',
]);

/** Propiedades */
const props = defineProps({
    show: Boolean,
    title: {
        default: lang('delete.title'),
        type: String
    }
});
</script>

<template>
    <DialogModal :show="show">
        <template #title>
            <p
                class="font-bold text-xl"
                v-text="title"
            />
        </template>
        <template #content>
            <div class="w-full right-0 mt-2">
                <div class="rounded overflow-hidden shadow-lg">
                    <slot />
                </div>
            </div>
            <p 
                class="mt-2 p-1 rounded-md text-justify bg-danger text-danger-t"
                v-text="$t('delete.confirm')"
            />
        </template>
        <template #footer>
            <div class="space-x-2">
                <slot name="buttons" />
                <DangerButton
                    @click="$emit('destroy')"
                    v-text="$t('delete.title')"
                />
                <SecondaryButton
                    @click="$emit('close')"
                    v-text="$t('cancel')"
                />
            </div>
        </template>
    </DialogModal>
</template>