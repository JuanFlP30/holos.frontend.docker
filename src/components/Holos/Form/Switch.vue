<script setup>
import { v4 as uuidv4 } from 'uuid';
import { computed } from 'vue';

/** Eventos */
const emit = defineEmits([
    'update:checked'
]);

/** Propiedades */
const props = defineProps({
    checked: {
        default: false,
        type: [
            Array,
            Boolean
        ]
    },
    title: {
        default: lang('active'),
        type: String
    },
    value: {
        default: null,
        type: String
    },
    disabled: Boolean
});

const uuid = uuidv4()

/** Propiedades computadas */
const proxyChecked = computed({
    get() {
        return props.checked;
    },

    set(val) {
        emit('update:checked', val);
    },
});
</script>

<template>
    <div class="flex items-center">
        <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
                .id="uuid"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                type="checkbox"
                name="toggle"
                :value="value"
                v-model="proxyChecked"
                :disabled="disabled"
            />
        <label :for="uuid" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
        <label :for="uuid" class="text-xs text-gray-700">{{ $t(title) }}</label>
    </div>
</template>