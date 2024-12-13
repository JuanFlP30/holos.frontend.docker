<script setup>
import { apiTo, transl } from './Module';
import { useForm } from '@Services/Api';

import PrimaryButton from '@Holos/Button/Primary.vue';
import Input         from '@Holos/Form/Input.vue';
import FormSection   from '@Holos/FormSection.vue';

/** Propiedades */
const props = defineProps({
    userId: String
});

const form = useForm({
    password: '',
    password_confirmation: '',
});

/** Métodos */
const updateProfileInformation = () => {
    form.put(apiTo('password', { user: props.userId }), {
        onSuccess: () => {
            Notify.success(Lang('account.password.updated'));
            form.reset();
        },
        onError: () => Notify.error(Lang('updateFail'))
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
                    v-model="form.password"
                    id="password"
                    title="account.password.new"
                    type="password"
                    :onError="form.errors.password"
                    autocomplete="off"
                    required
                />
                <Input
                    v-model="form.password_confirmation"
                    icon="password"
                    id="passwordConfirmation"
                    type="password"
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