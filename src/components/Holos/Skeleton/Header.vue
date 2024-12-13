<script setup>
import { logout } from '@Services/Page';
import useDarkMode from '@Stores/DarkMode'
import useLeftSidebar from '@Stores/LeftSidebar'
import useNotificationSidebar from '@Stores/NotificationSidebar'
import useNotifier from '@Stores/Notifier'

import GoogleIcon   from '@Shared/GoogleIcon.vue';
import Dropdown     from '../Dropdown.vue';
import DropdownLink from '../DropdownLink.vue';

/** Eventos */
const emit = defineEmits([
  'open'
]);

/** Definidores */
const darkMode            = useDarkMode()
const leftSidebar         = useLeftSidebar()
const notificationSidebar = useNotificationSidebar()
const notifier            = useNotifier()
</script>

<template>
    <header
      class="fixed px-2 w-[calc(100vw)] bg-transparent transition-all duration-300 z-50"
      :class="{'md:w-[calc(100vw-16rem)]':leftSidebar.isOpened,'md:w-[calc(100vw)]':!leftSidebar.isClosed}"
      >
        <div class="my-2 flex px-6 items-center justify-between h-[2.75rem] rounded-lg bg-primary dark:bg-primary-d text-white z-20 ">
        <GoogleIcon
          class="text-2xl mt-1 z-50"
          name="list"
          :title="$t('menu')"
          @click="emit('open')"
          outline
        />
        <div class="flex w-fit justify-end items-center h-14 header-right">
          <ul class="flex items-center space-x-2">
            <li class="flex items-center">
              <GoogleIcon
                class="text-xl mt-1"
                name="notifications"
                :title="$t('notifications.title')"
                @click="notificationSidebar.toggle()"
              />
              <span class="text-xs">{{ notifier.counter }}</span>
            </li>
            <li v-if="darkMode.isDark">
              <GoogleIcon
                class="text-xl mt-1"
                name="light_mode"
                :title="$t('notifications.title')"
                @click="darkMode.applyLight()"
              />
            </li>
            <li v-else>
              <GoogleIcon
                class="text-xl mt-1"
                name="dark_mode"
                :title="$t('notifications.title')"
                @click="darkMode.applyDark()"
              />
            </li>
            <li>
              <div class="relative">
                <Dropdown align="right" width="48">
                  <template #trigger>
                    <div class="flex space-x-4">
                      <button
                        class="flex items-center space-x-4 text-sm border-2 border-transparent rounded-full focus:outline-none transition"
                        :title="$t('users.menu')"
                      >
                        <img 
                          class="h-8 w-8 rounded-full object-cover"
                          :alt="$page.user.name"
                          :src="$page.user.profile_photo_url"
                        >
                      </button>
                    </div>
                  </template>
                  <template #content>
                      <div class="text-center block px-4 py-2 text-sm border-b truncate">
                        {{ $page.user.name }}
                      </div>
                      <DropdownLink to="profile.show">
                        {{$t('profile')}}
                      </DropdownLink>
                      <div class="border-t border-gray-100" />
                      <form @submit.prevent="logout">
                          <DropdownLink as="button">
                               {{$t('auth.logout')}}
                          </DropdownLink>
                      </form>
                  </template>
                </Dropdown>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
</template>