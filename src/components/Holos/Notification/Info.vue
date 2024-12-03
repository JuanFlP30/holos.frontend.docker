<script setup>
import { computed, onMounted, ref } from 'vue'

import GoogleIcon from '@/components/Shared/GoogleIcon.vue'

const emit = defineEmits([
    'close'
])

const props = defineProps({
    item: Object,
})

const isOpen = ref(false)

const close = () => {
    isOpen.value = false

    setTimeout(() => {
        emit('close')
    }, 500)
}

const typeClasses = computed(() => {
    let nameClass = 'w-64 rounded-md text-white p-2';

    switch (props.item.type) {
        case 'info':
            nameClass += ' bg-blue-500'
            break;
        case 'success':
            nameClass += ' bg-green-500'
            break;
        case 'warning':
            nameClass += ' bg-yellow-500'
            break;
        case 'error':
            nameClass += ' bg-red-500'
            break;
        default:
        nameClass += ' bg-blue-500'
            break;
    }

    return nameClass
})

onMounted(() => {
    isOpen.value = true
})
</script>

<template>
    <Transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-300"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
        <div v-show="isOpen" :class="typeClasses">
            <div class="flex justify-between items-center">
                <h4 class="font-bold text-sm truncate">{{ item.title }}</h4>
                <GoogleIcon
                    class="cursor-pointer"
                    name="close"
                    @click="close()"
                />
            </div>
            <h4 class="text-sm ">{{ item.message }}</h4>
        </div>
    </Transition>
</template>