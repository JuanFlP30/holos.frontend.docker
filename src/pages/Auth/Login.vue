<script setup>
import { Link, useForm } from '@inertiajs/vue3';

import PrimaryButton  from '@Holos/Button/Primary.vue'
import Input          from '@Holos/Form/InputWithIcon.vue'
import Layout         from '@Holos/Layout/AuthLayout.vue'

/** Propiedades */
defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

/** Métodos */
const login = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Layout :title="$t('auth.login')">
        <form @submit.prevent="login">
          <Input
            icon="mail"
            id="email"
            type="email"
            v-model="form.email"
            :onError="form.errors.email"
            :placeholder="$t('email.title')"
          />
          <Input
            v-model="form.password"
            icon="password"
            id="password"
            type="password"
            :onError="form.errors.password"
            :placeholder="$t('password')"
          />
          <PrimaryButton class="!w-full">
            {{ $t('auth.login') }}
          </PrimaryButton>
          <div class="flex justify-end mt-4">
            <Link
                v-if="canResetPassword"
                class="text-sm ml-2 hover:text-blue-200 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                :href="route('password.request')"
            >
                {{ $t('auth.forgotPassword.ask') }}
            </Link>
          </div>
        </form>
    </Layout>
</template>
