<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { api } from '@Services/Api';
import { viewTo, apiTo, transl } from './Module';

import IconButton      from '@Holos/Button/Icon.vue';
import PageHeader      from '@Holos/PageHeader.vue';
import SectionBorder   from '@Holos/SectionBorder.vue';
import Roles           from './Roles.vue';
import UpdatePassword  from './UpdatePassword.vue';

/** Definiciones */
const vroute = useRoute();

/** Propiedades */
const user = ref();

/** Ciclos */
onMounted(() => {
    api.get(apiTo('show', { user: vroute.params.id }), {
        onSuccess: (r) => user.value = r.user
    });
})
</script>

<template>
    <PageHeader :title="transl('settings')">
      <RouterLink :to="viewTo({ name: 'index' })">
          <IconButton
            class="text-white"
            icon="arrow_back"
            :title="$t('return')"
            outline
          />
      </RouterLink>
    </PageHeader>
    <div class="flex w-full pt-2">
        <div class="w-full text-center p-2 bg-primary dark:bg-primary-d border-b rounded-lg">
            <p class="pt-2 text-lg font-bold text-gray-50">
                {{ user?.name }}
            </p>
            <p class="text-sm text-gray-100">
                {{ user?.full_last_name }}
            </p>
        </div>
    </div>
    <div class="w-full mt-12 space-y-4">
        <UpdatePassword
            :userId="vroute.params.id"
        />
        <SectionBorder />
        <Roles
            :userId="vroute.params.id"
        />
        <SectionBorder />
    </div>
</template>
    