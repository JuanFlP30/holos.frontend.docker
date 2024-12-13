<script setup>
import { computed } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';

import PrimaryButton from '@Holos/Button/Primary.vue';
import Layout        from '@Holos/Layout/AuthLayout.vue';

/** Propiedades */
const props = defineProps({
    status: String,
});

const form = useForm({});

/** Propiedades computadas */
const verificationLinkSent = computed(() => props.status === 'verification-link-sent');

/** Métodos */
const submit = () => {
    form.post(route('verification.send'));
};

</script>

<template>
    <Layout :title="$t('auth.verifyEmail.title')">
        <div class="mb-4 text-sm text-justify">
            {{ $t('auth.verifyEmail.beforeContinue') }}
        </div>

        <div v-if="verificationLinkSent" class="mb-4 font-medium text-sm text-green-600">
            {{ $t('auth.verifyEmail.notifySendVerification') }}
        </div>

        <form @submit.prevent="submit">
            <div class="mt-4 flex flex-col space-y-1 items-center justify-between">
                <PrimaryButton class="!w-full" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    {{ $t('auth.verifyEmail.sendLink') }}
                </PrimaryButton>

                <Link
                    :href="route('profile.show')"
                    class="btn btn-primary !w-full"
                >
                    {{ $t('profile') }}
                </Link>

                <Link
                    :href="route('logout')"
                    class="btn btn-primary !w-full"
                    method="post"
                >
                    {{ $t('auth.logout') }}
                </Link>
            </div>
        </form>
    </Layout>
</template>
