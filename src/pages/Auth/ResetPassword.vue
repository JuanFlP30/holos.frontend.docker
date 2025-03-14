<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useForm } from '@Services/Api.js'
import { viewTo } from './Module';
import PrimaryButton from '@Holos/Button/Primary.vue';
import Input         from '@Holos/Form/InputWithIcon.vue'

/** Definidores */
const vroute = useRoute();
const router = useRouter();

/** Propiedades */
const form = useForm({
    token: '',
    password: '',
    password_confirmation: '',
});

const email = ref('');

/** Métodos */
const submit = () => {
    form.post(route('auth.reset-password'), {
        onSuccess: () => {
            Notify.success(Lang('auth.reset.success'));
            router.push(viewTo({ name: 'index' }));
        },
        onError: () => {
            router.push(viewTo({ name: 'index' }));
        }
    });
};

onMounted(() => {
    form.token = vroute.query.token;
    email.value = vroute.query.email;
})
</script>

<template>
    <form @submit.prevent="submit">
        <Input
            icon="mail"
            id="email"
            type="email"
            v-model="email"
            disabled
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
</template>
