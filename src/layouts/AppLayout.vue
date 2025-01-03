<script setup>
import { onMounted } from 'vue';
import useLoader    from '@Stores/Loader';
import { hasPermission } from '@Plugins/RolePermission';

import Layout  from '@Holos/Layout/App.vue';
import Link    from '@Holos/Skeleton/Sidebar/Link.vue';
import Section from '@Holos/Skeleton/Sidebar/Section.vue';

/** Definidores */
const loader = useLoader()

/** Propiedades */
defineProps({
    title: String,
});

/** Ciclos */
onMounted(() => {
    loader.boot()
})

</script>

<template>
    <Layout
        :title="title"
    >
    
        <template #leftSidebar>
            <Section name="Principal">
                <Link
                    icon="monitoring"
                    name="dashboard" 
                    to="dashboard.index"
                />
                <Link
                    icon="person"
                    name="profile" 
                    to="profile.show"
                />
            </Section>
            <Section
                v-if="hasPermission('users.index')"
                :name="$t('admin.title')"
            >
                <Link
                    v-if="hasPermission('users.index')"
                    icon="people"
                    name="users.title" 
                    to="admin.users.index"
                />
                <Link
                    v-if="hasPermission('roles.index')"
                    icon="license"
                    name="roles.title" 
                    to="admin.roles.index"
                />
                <Link
                    v-if="hasPermission('activities.index')"
                    icon="event"
                    name="history.title" 
                    to="admin.activities.index"
                />
            </Section>
        </template>
        <!-- Contenido -->
        <RouterView />
        <!-- Fin contenido -->
    </Layout>
</template>
