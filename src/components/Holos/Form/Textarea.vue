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
    onError: String,
    placeholder: String,
    required: Boolean,
    title: String,
});

const input = ref(null);

/** Exposiciones */
defineExpose({
    focus: () => input.value.focus()
});

/** Propiedades computadas */
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
        <textarea
            ref="input"
            v-bind="$attrs"
            class="input-primary"
            :id="autoId"
            :placeholder="placeholder"
            :required="required"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        ></textarea>
        <Error 
            :onError="onError"
        />
    </div>
</template>