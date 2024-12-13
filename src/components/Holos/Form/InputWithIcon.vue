<script setup>
import { v4 as uuidv4 } from 'uuid';
import { computed, onMounted, ref } from 'vue';

import GoogleIcon from '@Shared/GoogleIcon.vue';
import Error      from './Elements/Error.vue';

/** Opciones */
defineOptions({
  inheritAttrs: false
})

/** Eventos */
const emit = defineEmits([
    'update:modelValue'
]);

/** Propiedades */
const props = defineProps({
    class: String,
    id: String,
    icon: String,
    modelValue: Number | String,
    onError: String | Array,
    placeholder: String,
    required: Boolean,
    title: String,
    type: {
        default: 'text',
        type: String
    }
});

const input = ref(null);

/** Propiedades computadas */
const autoId = computed(() => {
    return (props.id)
        ? props.id
        : uuidv4()
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

/** Exposiciones */
defineExpose({
    focus: () => input.value.focus()
});

/** Ciclos */
onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});
</script>

<template>
    <div class="mb-4">
        <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
            <GoogleIcon
                :name="icon"
            />
            <input
                ref="input"
                v-model="value"
                v-bind="$attrs"
                class="pl-2 w-full outline-none border-none bg-transparent"
                :id="autoId"
                :placeholder="placeholder"
                :type="type"
            />
        </div>
        <Error
            :onError="onError"
        />
    </div>
</template>