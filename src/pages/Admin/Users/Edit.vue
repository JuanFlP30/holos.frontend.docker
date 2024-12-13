<script setup>
import { onMounted } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { api, useForm } from '@Services/Api';
import { viewTo, apiTo } from './Module';

import IconButton      from '@Holos/Button/Icon.vue'
import PageHeader      from '@Holos/PageHeader.vue';
import Form            from './Form.vue'

/** Definiciones */
const vroute = useRoute();
const router = useRouter();

/** Propiedades */
const form = useForm({
    id: null,
    name: '',
    paternal: '',
    maternal: '',
    email: '',
    phone: '',
});

/** Métodos */
function submit() {
    form.put(apiTo('update', { user: form.id }), {
        onSuccess: () => {
            Notify.success(Lang('register.edit.onSuccess'))
            router.push(viewTo({ name: 'index' }));
        },
    })
}

onMounted(() => {
    api.get(apiTo('show', { user: vroute.params.id }), {
        onSuccess: (r) => form.fill(r.user)
    });
})
</script>

<template>
    <PageHeader>
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
        action="update"
        :form="form"
        @submit="submit"
    />
</template>
