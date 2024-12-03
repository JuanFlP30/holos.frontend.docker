<script setup>
import { nextTick, ref } from 'vue';
import { useForm } from '@inertiajs/vue3';

import PrimaryButton  from '@Holos/Button/Primary.vue'
import Input          from '@Holos/Form/InputWithIcon.vue'
import Layout         from '@Holos/Layout/AuthLayout.vue'

const recovery = ref(false);

const form = useForm({
    code: '',
    recovery_code: '',
});

const recoveryCodeInput = ref(null);
const codeInput = ref(null);

const toggleRecovery = async () => {
    recovery.value ^= true;

    await nextTick();

    if (recovery.value) {
        recoveryCodeInput.value.focus();
        form.code = '';
    } else {
        codeInput.value.focus();
        form.recovery_code = '';
    }
};

const submit = () => {
    form.post(route('two-factor.login'));
};
</script>

<template>
    <Layout :title="$t('account.twoFactor.title')">
        <div class="mb-4 text-sm text-justify text-white">
            <template v-if="! recovery">
                {{ $t('account.twoFactor.login.onAuth')}}
            </template>

            <template v-else>
                {{ $t('account.twoFactor.login.onRecovery')}}
            </template>
        </div>
    
        <form @submit.prevent="submit" class="text-white">
            <div v-if="! recovery">
                <Input
                    ref="codeInput"
                    icon="password"
                    id="code"
                    type="text"
                    inputmode="numeric"
                    autofocus
                    autocomplete="one-time-code"
                    v-model="form.code"
                    :onError="form.errors.code"
                />
            </div>

            <div v-else>
                <Input
                    ref="recoveryCodeInput"
                    icon="password"
                    autocomplete="one-time-code"
                    id="recovery_code"
                    v-model="form.recovery_code"
                    :onError="form.errors.recovery_code"
                />
            </div>

            <PrimaryButton
                class="!w-full"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
            >
                {{ $t('auth.login') }}
            </PrimaryButton>
            <div class="flex  w-full items-center justify-end mt-4">
                <button
                    type="button"
                    class="text-sm text-white underline cursor-pointer"
                    @click.prevent="toggleRecovery"
                >
                    <template v-if="! recovery">
                        {{ $t('account.twoFactor.recovery.useCode')}}
                    </template>
                    
                    <template v-else>
                        {{ $t('account.twoFactor.recovery.useAuth')}}
                    </template>
                </button>
            </div>
        </form>
    </Layout>
</template>
