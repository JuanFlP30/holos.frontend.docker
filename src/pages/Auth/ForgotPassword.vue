<script setup>
import { useForm } from '@Services/Api';
import { useRouter } from 'vue-router';
import Input         from '@Holos/Form/InputWithIcon.vue'
import PrimaryButton from '@Holos/Button/Primary.vue'

/** Definidores */
const router = useRouter()

/** Propiedades */
defineProps({
    status: String,
});

const form = useForm({
    email: '',
});

/** Métodos */
const submit = () => {
    form.post(route('auth.forgot-password'), {
        onSuccess: () => {
            Notify.success(Lang('auth.forgotPassword.success'));
            router.push({ name: 'index' });
        },
        onError: () => {
            Notify.error(Lang('auth.forgotPassword.error'));
            router.push({ name: 'index' });
        }
    });
};
</script>

<template>
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
        <div class="flex flex-col gap-2 items-center justify-end mt-4">
            <PrimaryButton
                class="!w-full"
                :class="{ 'opacity-25': form.processing }"
                type="submit"
                :disabled="form.processing"
            >
                {{ $t('auth.forgotPassword.sendLink') }}
            </PrimaryButton>
            <PrimaryButton
                class="!w-full"
                type="button"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
                @click="router.push($view({ name: 'index' }))"
            >
                {{ $t('auth.login') }}
            </PrimaryButton>
        </div>
    </form>
</template>
