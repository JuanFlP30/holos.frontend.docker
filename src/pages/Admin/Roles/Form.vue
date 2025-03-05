<script setup>
import { transl } from './Module';

import PrimaryButton from '@Holos/Button/Primary.vue';
import Input         from '@Holos/Form/Input.vue';

/** Eventos */
const emit = defineEmits([
    'submit'
])

/** Propiedades */
defineProps({
    action: {
        default: 'create',
        type: String
    },
    form: Object
})

/** Métodos */
function submit() {
    emit('submit')
}
</script>

<template>
    <div class="w-full pb-2">
        <p class="text-justify text-sm" v-text="transl(`${action}.description`)" />
    </div>
    <div class="w-full">
        <form @submit.prevent="submit" class="grid gap-4 grid-cols-1">
            <Input
                v-model="form.description"
                id="name"
                :onError="form.errors.description"
                autofocus
                required
            />
            <slot />
            <div class="flex flex-col items-center justify-end space-y-4 mt-4">
                <PrimaryButton
                    v-text="$t(action)"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                />
            </div>
        </form>
    </div>
</template>