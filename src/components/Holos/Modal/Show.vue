<script setup>
import SecondaryButton from '../Button/Secondary.vue';
import PrimaryButton   from '../Button/Primary.vue';
import DialogModal     from '../DialogModal.vue';

/** Eventos */
const emit = defineEmits([
    'close',
    'edit'
]);

/** Propiedades */
const props = defineProps({
    editable: Boolean,
    show: Boolean,
    title: {
        default: Lang('details'),
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
        </template>
        <template #footer>
            <div class="space-x-2">
                <slot name="buttons" />
                <PrimaryButton v-if="editable"
                    v-text="$t('update')"
                    @click="$emit('edit')"
                />
                <SecondaryButton
                    v-text="$t('close')"
                    @click="$emit('close')" 
                />
            </div>
        </template>
    </DialogModal>
</template>