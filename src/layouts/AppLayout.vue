<script setup>
import { hasPermission } from '@Plugins/RolePermission.js';

import Layout  from '@Holos/Layout/AppLayout.vue';
import Link    from '@Holos/Skeleton/Sidebar/Link.vue';
import Section from '@Holos/Skeleton/Sidebar/Section.vue';

/** Propiedades */
defineProps({
    title: String,
    titlePage: {
        default: true,
        type: Boolean
    }
});

</script>

<template>
    <Layout
        :title="title"
        :titlePage="titlePage"
    >
        <template #leftSidebar>
            <Section name="Principal">
                <Link
                    icon="monitoring"
                    name="dashboard" 
                    to="dashboard.index"
                />
            </Section>
            <Section :name="$t('account.title')">
                <Link 
                    icon="manage_accounts"
                    name="profile"
                    to="profile.show"
                />
                <Link 
                    icon="notifications"
                    :name="$t('notifications.title')"
                    to="notifications.index"
                />
            </Section>
            <Section :name="$t('admin.title')">
                <Link 
                    v-if="hasPermission('users.index')"
                    icon="people"
                    name="users.title"
                    to="admin.users.index"
                />
            </Section>
        </template>

        <!-- Contenido -->
        <slot />
        <!-- Fin contenido -->
    </Layout>
</template>
