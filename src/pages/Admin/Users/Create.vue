<script setup>
import { Link, useForm } from '@inertiajs/vue3';
import { goTo, transl } from './Module';

import IconButton      from '@Holos/Button/Icon.vue'
import Input           from '@Holos/Form/Input.vue';
import Selectable      from '@Holos/Form/Selectable.vue';
import PageHeader      from '@Holos/PageHeader.vue';
import DashboardLayout from '@Layouts/AppLayout.vue';
import Form            from './Form.vue'

/** Propiedades */

defineProps({
    roles: Object
});

const form = useForm({
    _id: null,
    name: '',
    paternal: '',
    maternal: '',
    email: '',
    phone: '',
    password: '',
    roles: []
});

/** Métodos */
function submit() {
    form.transform(data => ({
        ...data,
        roles: data.roles.map(role => role.id)
    })).post(route(goTo('store')), {
        onSuccess: () => Notify.success(lang('register.create.onSuccess')),
        onError:   () => Notify.error(lang('register.create.onError')),
        onFinish:  () => form.reset('password')
    })
}
</script>

<template>
  <DashboardLayout :title="transl('create.title')">
    <PageHeader>
        <Link :href="route(goTo('index'))">
            <IconButton
                class="text-white"
                icon="arrow_back"
                :title="$t('return')"
                filled
            />
        </Link>
    </PageHeader>
    <Form
        action="create"
        :form="form"
        @submit="submit"
    >
        <Input
            v-model="form.password"
            class="col-span-2"
            id="password"
            type="password"
            :onError="form.errors.password"
            required
        />
        <Selectable
            v-model="form.roles"
            label="description"
            title="Roles"
            :options="roles"
            multiple
        />
    </Form>
  </DashboardLayout>
</template>
