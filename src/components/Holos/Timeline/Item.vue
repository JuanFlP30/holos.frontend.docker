<script setup>
import { computed } from 'vue';
import { getDate, getTime } from '@Controllers/DateController';

import PrimaryButton from '@Holos/Button/Primary.vue';
import GoogleIcon    from '@Shared/GoogleIcon.vue';
/** Eventos */
const emit = defineEmits([
    'show',
]);

const props = defineProps({
    event: Object,
});

const icons = {
    created: 'add',
    updated: 'edit',
    deleted: 'delete',
    restored: 'restore',
};

const colors = {
    created: 'primary',
    updated: 'primary',
    deleted: 'danger',
    restored: 'primary',
};

const eventType = computed(() => {
    return props.event.event.split('.')[1];
});

const bgColor = computed(() => {
    return `bg-${colors[eventType.value]} dark:bg-${colors[eventType.value]}-d text-${colors[eventType.value]}-t dark:text-${colors[eventType.value]}-t`;
});

const borderColor = computed(() => {
    return `border-${colors[eventType.value]} dark:border-${colors[eventType.value]}-d`;
});

</script>

<template>
    <li class="border-l-2" :class="borderColor">
        <div class="relative flex w-full">
            <div class="absolute -left-3.5 top-7 h-0.5 w-8" :class="bgColor"></div>
            <div 
                class="absolute -mt-3 -left-3.5 top-7 w-6 h-6 flex items-center justify-center rounded-full" 
                :class="bgColor"
                @click="emit('show', event.data)"
            >
                <GoogleIcon
                    :name="icons[eventType]"
                />
            </div>
            <div class="w-full rounded-lg shadow-xl dark:shadow-page-dt dark:shadow-sm my-2 mx-4">
                <div class="flex justify-between p-2 rounded-t-lg" :class="bgColor">
                    <span
                        class="font-medium text-sm cursor-pointer"
                        @click="emit('show', event.data)"
                    >
                        {{ $t('event')}}: <i class="underline">{{ event.event }}</i>
                    </span>
                    <span class="font-medium text-sm">
                        {{ getDate(event.created_at) }}, {{ getTime(event.created_at) }}
                    </span>
                </div>
                <div class="p-2">
                    <div class="flex flex-col justify-center items-center md:flex-row md:justify-start md:space-x-4">
                        <div v-if="event.user" class="w-32">
                            <div class="flex flex-col w-full justify-center items-center space-y-2">
                                <img :src="event.user?.profile_photo_url" alt="Photo" class="w-24 h-24 rounded-full">
                            </div>
                        </div>
                        <div class="flex w-full flex-col justify-start space-y-2">
                            <div>
                                <h4 class="font-semibold">{{ $t('description') }}:</h4>
                                <p>{{ event.description }}.</p>
                            </div>
                            <div>
                                <h4 class="font-semibold">{{ $t('author') }}:</h4>
                                <p>{{ event.user?.full_name ?? $t('system.title') }} <span v-if="event.user?.deleted_at" class="text-xs text-gray-500">({{ $t('deleted') }})</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>