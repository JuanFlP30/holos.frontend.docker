<script setup>
import { useForm } from '@inertiajs/vue3';

import PrimaryButton from '@Holos/Button/Primary.vue';
import Input         from '@Holos/Form/InputWithIcon.vue'
import Layout        from '@Holos/Layout/AuthLayout.vue'

const props = defineProps({
    email: String,
    token: String,
});

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('password.update'), {
        onSuccess: () => {
            Notify.success(lang('auth.reset.success'));
        },
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Layout :title="$t('auth.reset.title')">
        <form @submit.prevent="submit">
            <Input
                icon="mail"
                id="email"
                type="email"
                v-model="form.email"
                :onError="form.errors.email"
                :placeholder="$t('email.title')"
            />
            <Input
                icon="password"
                id="password"
                type="password"
                v-model="form.password"
                :onError="form.errors.password"
                :placeholder="$t('password')"
            />
            <Input
                icon="password"
                id="passwordConfirmation"
                type="password"
                v-model="form.password_confirmation"
                :onError="form.errors.password_confirmation"
                :placeholder="$t('passwordConfirmation')"
            />

            <div class="flex items-center justify-end mt-4">
                <PrimaryButton class="!w-full" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    {{ $t('account.password.update') }}
                </PrimaryButton>
            </div>
        </form>
    </Layout>
</template>
