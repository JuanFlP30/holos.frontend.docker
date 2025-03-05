<script setup>
import { onMounted } from 'vue';
import useDarkMode from '@Stores/DarkMode'
import useLeftSidebar from '@Stores/LeftSidebar'
import useNotificationSidebar from '@Stores/NotificationSidebar'
import useNotifier from '@Stores/Notifier'

import Header              from '../Skeleton/Header.vue';
import LeftSidebar         from '../Skeleton/Sidebar/Left.vue';
import NotificationSidebar from '../Skeleton/Sidebar/Notification.vue';

/** Definidores */
const darkMode            = useDarkMode();
const leftSidebar         = useLeftSidebar();
const notificationSidebar = useNotificationSidebar();
const notifier            = useNotifier();

/** Propiedades */
defineProps({
    title: String,
});

/** Ciclos */

onMounted(() => {
    leftSidebar.boot();
    darkMode.boot();
    notifier.boot();
});
</script>

<template>
    <div class="flex w-full h-screen bg-page text-page-t dark:bg-page-d dark:text-page-dt">
        <LeftSidebar
            @open="leftSidebar.toggle()"
        >
            <slot name="leftSidebar"/>
        </LeftSidebar>
        <NotificationSidebar
            @open="notificationSidebar.toggle()"
        />
        <div 
            class="flex flex-col w-full transition-all duration-300"
            :class="{'md:w-[calc(100vw-rem)] md:ml-64':leftSidebar.isOpened, 'md:w-screen md:ml-0':leftSidebar.isClosed}"
        >
            <div class="h-2 md:h-14">
                <Header
                    @open="leftSidebar.toggle()"
                />
            </div>
            <main class="flex h-full justify-center md:p-2">
                <div class="mt-14 md:mt-0 w-full shadow-lg dark:shadow-xs md:dark:shadow-white h-[calc(100vh-4.5rem)] px-2 pb-4 md:rounded-sm overflow-y-auto overflow-x-auto transition-colors duration-300">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>
