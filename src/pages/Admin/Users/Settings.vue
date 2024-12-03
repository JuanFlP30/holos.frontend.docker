<script setup>
import { goTo, transl } from './Module';
import { Link } from '@inertiajs/vue3';

import IconButton      from '@Holos/Button/Icon.vue';
import PageHeader      from '@Holos/PageHeader.vue';
import SectionBorder   from '@Holos/SectionBorder.vue';
import DashboardLayout from '@Layouts/AppLayout.vue';
import Roles           from './Roles.vue';
import UpdatePassword  from './UpdatePassword.vue';

/**
 * Propiedades
 */
defineProps({
    role: Object,
    roles: Object,
    user: Object
});
</script>

<template>
    <DashboardLayout :title="transl('settings')">
        <PageHeader>
          <Link :href="route(goTo('index'))">
              <IconButton
                class="text-white"
                icon="arrow_back"
                :title="$t('return')"
                outline
              />
          </Link>
        </PageHeader>
        <div class="flex w-full pt-2">
            <div class="w-full text-center p-2 bg-primary dark:bg-primary-d border-b rounded-lg">
                <p class="pt-2 text-lg font-bold text-gray-50">
                    {{ user.name }}
                </p>
                <p class="text-sm text-gray-100">
                    {{ user.full_last_name }}
                </p>
            </div>
        </div>
        <div class="w-full mt-12 space-y-4">
            <UpdatePassword
                :user="user"
            />
            <SectionBorder />
            <Roles
                :role="role"
                :roles="roles"
                :user="user"
            />
            <SectionBorder />
        </div>
    </DashboardLayout>
</template>
    