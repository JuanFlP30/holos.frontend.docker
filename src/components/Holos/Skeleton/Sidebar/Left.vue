<script setup>
import { APP_VERSION, APP_COPYRIGHT } from '@/config.js'
import useLeftSidebar from '@Stores/LeftSidebar'

import Logo from '@Holos/Logo.vue';

/** Definidores */
const leftSidebar = useLeftSidebar()

/** Eventos  */
const emit = defineEmits(['open']);

/** Propiedades */
const props = defineProps({
  sidebar: Boolean
});

const year = (new Date).getFullYear();

</script>

<template>
  <div 
    class="fixed top-[3.1rem] md:top-0 w-fit h-[calc(100vh-3.1rem)] md:h-screen transition-all duration-300 z-50"
    :class="{'-translate-x-0':leftSidebar.isOpened, '-translate-x-64':leftSidebar.isClosed}"
  >
    <nav
      class="flex md:w-64 h-full transition-all duration-300 border-none"
      :class="{'w-64': leftSidebar.isClosed, 'w-screen': leftSidebar.isOpened}"
    >
      <div class="flex flex-col h-full p-2 md:w-64">
        <div class="flex h-full flex-col w-[15.5rem] justify-between rounded-sm overflow-y-auto overflow-x-hidden bg-primary dark:bg-primary-d text-white">
          <div>
            <div class="flex w-full px-2 mt-2">
              <Logo
                class="text-lg inline-flex"
              />
            </div>
            <ul class="flex h-full flex-col md:pb-4 space-y-1">
              <slot />
            </ul>
          </div>
          <div class="mb-4 px-5 space-y-1">
              <p class="block text-center text-xs">
                &copy {{year}} {{ APP_COPYRIGHT }}
              </p>
            <p class="text-center text-xs text-yellow-500 cursor-pointer">
              <RouterLink :to="{name:'changelogs.app'}"> APP {{ APP_VERSION }} </RouterLink> <RouterLink :to="{name:'changelogs.core'}"> API {{ $page.app.version }} </RouterLink>
            </p>
          </div>
        </div>
      </div>
      <div
        class="h-full"
        :class="{'w-[calc(100vw-17rem)] md:w-0 bg-transparent':leftSidebar.isOpened,'md:w-0':leftSidebar.isClosed}"
        @click="leftSidebar.toggle()" 
      ></div>
    </nav>
  </div>
</template>