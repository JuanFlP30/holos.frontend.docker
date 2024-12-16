<script setup>
import { onMounted } from 'vue'
import { APP_VERSION, APP_COPYRIGHT } from '@/config.js'
import useDarkMode from '@Stores/DarkMode'

import Logo       from '@Holos/Logo.vue'
import IconButton from '@Holos/Button/Icon.vue'

/** Definidores */
const darkMode = useDarkMode()

/** Propiedades */
defineProps({
    title: String
})

/** Ciclos */
onMounted(() => {
    darkMode.boot()
});
</script>

<template>
  <div class="h-screen flex bg-primary dark:bg-primary-d">
    <div
      class="relative flex w-full lg:w-full justify-around items-center with-transition"
      :class="{'app-bg-light':darkMode.isLight,'app-bg-dark':darkMode.isDark}"
    >
      <header class="absolute top-0 flex w-full h-8 px-1 items-center justify-end text-white">
        <div>
          <IconButton v-if="darkMode.isLight"
            icon="light_mode"
            :title="$t('app.theme.light')"
            @click="darkMode.applyDark()"
          />
          <IconButton v-else
            icon="dark_mode"
            :title="$t('app.theme.dark')"
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

        <main class="bg-white/10 w-full backdrop-blur-sm text-white px-4 py-4 rounded-md max-w-80">
          <RouterView />
        </main>

        <footer class="absolute bottom-0 flex w-full h-8 px-4 items-center justify-between bg-primary dark:bg-primary-d backdrop-blur-md text-white transition-colors duration-global">
          <div>
              <span>
                  &copy;2024 {{ APP_COPYRIGHT }}
              </span>
          </div>
          <div>
              <span>
                APP {{ APP_VERSION }} API {{ $page.app.version }}
              </span>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
