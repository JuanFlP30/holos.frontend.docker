<script setup>
import { ref, computed, watch } from 'vue';
import { router, useForm, usePage } from '@inertiajs/vue3';

import ActionSection    from '@Holos/ActionSection.vue';
import ConfirmsPassword from '@Holos/ConfirmsPassword.vue';
import DangerButton     from '@Holos/Button/Danger.vue';
import PrimaryButton    from '@Holos/Button/Primary.vue';
import SecondaryButton  from '@Holos/Button/Secondary.vue';
import Input            from '@Holos/Form/Input.vue';

const props = defineProps({
    requiresConfirmation: Boolean,
});

const page = usePage();
const enabling = ref(false);
const confirming = ref(false);
const disabling = ref(false);
const qrCode = ref(null);
const setupKey = ref(null);
const recoveryCodes = ref([]);

const confirmationForm = useForm({
    code: '',
});

const twoFactorEnabled = computed(
    () => ! enabling.value && page.props.auth.user?.two_factor_enabled,
);

watch(twoFactorEnabled, () => {
    if (! twoFactorEnabled.value) {
        confirmationForm.reset();
        confirmationForm.clearErrors();
    }
});

const enableTwoFactorAuthentication = () => {
    enabling.value = true;

    router.post(route('two-factor.enable'), {}, {
        preserveScroll: true,
        onSuccess: () => Promise.all([
            showQrCode(),
            showSetupKey(),
            showRecoveryCodes(),
        ]),
        onFinish: () => {
            enabling.value = false;
            confirming.value = props.requiresConfirmation;
        },
    });
};

const showQrCode = () => {
    return axios.get(route('two-factor.qr-code')).then(response => {
        qrCode.value = response.data.svg;
    });
};

const showSetupKey = () => {
    return axios.get(route('two-factor.secret-key')).then(response => {
        setupKey.value = response.data.secretKey;
    });
}

const showRecoveryCodes = () => {
    return axios.get(route('two-factor.recovery-codes')).then(response => {
        recoveryCodes.value = response.data;
    });
};

const confirmTwoFactorAuthentication = () => {
    confirmationForm.post(route('two-factor.confirm'), {
        errorBag: "confirmTwoFactorAuthentication",
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            confirming.value = false;
            qrCode.value = null;
            setupKey.value = null;
        },
    });
};

const regenerateRecoveryCodes = () => {
    axios
        .post(route('two-factor.recovery-codes'))
        .then(() => showRecoveryCodes());
};

const disableTwoFactorAuthentication = () => {
    disabling.value = true;

    router.delete(route('two-factor.disable'), {
        preserveScroll: true,
        onSuccess: () => {
            disabling.value = false;
            confirming.value = false;
        },
    });
};
</script>

<template>
    <ActionSection>
        <template #title>
            {{ $t('account.twoFactor.title') }}
        </template>

        <template #description>
            {{ $t('account.twoFactor.description') }}
        </template>

        <template #content>
            <h3 v-if="twoFactorEnabled && ! confirming" class="text-lg font-medium">
                {{ $t('account.twoFactor.isEnable') }}
            </h3>

            <h3 v-else-if="twoFactorEnabled && confirming" class="text-lg font-medium">
                {{ $t('account.twoFactor.onFinish') }}
            </h3>

            <h3 v-else class="text-lg font-medium">
                {{ $t('account.twoFactor.isNotEnable.title') }}
            </h3>

            <div class="mt-3 max-w-xl text-sm text-page-d/60 dark:text-page-dt/50">
                <p>
                    {{ $t('account.twoFactor.isNotEnable.description') }}
                </p>
            </div>

            <div v-if="twoFactorEnabled">
                <div v-if="qrCode">
                    <div class="mt-4 max-w-xl text-sm text-page-d/60 dark:text-page-dt/50">
                        <p v-if="confirming" class="font-semibold">
                            {{ $t('account.twoFactor.qr.onConfirmed') }}
                        </p>

                        <p v-else>
                            {{ $t('account.twoFactor.qr.isConfirmed') }}
                        </p>
                    </div>

                    <div class="mt-4 p-2 inline-block bg-white" v-html="qrCode" />

                    <div v-if="setupKey" class="mt-4 max-w-xl text-sm text-page-d/60 dark:text-page-dt/50">
                        <p class="font-semibold">
                            {{ $t('account.twoFactor.key') }}: <span v-html="setupKey"></span>
                        </p>
                    </div>

                    <div v-if="confirming" class="mt-4">
                        <Input
                            v-model="confirmationForm.code"
                            id="code"
                            inputmode="numeric"
                            :onError="confirmationForm.errors.code"
                            @keyup.enter="confirmTwoFactorAuthentication"
                        />
                    </div>
                </div>

                <div v-if="recoveryCodes.length > 0 && ! confirming">
                    <div class="mt-4 max-w-xl text-sm text-page-d/60 dark:text-page-dt/50">
                        <p class="font-semibold">
                            {{ $t('account.twoFactor.codes.store') }}
                        </p>
                    </div>

                    <div class="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-primary dark:bg-primary-d rounded-lg">
                        <div v-for="code in recoveryCodes" :key="code">
                            {{ code }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-5">
                <div v-if="! twoFactorEnabled">
                    <ConfirmsPassword @confirmed="enableTwoFactorAuthentication">
                        <PrimaryButton type="button" :class="{ 'opacity-25': enabling }" :disabled="enabling">
                            {{ $t('enable') }}
                        </PrimaryButton>
                    </ConfirmsPassword>
                </div>

                <div v-else>
                    <ConfirmsPassword @confirmed="confirmTwoFactorAuthentication">
                        <PrimaryButton
                            v-if="confirming"
                            type="button"
                            class="me-3"
                            :class="{ 'opacity-25': enabling }"
                            :disabled="enabling"
                        >
                            {{ $t('confirm') }}
                        </PrimaryButton>
                    </ConfirmsPassword>

                    <ConfirmsPassword @confirmed="regenerateRecoveryCodes">
                        <SecondaryButton
                            v-if="recoveryCodes.length > 0 && ! confirming"
                            class="me-3"
                        >
                            {{ $t('account.twoFactor.codes.regenerate') }}
                        </SecondaryButton>
                    </ConfirmsPassword>

                    <ConfirmsPassword @confirmed="showRecoveryCodes">
                        <SecondaryButton
                            v-if="recoveryCodes.length === 0 && ! confirming"
                            class="me-3"
                        >
                            {{ $t('account.twoFactor.codes.show') }}
                        </SecondaryButton>
                    </ConfirmsPassword>

                    <ConfirmsPassword @confirmed="disableTwoFactorAuthentication">
                        <SecondaryButton
                            v-if="confirming"
                            :class="{ 'opacity-25': disabling }"
                            :disabled="disabling"
                        >
                            {{ $t('cancel') }}
                        </SecondaryButton>
                    </ConfirmsPassword>

                    <ConfirmsPassword @confirmed="disableTwoFactorAuthentication">
                        <DangerButton
                            v-if="! confirming"
                            :class="{ 'opacity-25': disabling }"
                            :disabled="disabling"
                        >
                            {{ $t('disable') }}
                        </DangerButton>
                    </ConfirmsPassword>
                </div>
            </div>
        </template>
    </ActionSection>
</template>
