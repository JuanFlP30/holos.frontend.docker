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
        default: Lang('edit'),
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
                <div class="overflow-hidden shadow-lg">
                    <slot />
                </div>
            </div>
        </template>
        <template #footer>
            <div class="space-x-2">
                <slot name="buttons" />
                <PrimaryButton 
                    v-text="$t('update')"
                    @click="$emit('update')"
                />
                <SecondaryButton
                    v-text="$t('close')"
                    @click="$emit('close')" 
                />
            </div>
        </template>
    </DialogModal>
</template>