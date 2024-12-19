<script setup>
import { onMounted, ref } from 'vue';
import { api, useForm } from '@Services/Api';
import { apiTo, transl } from './Module';

import PrimaryButton  from '@Holos/Button/Primary.vue';
import FormSection    from '@Holos/FormSection.vue';
import Selectable     from '@Holos/Form/Selectable.vue';

/** Propiedades */
const props = defineProps({
    userId: String
});

const form = useForm({
    roles: []
});

const roles = ref([]);

/** Métodos */
function updateProfileInformation() {
    form.transform(data => ({
        roles: data.roles.map(role => role.id)
    })).put(apiTo('roles', { user: props.userId }), {
        onSuccess: () => Notify.success(Lang('roles.edit.onSuccess')),
        onError: () => Notify.error(Lang('roles.edit.onError'))
    });
};

/** Ciclos */
onMounted(() => {
    api.get(route('system.roles'), {
        onSuccess: (r) => roles.value = r.roles
    });

    api.get(apiTo('roles', { user: props.userId }), {
        onSuccess: (r) => {
            form.roles = r.roles
        }
    });
});
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
                    title="roles.title"
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
