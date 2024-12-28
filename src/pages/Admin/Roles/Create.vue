<script setup>
import { useRouter } from 'vue-router';
import { useForm } from '@Services/Api';
import { apiTo, transl, viewTo } from './Module';

import IconButton      from '@Holos/Button/Icon.vue'
import PageHeader      from '@Holos/PageHeader.vue';
import Form            from './Form.vue'

/** Definidores */
const router = useRouter();

/** Propiedades */
const form = useForm({
    description: '',
});

/** Métodos */
function submit() {
    form.post(apiTo('store'), {
        onSuccess: () => {
            Notify.success(Lang('register.create.onSuccess'))
            router.push(viewTo({ name: 'index' }));
        }
    })
}
</script>

<template>
    <PageHeader :title="transl('create.title')">
        <RouterLink :to="viewTo({ name: 'index' })">
            <IconButton
                class="text-white"
                icon="arrow_back"
                :title="$t('return')"
                filled
            />
        </RouterLink>
    </PageHeader>
    <Form
        action="create"
        :form="form"
        @submit="submit"
    />
</template>
