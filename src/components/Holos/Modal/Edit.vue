<script setup>
import PrimaryButton   from '../Button/Primary.vue';
import SecondaryButton from '../Button/Secondary.vue';
import DialogModal     from '../DialogModal.vue';

/** Eventos */
const emit = defineEmits([
    'close',
    'update' 
]);

/** Propiedades */
const props = defineProps({
    show: Boolean,
    title: {
        default: lang('edit'),
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
                <div class="rounded overflow-hidden">
                    <slot />
                </div>
            </div>
        </template>
        <template #footer>
            <div class="space-x-2">
                <slot name="buttons" />
                <PrimaryButton 
                    @click="$emit('update')"
                    v-text="$t('update')"
                />
                <SecondaryButton
                    @click="$emit('close')" 
                    v-text="$t('close')"
                />
            </div>
        </template>
    </DialogModal>
</template>