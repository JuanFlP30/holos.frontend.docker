<script setup>
import { ref, computed } from 'vue';

/** Propiedades */
const props = defineProps({
    inboxCtl: Object, //Controller
    item: Object,
    selecteds: Object
})

const check        = ref(false);
const messageHover = ref(false);

/** Métodos */  
const select = () => (!check.value)
    ? props.inboxCtl.onSelectOne(props.item)
    : props.inboxCtl.onUnselectOne(props.item);

const selected = computed(() => {
    const status = (props.item)
        ? props.inboxCtl.inboxIdSelected.value.includes(props.item.id)
        : false;

    check.value = status;

    return status;
});
</script>

<template>
    <li
        class="flex items-center rounded-sm border-y px-2 min-h-[35px] transition duration-300"
        :class="{'bg-secondary text-secondary-t':selected, 'bg-primary/50 text-primary-t hover:bg-secondary/50 hover:text-secondary-t':!selected}"
    >
        <div class="pr-2">
            <input
                v-model="check"
                class="focus:ring-0 border-2 border-gray-400"
                type="checkbox"
                @click="select"
            >
        </div>
        <div 
            class="w-full flex items-center justify-between cursor-pointer"
            @mouseover="messageHover  = true"
            @mouseleave="messageHover = false"
        >
            <div class="flex items-center">
                <slot name="item" />
            </div>
            <div
                class="w-36 flex items-center justify-end"
            >
                <div
                    class="flex items-center space-x-2"
                    :class="{'hidden':!messageHover}"
                >
                    <slot name="actions" :check="check" />
                </div>
                <div
                    class="flex space-x-4 text-xs"
                    :class="{'hidden':messageHover}"
                >
                    <slot name="date" />
                </div>
            </div>
        </div>
    </li>
</template>