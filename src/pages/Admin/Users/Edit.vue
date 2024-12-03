<script setup>
import { Link, useForm } from '@inertiajs/vue3';
import { goTo, transl } from './Module';

import IconButton      from '@Holos/Button/Icon.vue'
import PageHeader      from '@Holos/PageHeader.vue';
import Layout          from '@/Layouts/AppLayout.vue';
import Form            from './Form.vue'

/** Propiedades */
const props = defineProps({
    model: Object,
});

/** Propiedades */
const form = useForm({
    name: props.model.name,
    paternal: props.model.paternal,
    maternal: props.model.maternal,
    email: props.model.email,
    phone: props.model.phone,
});

/** Métodos */
function submit() {
    form.put(route(goTo('update'), {user:props.model.id}), {
        onSuccess: () => Notify.success(lang('register.edit.onSuccess')),
        onError:   () => Notify.error(lang('register.edit.onError')),
        onFinish:  () => form.reset('password')
    })
}
</script>

<template>
  <Layout :title="transl('edit.title')">
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
        action="update"
        :form="form"
        @submit="submit"
    />
  </Layout>
</template>
