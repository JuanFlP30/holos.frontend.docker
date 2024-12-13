<script setup>
import { ref, nextTick } from 'vue';
import { api, useForm } from '@Services/Api';

import Input           from './Form/Input.vue';
import DialogModal     from './DialogModal.vue';
import PrimaryButton   from './Button/Primary.vue';
import SecondaryButton from './Button/Secondary.vue';

const emit = defineEmits(['confirmed']);

defineProps({
    title: {
        type: String,
        default: Lang('confirm'),
    },
    content: {
        type: String,
        default: Lang('account.password.verify'),
    },
    button: {
        type: String,
        default: Lang('confirm'),
    },
});

const confirmingPassword = ref(false);

const form = useForm({
    password: '',
});

const passwordInput = ref(null);

const startConfirmingPassword = () => {
    confirmingPassword.value = true;
};

const confirmPassword = () => {
    form.post(route('user.password-confirm'), {
        onSuccess: () => {
            closeModal();
            nextTick(() => emit('confirmed'));
        },
        onFail: () => {
            passwordInput.value.focus();
        }
    });
};

const closeModal = () => {
    confirmingPassword.value = false;
    form.password = '';
};
</script>

<template>
    <span>
        <span @click="startConfirmingPassword">
            <slot />
        </span>

        <DialogModal :show="confirmingPassword" @close="closeModal">
            <template #title>
                {{ title }}
            </template>

            <template #content>
                {{ content }}

                {{ form }}

                <div class="mt-4">
                    <Input
                        v-model="form.password"
                        id="password"
                        type="password"
                        :onError="form.errors.password"
                    />
                </div>
            </template>

            <template #footer>
                <SecondaryButton @click="closeModal">
                    {{ $t('cancel') }}
                </SecondaryButton>

                <PrimaryButton
                    class="ms-3"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                    @click="confirmPassword"
                >
                    {{ button }}
                </PrimaryButton>
            </template>
        </DialogModal>
    </span>
</template>
