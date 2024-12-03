<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { goTo, transl } from './Module';

import PrimaryButton  from '@Holos/Button/Primary.vue';
import FormSection    from '@Holos/FormSection.vue';
import Selectable     from '@Holos/Form/Selectable.vue';

/** Propiedades */
const props = defineProps({
    role: Object,
    roles: Object,
    user: Object
});

const form = useForm({
    roles: props.role
});

/** Métodos */
function updateProfileInformation() {
    form.transform(data => ({
        roles: data.roles.map(role => role.id)
    })).post(route(goTo('sync-roles'), {user:props.user.id}), {
        preserveScroll: true,
        onSuccess: () =>  Notify.success(lang('roles.edit.onSuccess')),
        onError: () => Notify.error(lang('roles.edit.onError'))
    });
};
</script>

<template>
    <FormSection @submitted="updateProfileInformation">
        <template #title>
            {{ transl('roles.title') }}
        </template>
        <template #description>
            {{ transl('roles.description') }}
        </template>
        <template #form>
            <div class="col-span-6 sm:col-span-4 space-y-4">
                <Selectable
                    v-model="form.roles"
                    label="description"
                    title="Roles"
                    :options="roles"
                    multiple
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
