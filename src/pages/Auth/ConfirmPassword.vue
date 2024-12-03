<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';

import Layout        from '@Holos/Layout/AuthLayout.vue';
import Input         from '@Holos/Form/InputWithIcon.vue';
import PrimaryButton from '@Holos/Button/Primary.vue';

const form = useForm({
    password: '',
});

const passwordInput = ref(null);

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => {
            form.reset();

            passwordInput.value.focus();
        },
    });
};
</script>

<template>
    <Layout :title="$t('auth.confirmPassword.title')">
        <div class="mb-4 text-sm text-justify">
            {{ $t('auth.confirmPassword.description') }}
        </div>

        <form @submit.prevent="submit">
            <Input
                icon="password"
                id="password"
                type="password"
                v-model="form.password"
                :onError="form.errors.password"
                :placeholder="$t('password')"
            />

            <div class="flex justify-end mt-4">
                <PrimaryButton
                    class="!w-full"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    {{ $t('auth.confirmPassword.title') }}
                </PrimaryButton>
            </div>
        </form>
    </Layout>
</template>
