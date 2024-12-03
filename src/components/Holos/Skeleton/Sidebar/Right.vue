<script setup>
import useRightSidebar from '@Stores/RightSidebar'

/** Eventos */
const emit = defineEmits(['open']);

/** Propiedades */
const props = defineProps({
  sidebar: Boolean
});

/** Definidores */
const rightSidebar = useRightSidebar()
</script>

<template>
  <div 
    class="fixed top-[3.1rem] right-[0.1rem] md:right-[0.5rem] w-fit h-[calc(100vh-3.1rem)] transition-all duration-300 z-50"
    :class="{'translate-x-0':rightSidebar.isOpened, 'translate-x-64':rightSidebar.isClosed}"
  >
    <nav
      class="flex md:w-64 h-full transition-all duration-300 border-none"
      :class="{'w-64': rightSidebar.isClosed, 'w-screen': rightSidebar.isOpened}"
    >
      <div class="flex flex-col h-full p-2 md:w-64">
        <div class="flex h-full flex-col w-[15.5rem] justify-between rounded-lg  overflow-y-auto overflow-x-hidden bg-primary dark:bg-primary-d text-white">
          <div>
            <ul class="flex h-full flex-col md:pb-4 space-y-1">
              <slot />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>