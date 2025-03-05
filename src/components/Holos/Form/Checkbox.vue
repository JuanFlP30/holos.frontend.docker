<script setup>
import { computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const emit = defineEmits([
    'update:modelValue'
]);

const uuid = uuidv4();

const props = defineProps({
    title: String,
    modelValue: Object | Boolean,
    value: Object | Boolean,
});

const vModel = computed({
    get() {
        return props.modelValue;
    },

    set(value) {
        emit('update:modelValue', value);
    },
});
</script>

<template>
    <div class="relative w-full h-8">
        <input
            class="appearance-none rounded-sm bg-primary cursor-pointer h-full w-full checked:bg-secondary dark:checked:bg-secondary-d transition-all duration-200 peer"
            type="checkbox"
            :id="uuid"
            v-model="vModel"
            :value="value"
        />
        <label
            :for="uuid"
            class="absolute top-[50%] left-3 text-primary-t dark:text-primary-dt -translate-y-[50%] peer-checked:text-white dark:peer-checked:text-primary-dt transition-all duration-200 select-none"
        >
            {{ title }}
        </label>
    </div>
</template>