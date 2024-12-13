<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { api, useForm } from '@Services/Api';
import { viewTo } from './Module';

import IconButton      from '@Holos/Button/Icon.vue'
import Input           from '@Holos/Form/Input.vue';
import Selectable      from '@Holos/Form/Selectable.vue';
import PageHeader      from '@Holos/PageHeader.vue';
import Form            from './Form.vue'

/** Definidores */
const router = useRouter();

/** Propiedades */
const form = useForm({
    name: '',
    paternal: '',
    maternal: '',
    email: '',
    phone: '',
    password: '',
    roles: []
});

const roles = ref([]);

/** Métodos */
function submit() {
    form.transform(data => ({
        ...data,
        roles: data.roles.map(role => role.id)
    })).post(apiTo('store'), {
        onSuccess: () => {
            Notify.success(Lang('register.create.onSuccess'))
            router.push(viewTo({ name: 'index' }));
        }
    })
}

/** Ciclos */
onMounted(() => {
    api.get(route('system.roles'), {
        onSuccess: (r) => {
            roles.value = r.roles;
        }
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
</template>
