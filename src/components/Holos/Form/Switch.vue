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
    disabled: Boolean,
    title: {
        default: Lang('active'),
        type: String
    },
    value: {
        default: null,
        type: String
    }
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
                v-model="proxyChecked"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                name="toggle"
                type="checkbox"
                :id="uuid"
                :disabled="disabled"
                :value="value"
            />
            <label
                class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                :for="uuid"
            />
        </div>
        <label
            class="text-xs text-gray-700"
            :for="uuid"
        >
            {{ $t(title) }}
        </label>
    </div>
</template>