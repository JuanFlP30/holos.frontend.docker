<script setup>
import { Link } from '@inertiajs/vue3';

import IconButton from '@Holos/Button/Icon.vue'

</script>

<template>
   <div class="flex w-full justify-end py-[0.31rem] border-y-2 border-page-t dark:border-page-dt">
        <div id="buttons" class="flex items-center space-x-2 text-sm py-0.5">
            <slot />
            <Link :href="route('dashboard.index')">
                <IconButton
                    :title="$t('home')"
                    class="text-white"
                    icon="home"
                    filled
                />
            </Link>
        </div>
    </div>
</template>