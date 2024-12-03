<script setup>
import { goTo, transl } from './Module';
import { useForm } from '@inertiajs/vue3';

import PrimaryButton from '@Holos/Button/Primary.vue';
import Input         from '@Holos/Form/Input.vue';
import FormSection   from '@Holos/FormSection.vue';

const props = defineProps({
    user: Object
});

const form = useForm({
    _method: 'POST',
    password: '',
    password_confirmation: '',
});

const updateProfileInformation = () => {
    form.post(route(goTo('password'), props.user.id), {
        errorBag: 'updateProfileInformation',
        preserveScroll: true,
        onSuccess: () => {
            Notify.success(lang('account.password.updated'));
            form.reset();
        },
        onError: () => Notify.error(lang('updateFail'))
    });
};
</script>

<template>
    <FormSection @submitted="updateProfileInformation">
        <template #title>
            {{ transl('password.title') }}
        </template>
        <template #description>
            {{ transl('password.description') }}
        </template>
        <template #form>
            <div class="col-span-6 sm:col-span-4 space-y-4">
                <Input
                    id="password"
                    title="account.password.new"
                    type="password"
                    v-model="form.password"
                    :onError="form.errors.password"
                    autocomplete="off"
                    required
                />
                <Input
                    icon="password"
                    id="passwordConfirmation"
                    type="password"
                    v-model="form.password_confirmation"
                    :onError="form.errors.password_confirmation"
                    required
                />
            </div>
        </template>
        <template #actions>
            <PrimaryButton
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
            >
                {{ $t('update') }}
            </PrimaryButton>
        </template>
    </FormSection>
</template>