<script setup>
import Layout  from '@Holos/Layout/App.vue';
import Link    from '@Holos/Skeleton/Sidebar/Link.vue';
import Section from '@Holos/Skeleton/Sidebar/Section.vue';

/** Propiedades */
defineProps({
    title: String,
});

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
                    to="index"
                />
                <Link
                    icon="person"
                    name="profile" 
                    to="profile.show"
                />
            </Section>
            <Section :name="$t('admin.title')">
                <Link
                    icon="people"
                    name="users.title" 
                    to="admin.users.index"
                />
            </Section>
        </template>
        <!-- Contenido -->
        <RouterView />
        <!-- Fin contenido -->
    </Layout>
</template>
