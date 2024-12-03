<script setup>
import { useForm } from '@inertiajs/vue3';

import Input         from '@Holos/Form/InputWithIcon.vue'
import PrimaryButton from '@Holos/Button/Primary.vue'
import Layout        from '@Holos/Layout/AuthLayout.vue'

defineProps({
    status: String,
});

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <Layout :title="$t('auth.forgotPassword.title')">
        <div class="mb-4 text-sm text-justify">
            {{ $t('auth.forgotPassword.description') }}
        </div>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>
    
        <form @submit.prevent="submit">
            <Input
              icon="mail"
              id="email"
              type="email"
              v-model="form.email"
              :onError="form.errors.email"
              :placeholder="$t('email.title')"
            />

            <div class="flex items-center justify-end mt-4">
                <PrimaryButton
                    class="!w-full"
                    :class="{ 'opacity-25': form.processing }"
                    type="submit"
                    :disabled="form.processing"
                >
                    {{ $t('auth.forgotPassword.sendLink') }}
                </PrimaryButton>
            </div>
        </form>
    </Layout>
</template>
