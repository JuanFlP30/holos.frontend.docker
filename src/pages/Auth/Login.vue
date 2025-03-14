<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { defineApiToken, defineCsrfToken, hasToken, useForm } from '@Services/Api.js'
import { defineUser } from '@Services/Page';
import { viewTo } from './Module.js';

import PrimaryButton  from '@Holos/Button/Primary.vue'
import Input          from '@Holos/Form/InputWithIcon.vue'

/** Definidores */
const router = useRouter();

/** Propiedades */
defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: ''
});

/** Métodos */
const login = () => {
    form.post(route('auth.login'), {
        onSuccess: (res) => {
          defineApiToken(res.token)
          defineUser(res.user)
          defineCsrfToken(res.csrf)

          location.replace('/')
        }
    });
};

/** Ciclos */
onMounted(() => {
  if (hasToken()) {
    router.push({ name: 'dashboard.index' });
  }
})
</script>

<template>
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
      <RouterLink
          class="text-sm ml-2 hover:text-blue-200 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
          :to="viewTo({ name: 'forgot-password' })"
      >
          {{ $t('auth.forgotPassword.ask') }}
      </RouterLink>
    </div>
  </form>
</template>
