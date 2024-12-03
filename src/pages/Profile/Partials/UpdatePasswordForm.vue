<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';

import FormSection   from '@Holos/FormSection.vue';
import PrimaryButton from '@Holos/Button/Primary.vue';
import Input         from '@Holos/Form/Input.vue';

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const updatePassword = () => {
    form.put(route('user-password.update'), {
        errorBag: 'updatePassword',
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            Notify.success(lang('account.password.updated'));
        },
        onError: () => {
            if (form.errors.password) {
                form.reset('password', 'password_confirmation');
                passwordInput.value.focus();
            }

            if (form.errors.current_password) {
                form.reset('current_password');
                currentPasswordInput.value.focus();
            }
        },
    });
};
</script>

<template>
    <FormSection @submitted="updatePassword">
        <template #title>
            {{ $t('account.password.update') }}
        </template>

        <template #description>
            {{ $t('account.password.description') }}
        </template>

        <template #form>
            <div class="col-span-6 sm:col-span-4">
                <Input
                    v-model="form.current_password"
                    id="passwordCurrent"
                    type="password"
                    :onError="form.errors.current_password"
                    required
                />
            </div>

            <div class="col-span-6 sm:col-span-4">
                <Input
                    v-model="form.password"
                    id="password"
                    type="password"
                    :onError="form.errors.password"
                    required
                />
            </div>

            <div class="col-span-6 sm:col-span-4">
                <Input
                    v-model="form.password_confirmation"
                    id="passwordConfirmation"
                    type="password"
                    :onError="form.errors.password_confirmation"
                    required
                />
            </div>
        </template>

        <template #actions>
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                {{ $t('save') }}
            </PrimaryButton>
        </template>
    </FormSection>
</template>
