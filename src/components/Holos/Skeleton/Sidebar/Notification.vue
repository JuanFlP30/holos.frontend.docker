<script setup>
import { onMounted } from 'vue';
import useNotificationSidebar from '@Stores/NotificationSidebar'
import useNotifier from '@Stores/Notifier'

import GoogleIcon from '@Shared/GoogleIcon.vue';
import Item       from './Notification/Item.vue';

/**
 * Definidores
 */
const notifier = useNotifier();
const notificationSidebar = useNotificationSidebar()

/** Eventos */
const emit = defineEmits(['open']);

/** Propiedades */
const props = defineProps({
  sidebar: Boolean
});

/**
 * Ciclos
 */
onMounted(() => {
  notifier.boot();
});
</script>

<template>
  <div 
    class="fixed top-[3.1rem] right-[0.1rem] md:right-[0.5rem] w-fit h-[calc(100vh-3.2rem)] transition-all duration-300 z-50"
    :class="{'translate-x-0':notificationSidebar.isOpened, 'translate-x-64':notificationSidebar.isClosed}"
  >
    <section
      id="notifications"
      class="flex md:w-64 h-full transition-all duration-300 border-none"
      :class="{'w-64': notificationSidebar.isClosed}"
    >
      <div class="flex flex-col h-full p-2 md:w-64">
        <div class="flex h-full flex-col w-[15.5rem] justify-between rounded-lg  overflow-y-auto overflow-x-hidden bg-primary/70 text-primary-t dark:bg-primary-d/70 dark:text-primary-dt">
          <div class="flex justify-between px-2 items-center">
            <h4 class="text-md text-center py-1 font-semibold">
              {{ $t('notifications.title') }} <span class="text-xs">({{ notifier.counter }})</span>
            </h4>
            <GoogleIcon 
              name="close" 
              class="text-primary-t dark:text-primary-dt cursor-pointer"
              @click="notificationSidebar.close()"
            />
          </div>
          <div class="flex h-full flex-col space-y-1">
            <ul class="px-2 space-y-2 h-[calc(100vh-6.5rem)] overflow-y-auto">
              <Item v-for="notification in notifier.notifications"
                :key="notification.id"
                :notification="notification"
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>