<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import useNotificationSidebar from '@Stores/NotificationSidebar'
import useNotifier from '@Stores/Notifier'

import ModalController    from '@Controllers/ModalController.js';

import GoogleIcon    from '@Shared/GoogleIcon.vue';
import Item          from './Notification/Item.vue';
import PrimaryButton from '@Holos/Button/Primary.vue';
import ShowView      from '@Holos/Skeleton/Sidebar/Notification/Show.vue';

/** Definidores */
const notifier            = useNotifier();
const notificationSidebar = useNotificationSidebar()

/** Controladores */
const Modal    = new ModalController();

/** Eventos */
const emit = defineEmits(['open']);

/** Propiedades */
const props = defineProps({
  sidebar: Boolean
});

const showModal    = ref(Modal.showModal);
const modelModal   = ref(Modal.modelModal);

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
            <div class="py-1">
              <h4 class="text-md font-semibold">
                {{ $t('notifications.title') }} <span class="text-xs">({{ notifier.counter }})</span>
              </h4>
              <h4 class="text-xs font-semibold" v-if="notifier.unreadClosedCounter > 0">
                {{ $t('notifications.unreadClosed') }} <span class="text-xs"> ({{ notifier.unreadClosedCounter }})</span>
              </h4>
            </div>
            <GoogleIcon 
              name="close" 
              class="text-primary-t dark:text-primary-dt cursor-pointer"
              @click="notificationSidebar.close()"
            />
          </div>
          <div class="flex h-full flex-col space-y-1">
            <ul class="px-2 space-y-1 overflow-y-auto"
              :class="{
                'h-[calc(100vh-10rem)]': notifier.unreadClosedCounter > 0,
                'h-[calc(100vh-9rem)]': notifier.unreadClosedCounter === 0
              }"
            >
              <Item v-for="notification in notifier.notifications"
                :key="notification.id"
                :notification="notification"
                @openModal="Modal.switchShowModal(notification)"
              />
            </ul>
          </div>
          <div class="flex justify-center items-center pb-1">
            <RouterLink :to="$view({ name: 'profile.notifications.index' })">
              <PrimaryButton type="button" @click="notificationSidebar.close()">
                {{ $t('notifications.seeAll') }}
              </PrimaryButton>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <ShowView
      :show="showModal" 
      :model="modelModal" 
      @close="Modal.switchShowModal"
      @reload="notifier.getUpdates()"
    />
  </div>
</template>