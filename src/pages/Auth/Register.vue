<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';

import Checkbox      from '@Holos/Checkbox.vue';
import InputLabel    from '@Holos/InputLabel.vue';
import Error         from '@Holos/Form/Elements/Error.vue';
import PrimaryButton from '@Holos/Button/Primary.vue';
import Input         from '@Holos/Form/InputWithIcon.vue'
import Layout        from '@Holos/Layout/AuthLayout.vue'

const form = useForm({
    name: '',
    paternal: '',
    maternal: '',
    phone: '',  
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Layout :title="$t('auth.register.me')">
        <form @submit.prevent="submit">
            <Input
                icon="people"
                id="name"
                type="text"
                v-model="form.name"
                :onError="form.errors.name"
                :placeholder="$t('name')"
            />
            <Input
                icon="people"
                id="paternal"
                type="text"
                v-model="form.paternal"
                :onError="form.errors.paternal"
                :placeholder="$t('paternal')"
            />
            <Input
                icon="people"
                id="maternal"
                type="text"
                v-model="form.maternal"
                :onError="form.errors.maternal"
                :placeholder="$t('maternal')"
            />
            <Input
                icon="phone"
                id="phone"
                type="number"
                v-model="form.phone"
                :onError="form.errors.phone"
                :placeholder="$t('phone')"
            />
            <Input
                icon="mail"
                id="email"
                type="email"
                v-model="form.email"
                :onError="form.errors.email"
                :placeholder="$t('email.title')"
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


            <div v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature" class="mt-4">
                <InputLabel for="terms">
                    <div class="flex items-center">
                        <Checkbox id="terms" v-model:checked="form.terms" name="terms" required />

                        <div class="ms-2 text-primary-t dark:text-primary-dt">
                            I agree to the
                            <a target="_blank" :href="route('terms.show')" class="underline text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {{ $t('terms.service') }}
                            </a>
                            and
                            <a target="_blank" :href="route('policy.show')" class="underline text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {{ $t('policy.privacy') }}
                            </a>
                        </div>
                    </div>
                    <Error class="mt-2" :onError="form.errors.terms" />
                </InputLabel>
            </div>

            <div class="flex items-center justify-end mt-4">
                <Link :href="route('login')" class="underline text-sm bg-page-text hover:bg-page-background text-page-background hover:text-page-text rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {{ $t('auth.register.already') }}
                </Link>

                <PrimaryButton class="ms-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    {{ $t('auth.register.me') }}
                </PrimaryButton>
            </div>
        </form>
    </Layout>
</template>
