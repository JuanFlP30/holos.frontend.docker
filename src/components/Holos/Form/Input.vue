<script setup>
import { v4 as uuidv4 } from 'uuid';
import { computed, onMounted, ref } from 'vue';

import Error from './Elements/Error.vue';
import Label from './Elements/Label.vue';

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

/** Propiedades calculadas */
const autoId = computed(() => {
    return (props.id)
        ? props.id
        : uuidv4()
})

const autoTitle = computed(() => {
    if(props.title) {
        return props.title;
    }

    return props.id;
});

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
    <div class="w-full">
        <Label
            :id="autoId"
            :required="required"
            :title="autoTitle"
        />
        <input
            v-bind="$attrs"
            ref="input"
            class="input-primary"
            :id="autoId"
            :placeholder="placeholder"
            :required="required"
            :type="type"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        >
        <Error
            :onError="onError"
        />
    </div>
</template>