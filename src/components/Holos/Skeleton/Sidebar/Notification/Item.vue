<script setup>
import { getDateTime } from '@Controllers/DateController';
import useNotifier from '@Stores/Notifier';
import GoogleIcon from '@Shared/GoogleIcon.vue';

/** Definidores */
const notifier = useNotifier();

/** Propiedades */
defineProps({
    notification: Object,
});
</script>

<template>
    <li class="flex flex-col w-full items-center p-2 bg-primary dark:bg-primary-d text-white rounded-lg shadow-md">
        <div class="flex w-full justify-between text-gray-400">
            <div>
                <h6 class="text-[10px]">{{ getDateTime(notification.created_at) }}</h6>
            </div>
            <div>
                <GoogleIcon
                    name="close"
                    class="text-xs text-white cursor-pointer"
                    @click="notifier.readNotification(notification.id)"
                />
            </div>
        </div>
        <div class="flex w-full">
            <div class="w-10 space-y-0">
                <template v-if="notification.user">
                    <div class="w-10 h-10 bg-transparent rounded-full flex items-center justify-center">
                        <img v-if="notification.user"
                            class="rounded-full object-cover"
                            :alt="notification.user.name"
                            :src="notification.user.profile_photo_url"
                        >
                    </div>
                </template>
                <template v-else>
                    <div class="w-10 h-10 bg-secondary dark:bg-secondary-d rounded-xl flex items-center justify-center">
                        <img v-if="notification.user"
                           class="rounded-full object-cover"
                           :alt="notification.user.name"
                           :src="notification.user.profile_photo_url"
                        >
                        <GoogleIcon v-else
                            name="tag"
                            class="text-white text-2xl"
                        />
                    </div>
                </template>
            </div>
            <div class="ml-3 w-full">
                <div
                    v-text="notification.data.title"
                    class="text-sm font-medium truncate"
                />
                <div v-if="notification.user"
                    v-text="`~ ${notification.user.name} ${notification.user.paternal}`"
                    class="text-xs text-gray-400 truncate"
                />
                <div v-else
                    v-text="$t('system')"
                    class="text-xs text-gray-400 truncate"
                />
            </div>
        </div>
    </li>
</template>