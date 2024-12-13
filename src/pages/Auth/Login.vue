<script setup>
import { onMounted } from 'vue';
import { defineApiToken, defineCsrfToken, hasToken, useForm } from '@Services/Api.js'
import { defineUser } from '@Services/Page';

import PrimaryButton  from '@Holos/Button/Primary.vue'
import Input          from '@Holos/Form/InputWithIcon.vue'

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
    location.replace('/')
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
          :to="$view({ name: 'forgot-password' })"
      >
          {{ $t('auth.forgotPassword.ask') }}
      </RouterLink>
    </div>
  </form>
</template>
