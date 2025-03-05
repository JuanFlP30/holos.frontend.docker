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
        default: Lang('delete.title'),
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
            <div class="w-full right-0">
                <div class="overflow-hidden space-y-2 shadow-lg">
                    <slot />
                    <div class="px-4 pb-2">
                        <p 
                        class="mt-2 p-1 rounded-md text-justify bg-danger text-danger-t"
                        v-text="$t('delete.confirm')"
                        />
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="space-x-2">
                <slot name="buttons" />
                <DangerButton
                    v-text="$t('delete.title')"
                    @click="$emit('destroy')"
                />
                <SecondaryButton
                    v-text="$t('cancel')"
                    @click="$emit('close')"
                />
            </div>
        </template>
    </DialogModal>
</template>