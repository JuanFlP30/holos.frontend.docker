<script setup>
import { onMounted } from 'vue'
import { Head } from '@inertiajs/vue3';
import useDarkMode from '@Stores/DarkMode'

import IconButton from '@Holos/Button/Icon.vue'
import Logo       from '@Holos/Logo.vue';

/** Definidores */
const darkMode = useDarkMode()

/** Propiedades */
defineProps({
    title: String
})

/**
 * Ciclos
 */
onMounted(() => {
    darkMode.boot()
});
</script>

<template>
  <Head :title="title" />
  <div class="h-screen flex">
    <div
      class="relative flex w-full lg:w-full justify-around items-center with-transition"
      :class="{'app-bg-light':darkMode.isLight,'app-bg-dark':darkMode.isDark}"
    >
      <header class="absolute top-0 flex w-full h-8 px-1 items-center justify-end text-white">
        <div>
          <IconButton v-if="darkMode.isLight"
            :title="$t('app.theme.light')"
            icon="light_mode"
            @click="darkMode.applyDark()"
          />
          <IconButton v-else
            :title="$t('app.theme.dark')"
            icon="dark_mode"
            @click="darkMode.applyLight()"
          />
        </div>
      </header>
      <div class="flex w-full flex-col items-center justify-center space-y-2">
        <div class="flex space-x-2 items-center justify-start text-white">
          <Logo
              class="text-lg inline-flex"
            />
        </div>

        <main  class="bg-white/10 w-full backdrop-blur-sm text-white px-4 py-8 rounded-md max-w-80">
          <slot />
        </main>

        <footer class="absolute bottom-0 flex w-full h-8 px-4 items-center justify-between bg-primary dark:bg-primary-d backdrop-blur-sm text-white transition-colors duration-global">
          <div>
              <span>
                  &copy;2024 {{ $page.props.copyright }}
              </span>
          </div>
          <div>
              <span>
                  Versión {{ $page.version }}
              </span>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>