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
    <div class="w-full py-4">
        <p class="text-justify text-sm" v-text="transl(`${action}.description`)" />
    </div>
    <div class="w-full">
        <form @submit.prevent="submit" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Input
                v-model="form.name"
                id="name"
                :onError="form.errors.name"
                autofocus
                required
            />
            <Input
                v-model="form.paternal"
                id="paternal"
                :onError="form.errors.paternal"
                autofocus
                required
            />
            <Input
                v-model="form.maternal"
                id="maternal"
                :onError="form.errors.maternal"
                autofocus
            />
            <Input
                v-model="form.phone"
                id="phone"
                :onError="form.errors.phone"
                type="number"
                autofocus
            />
            <Input
                v-model="form.email"
                id="email.title"
                type="email"
                :onError="form.errors.email"
                autofocus
                required
            />
            <slot />
            <div class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-col items-center justify-end space-y-4 mt-4">
                <PrimaryButton
                    v-text="$t(action)"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                />
            </div>
        </form>
    </div>
</template>